import React, { useState } from "react";
import { RiUserUnfollowFill } from "react-icons/ri";
import '../Styles/UnfollowButton.css'
const UnfollowButton = ({ unfollowedUserId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUnfollow = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `http://localhost:4000/leet/auth/unfollow/${unfollowedUserId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to unfollow user");
      }
      setLoading(true);
      
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="ub">
      <button onClick={handleUnfollow} disabled={loading}>
        <RiUserUnfollowFill />
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default UnfollowButton;
