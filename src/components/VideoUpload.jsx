import React, { useState } from "react";
import axios from "axios";
import "../Styles/Videos/Videoupload.css";
const VideoUpload = () => {
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleVideoUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("description", description);
    formData.append("video", videoFile);

    try {
      const token = localStorage.getItem("token"); // Replace with actual token
      const response = await axios.post(
        "http://localhost:4000/leet/auth/videos/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(response.data.message);
      alert("upload successfull");
    } catch (error) {
      console.error("Error uploading video:", error);
      setMessage("Failed to upload video");
    }
  };

  return (
    <div className="v-up">
      {" "}
      <div className="video-upload">
        <form onSubmit={handleVideoUpload}>
          <div className="video-upload-caption">
            <pre>caption:</pre>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="v-u-m3">
            <input
              type="file"
              accept="video/*"
              id="file-upload"
              onChange={(e) => setVideoFile(e.target.files[0])}
              required
            />
            <label htmlFor="file-upload" className="custom-file-upload">
              Choose File
            </label>
            <button type="submit">upload</button>
          </div>
        </form>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default VideoUpload;
