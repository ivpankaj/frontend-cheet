import React, { useState } from 'react';
import '../Styles/Post.css';
import { RiSendPlane2Fill } from "react-icons/ri";

const Post = () => {
  const [tweetContent, setTweetContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleContentChange = (e) => {
    setTweetContent(e.target.value);
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (tweetContent.trim() === '') {
      alert('Please enter some content before posting.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const formData = new FormData();
      formData.append('data', tweetContent);
      if (selectedImage) {
        formData.append('picture', selectedImage);
      }

      const response = await fetch('http://localhost:4000/leet/auth/tweets/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setTweetContent('');
        setSelectedImage(null);
        alert('Tweet posted successfully!');
      } else {
        throw new Error('Failed to create tweet');
      }

    } catch (error) {
      console.error('Error posting tweet:', error);
      alert('Failed to post tweet. Please try again later.');
    }
  };

  return (
    <div className='post'>
      <form onSubmit={handleSubmit}>
        <textarea
          value={tweetContent}
          onChange={handleContentChange}
          placeholder="What's on your mind?"
          rows={4}
          cols={50}
          required
        />
        <br />

        <br />
        <button type="submit"><RiSendPlane2Fill /></button>
        <input className='file-t'
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </form>
    </div>
  );
};

export default Post;
