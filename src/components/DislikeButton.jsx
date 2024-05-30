import React, { useState } from "react";
import { IoHeartDislikeSharp } from "react-icons/io5";
import LikeButton from "./LikeButton";
const DislikeButton = ({ postId }) => {
  const [disliked, setDisliked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:4000/leet/auth/tweets/${postId}/dislike`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(postId);
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

      setDisliked(true);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <button onClick={handleLike} disabled={disliked}>
        <IoHeartDislikeSharp />
      </button>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default DislikeButton;
