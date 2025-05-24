import React, { useEffect, useState } from "react";
import API from "../api";

const MyResume = () => {
  const [resume, setResume] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    API.get("/api/resume/my-resume")
      .then((res) => setResume(res.data.filePath))
      .catch((err) => {
        console.error(err.message);
        setMessage("No resume found.");
      });
  }, []);

  const handleDelete = async () => {
    try {
      await API.delete("/api/resume/delete");
      setResume(null);
      setMessage("Resume deleted.");
    } catch (err) {
      console.error(err);
      setMessage("Error deleting resume.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-6 p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">My Resume</h2>

      {resume ? (
        <div>
          <a
            href={`http://localhost:5000${resume}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            View Resume
          </a>
          <button
            onClick={handleDelete}
            className="ml-4 px-3 py-1 bg-red-600 text-white rounded"
          >
            Delete
          </button>
        </div>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
};

export default MyResume;
