import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";

import "../Styles/Videos/VideoList.css";
import { FaMessage } from "react-icons/fa6";

import Dislikevideobutton3 from "./Dislikevideo/Dislikevideobutton3";
import Likevideobutton3 from "./LikeVideo/Likevideobutton3";
import AddComment3 from "./commentvideo/AddComment3";
import CommentList3 from "./commentvideo/CommentsList3";
import LikeInfo3 from "./LikeVideo/LikeInfo3";
import DeleteVideoButton3 from "./Deletevideobutton/DeleteVideoButton3";

const MyVideos3 = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");
  const [likedPosts, setLikedPosts] = useState({});
  const [showComment, setShowComment] = useState(false);
  const [likeInfo, setLikeInfo] = useState(false);
  const videoRefs = useRef({});
  const observerRef = useRef(null);
  const handleShowComment = () => {
    setShowComment(!showComment);
  };

  const handleShowLike = () => {
    setLikeInfo(!likeInfo);
  };

  const handleLikeToggle = (videoId) => {
    setLikedPosts((prevLikedPosts) => ({
      ...prevLikedPosts,
      [videoId]: !prevLikedPosts[videoId],
    }));
  };
  const handleIntersection = useCallback((entries) => {
    entries.forEach((entry) => {
      const videoElement = entry.target;
      if (entry.isIntersecting) {
        videoElement.play();
      } else {
        videoElement.pause();
      }
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
    });

    observerRef.current = observer;

    Object.values(videoRefs.current).forEach((video) => {
      if (video) {
        observer.observe(video);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [videos, handleIntersection]);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:4000/leet/auth/myvideos3",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("API response:", response.data); // Log the response data

        // Adjusting the handling of the response to make sure it fits the expected structure
        if (response.data && Array.isArray(response.data.videos)) {
          setVideos(response.data.videos);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
        setError(`Failed to fetch videos: ${error.message}`);
      }
    };

    fetchVideos();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="v-li">
    <div className="video-list">
     {error && <p className="error">{error}</p>}

     {videos.map((video) => (
       <div key={video._id} className="video-card">
         <div className="video-card-header">
           <div className="video-header">
           {video.createdBy.avatar && (
               <img
                 src={`http://localhost:4000/${video.createdBy.avatar}`}
                 alt="Avatar"
                 className="avatar"
                 width="50"
               />
             )}
             <pre className="username">{video.createdBy.username}</pre>
             <button
               className="f-but"
               onClick={() => handleFollowToggle(video.createdBy._id)}
             >

             </button>
           </div>
         </div>
         <video ref={(el) => (videoRefs.current[video._id] = el)}
              controls
              data-id={video._id}
              >
           <source
             src={`http://localhost:4000/${video.videoUrl}`}
             type="video/mp4"
           />
           Your browser does not support the video tag.
         </video>
         <div className="video-caption">
           <p className="description">{video.description}</p>
         </div>
         <div className="video-button">
           <button onClick={() => handleLikeToggle(video._id)}>
             {likedPosts[video._id] ? (
               <Dislikevideobutton3 videoId={video._id} />
             ) : (
               <Likevideobutton3 videoId={video._id} />
             )}
           </button>
           <button onClick={handleShowComment}>
             <FaMessage />
           </button>
           <DeleteVideoButton3 videoId={video._id}/>
         </div>
         <button className="see-who" onClick={handleShowLike}>see who have liked</button>
         {showComment ? (
           <>
             <AddComment3 videoId={video._id} />
             <CommentList3 videoId={video._id} />
           </>
         ) : null}
        {
         likeInfo ? ( <LikeInfo3 videoId={video._id} />):(null)
        }
      <pre>{formatDate(video.createdAt)}</pre>
       </div>
     ))}
   </div>
  </div>
  );
};

export default MyVideos3;