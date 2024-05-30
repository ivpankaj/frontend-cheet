import React, { useState } from "react";
import "../Styles/CommentForm.css";
import { IoSend } from "react-icons/io5";
const CommentForm = ({ postId }) => {
  const [text, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCommentSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found");
      }
      const response = await fetch(
        `http://localhost:4000/leet/auth/tweets/${postId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ text }),
        }
      );

      if (response.ok) {
        // Reset the form fields
        const data = await response.json();
        setContent("");
        setErrorMessage("");
        // You can update the UI as needed, like showing a success message or refreshing the comments
        console.log("Comment added successfully");
       
        alert("Comment added successfully");
      } else {
        // Check if the response is HTML
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("text/html")) {
          throw new Error("Server Error");
        }

        // Otherwise, parse JSON error response
        const errorData = await response.json();
        throw new Error(errorData.message || "Add comment");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="comment">
      <textarea
        value={text}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter your comment..."
        rows={4}
        cols={50}
        required
      />
      <br />
      <button onClick={handleCommentSubmit} type="submit">
        <IoSend />
      </button>

      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default CommentForm;
