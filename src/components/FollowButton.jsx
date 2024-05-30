import React, { useState } from "react";
import { RiUserFollowFill } from "react-icons/ri";
import "../Styles/FollowButton.css";
const FollowButton = ({ followedUserId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFollow = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `http://localhost:4000/leet/auth/follow/${followedUserId}`,
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
        throw new Error(errorData.message || "Failed to follow user");
      }

      setLoading(true);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fb">
      <button onClick={handleFollow} disabled={loading}>
        <RiUserFollowFill />
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default FollowButton;
