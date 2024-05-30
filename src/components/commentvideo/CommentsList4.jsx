import React, { useEffect, useState } from "react";

const CommentList4 = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(videoId);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication token not found");
        }
        const response = await fetch(
          `http://localhost:4000/leet/auth/videos4/${videoId}/comment`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }
        const data = await response.json();
        setComments(data.comments);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setError("Failed to fetch comments. Please try again.");
        setLoading(false);
      }
    };

    fetchComments();
  }, [videoId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
   <>
    <div>
      <pre>comments</pre>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <div className="comment-box" key={comment._id}>
              <pre>
                {comment.createdBy.username}:- {comment.text}
              </pre>
            </div>
          ))}
        </ul>
      ) : (
        <p>No comments available.</p>
      )}
    </div></>
  );
};

export default CommentList4;
