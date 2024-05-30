import React, { useEffect, useState } from "react";

const LikeInfo4 = ({ videoId }) => {
  const [likesData, setLikesData] = useState({
    totalLikes: 0,
    usersWhoLiked: [],
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/leet/auth/videos4/${videoId}/likes`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // assuming the token is stored in localStorage
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch likes");
        }

        const data = await response.json();
        setLikesData(data);
      } catch (err) {
        console.error("Error fetching likes:", err);
        setError("Failed to fetch likes");
      }
    };

    fetchLikes();
  }, [videoId]);

  return (
    <div>
      <pre>Total Likes: {likesData.likesCount}</pre>

      <ul>
        {likesData.usersWhoLiked.map((user, index) => (
          <div key={index}>{user.username}</div>
        ))}
      </ul>
    </div>
  );
};

export default LikeInfo4;
