import React, { useState } from 'react';
import './AddComment.css'
import { IoSend } from "react-icons/io5";
const AddComment5 = ({ videoId }) => {
  const [comment, setComment] = useState('');
  // State to track comments

  const handleAddComment = async () => {
    try {
      const token = localStorage.getItem('token');

      // Make a POST request to the API endpoint to add a comment using fetch
      const response = await fetch(
        `http://localhost:4000/leet/auth/videos5/${videoId}/comment`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ text: comment }),
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      // Update the state to reflect the added comment
 
      setComment('');
      alert('Comment added');
    } catch (error) {
      console.error('Error adding comment:', error);
      // Handle error if request fails
    }
  };

  return (
<>
<div className='AddComment'>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment"
      />
      <button onClick={handleAddComment} >
      <IoSend/>
      </button>
      <ul>
     
      </ul>
    </div></>
  );
};

export default AddComment5;
