import React, { useState, useEffect } from 'react';
import { MdDelete } from "react-icons/md";
const DeleteVideoButton2 = ({ videoId }) => {
  const [videos, setVideos] = useState([]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const requestOptions = {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await fetch(`http://localhost:4000/leet/auth/videos2/${id}`, requestOptions);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // If the video is deleted successfully, update state to reflect the change
      setVideos((prevVideos) => prevVideos.filter((video) => video._id !== id));
      alert("video deleted")
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  useEffect(() => {
    // Fetch the videos initially or any other logic to populate the videos state
    const fetchVideos = async () => {
      // Assuming you have a function to fetch videos
      const fetchedVideos = await fetch('http://localhost:4000/leet/auth/videos2', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }).then((res) => res.json());

      setVideos(fetchedVideos);
    };

    fetchVideos();
  }, []);

  return (
    <button onClick={() => handleDelete(videoId)}><MdDelete/></button>
  );
};

export default DeleteVideoButton2;
