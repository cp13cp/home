// import React, { useState } from "react";
// import API from "../api"; // axios instance with auth token

// const ResumeUpload = () => {
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState("");

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const uploadResume = async (e) => {
//     e.preventDefault();
//     if (!file) return setMessage("Please select a resume file");

//     const formData = new FormData();
//     formData.append("resume", file);

//     try {
//       const res = await API.post("/api/resume/upload-resume", formData);
//       setMessage(res.data.message + ` (Saved at: ${res.data.filePath})`);
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Upload failed");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-4 border rounded">
//       <h2 className="text-xl font-bold mb-4">Upload Resume</h2>
//       <form onSubmit={uploadResume}>
//         <input
//           type="file"
//           accept=".pdf,.doc,.docx"
//           onChange={handleFileChange}
//           className="mb-2"
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Upload
//         </button>
//       </form>
//       {message && <p className="mt-4 text-green-600">{message}</p>}
//     </div>
//   );
// };

// export default ResumeUpload;
import React, { useState, useEffect } from "react";
import API from "../api"; // axios instance with auth token

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [resume, setResume] = useState(null); // to hold existing resume

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadResume = async (e) => {
    e.preventDefault();
    if (!file) return setMessage("Please select a resume file");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await API.post("/api/resume/upload-resume", formData);
      setMessage(res.data.message);
      fetchResume(); // refresh after upload
    } catch (error) {
      setMessage(error.response?.data?.message || "Upload failed");
    }
  };

  const fetchResume = async () => {
    try {
      const res = await API.get("/api/resume/my-resume");
      setResume(res.data);
    } catch (error) {
      setResume(null); // no resume found
    }
  };

  useEffect(() => {
    fetchResume(); // fetch on mount
  }, []);

  return (
    <div className="max-w-md mx-auto p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Upload Resume</h2>
      <form onSubmit={uploadResume}>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="mb-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}

      {resume && (
        <div className="mt-6">
          <h3 className="font-semibold">Your Uploaded Resume:</h3>
          <a
            href={`http://localhost:5000${resume.filePath}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            View Resume
          </a>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
