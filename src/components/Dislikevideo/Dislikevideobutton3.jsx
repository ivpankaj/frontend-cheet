import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import { IoHeartDislikeSharp } from "react-icons/io5";
const Dislikevideobutton3 = ({ videoId }) => {
  const [disliked, setDisliked] = useState(false); // State to track if the video is disliked

  const handleDislike = async () => {
    try {
      const token = localStorage.getItem('token');

      // Make a POST request to the API endpoint to dislike the video
      await axios.post(
        `http://localhost:4000/leet/auth/videos3/${videoId}/dislike`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Update the state to reflect that the video has been disliked
     
      setDisliked(true);
    } catch (error) {
      console.error('Error disliking video:', error);
      // Handle error if request fails
    }
  };

  return (
    <button onClick={handleDislike} disabled={disliked}>
    <IoHeartDislikeSharp/>
    </button>
  );
};

export default Dislikevideobutton3;
