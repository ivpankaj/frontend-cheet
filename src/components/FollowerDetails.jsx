import React, { useEffect, useState } from "react";
import "../Styles/FollowerDetails.css";
const FollowerDetails = ({ userId }) => {
  const [followerData, setFollowerData] = useState({
    totalFollowers: 0,
    usersWhoFollowed: [],
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/leet/auth/user/${userId}/followers`,
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
        setFollowerData(data);
      } catch (err) {
        console.error("Error fetching followers:", err);
        setError("Failed to fetch followers");
      }
    };

    fetchFollowers();
  }, [userId]);

  return (
    <div className="fd">
      {error && <p style={{ color: "red" }}>{error}</p>}
      <pre>Total Followers: {followerData.totalFollowers}</pre>

      <ul>
        {followerData.usersWhoFollowed.map((user, index) => (
          <pre key={index}>{user.username}</pre>
        ))}
      </ul>
    </div>
  );
};

export default FollowerDetails;
