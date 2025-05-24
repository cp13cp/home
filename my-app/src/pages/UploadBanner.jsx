import React, { useState } from "react";
import axios from "axios";

const UploadBanner = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]); // ✅ safely access files[0]
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("banner", selectedFile);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/banner/uploadbanner",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Banner uploaded successfully!");
      console.log(res.data);
    } catch (err) {
      console.error("Upload error:", err.message);
      alert("Upload failed.");
    }
  };

  return (
    <div>
      <h2>Upload Banner</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadBanner;
