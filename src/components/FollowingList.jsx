import React, { useEffect, useState } from "react";
import "../Styles/FollowingList.css";
const FollowingList = ({ userId }) => {
  const [followingData, setFollowingData] = useState({
    totalFollowing: 0,
    usersBeingFollowed: [],
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/leet/auth/user/${userId}/following`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // assuming the token is stored in localStorage
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch followers");
        }

        const data = await response.json();
        setFollowingData(data);
      } catch (err) {
        console.error("Error fetching followers:", err);
        setError("Failed to fetch followers");
      }
    };

    fetchFollowing();
  }, [userId]);

  return (
    <div className="fl">
      {error && <p style={{ color: "red" }}>{error}</p>}
      <pre>Total Following: {followingData.totalFollowing}</pre>

      <ul>
        {followingData.usersBeingFollowed.map((user, index) => (
          <pre key={index}>{user.username}</pre>
        ))}
      </ul>
    </div>
  );
};

export default FollowingList;
