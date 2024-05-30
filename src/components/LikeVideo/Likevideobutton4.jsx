import React, { useState } from "react";
import { FcLike } from "react-icons/fc";
const Likevideobutton4 = ({ videoId }) => {
  const [liked, setLiked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:4000/leet/auth/videos4/${videoId}/like`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(videoId);
      if (!response.ok) {
        if (
          response.headers.get("content-type") &&
          response.headers.get("content-type").includes("application/json")
        ) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to like the post");
        } else {
          throw new Error("Server Error");
        }
      }

      setLiked(true);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <button onClick={handleLike} disabled={liked}>
        <FcLike />
      </button>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default Likevideobutton4;
