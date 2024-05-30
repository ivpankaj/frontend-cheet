import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";

import "../Styles/Videos/VideoList.css";
import { FaMessage } from "react-icons/fa6";

import Dislikevideobutton5 from "./Dislikevideo/Dislikevideobutton5";
import Likevideobutton5 from "./LikeVideo/Likevideobutton5";
import AddComment5 from "./commentvideo/AddComment5";
import CommentList5 from "./commentvideo/CommentsList5";
import LikeInfo5 from "./LikeVideo/LikeInfo5";
import DeleteVideoButton5 from "./Deletevideobutton/DeleteVideoButton5";

const MyVideos5 = () => {
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
          "http://localhost:4000/leet/auth/myvideos5",
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
         <video  ref={(el) => (videoRefs.current[video._id] = el)}
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
               <Dislikevideobutton5 videoId={video._id} />
             ) : (
               <Likevideobutton5 videoId={video._id} />
             )}
           </button>
           <button onClick={handleShowComment}>
             <FaMessage />
           </button>
           <DeleteVideoButton5 videoId={video._id}/>
         </div>
         <button className="see-who" onClick={handleShowLike}>see who have liked</button>
         {showComment ? (
           <>
             <AddComment5 videoId={video._id} />
             <CommentList5 videoId={video._id} />
           </>
         ) : null}
        {
         likeInfo ? ( <LikeInfo5 videoId={video._id} />):(null)
        }
      <pre>{formatDate(video.createdAt)}</pre>
       </div>
     ))}
   </div>
  </div>
  );
};

export default MyVideos5;
