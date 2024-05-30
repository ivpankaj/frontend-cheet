import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import UnfollowButton from "./UnfollowButton";
import FollowButton from "./FollowButton";
import "../Styles/Videos/VideoList.css";
import { FaMessage } from "react-icons/fa6";
import Dislikevideobutton4 from "./Dislikevideo/Dislikevideobutton4";
import Likevideobutton4 from "./LikeVideo/Likevideobutton4";
import AddComment4 from "./commentvideo/AddComment4";
import CommentList4 from "./commentvideo/CommentsList4";
import LikeInfo4 from "./LikeVideo/LikeInfo4";


const VideoList4 = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");
  const [likedPosts, setLikedPosts] = useState({});
  const [followedUsers, setFollowedUsers] = useState({});
  const [showcomment, setShowc] = useState(false);
  const [likeinfo,setlikeinfo] = useState(false)
  const videoRefs = useRef({});
  const observerRef = useRef(null);
  const handleshowcomment = () => {
    setShowc(!showcomment);
  };

  const handleshowlike = ()=>{
    setlikeinfo(!likeinfo)
  }
  const handleLikeToggle = (videoId) => {
    setLikedPosts((prevLikedPosts) => ({
      ...prevLikedPosts,
      [videoId]: !prevLikedPosts[videoId],
    }));
  };

  const handleFollowToggle = (userId) => {
    setFollowedUsers((prevFollowedUsers) => ({
      ...prevFollowedUsers,
      [userId]: !prevFollowedUsers[userId],
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
        const token = localStorage.getItem("token"); // Replace with actual token
        const response = await axios.get(
          "http://localhost:4000/leet/auth/videos4",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setVideos(response.data);

        // Initialize follow state
        const initialFollowState = response.data.reduce((acc, video) => {
          acc[video.createdBy._id] = video.createdBy.isFollowed;
          return acc;
        }, {});
        setFollowedUsers(initialFollowState);
      } catch (error) {
        console.error("Error fetching videos:", error);
        setError("Failed to fetch videos");
      }
    };

    fetchVideos();
  }, []);
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
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
                {followedUsers[video.createdBy._id] ? (
                  <UnfollowButton unfollowedUserId={video.createdBy._id} />
                ) : (
                  <FollowButton followedUserId={video.createdBy._id} />
                )}
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
                <Dislikevideobutton4 videoId={video._id} />
              ) : (
                <Likevideobutton4 videoId={video._id} />
              )}
            </button>
            <button onClick={handleshowcomment}>
              <FaMessage />
            </button>
          </div>
          <button className="see-who" onClick={handleshowlike}>see who have liked</button>
          {showcomment ? (
            <>
              <AddComment4 videoId={video._id} />
              <CommentList4 videoId={video._id} />
            </>
          ) : null}
         {
          likeinfo ? ( <LikeInfo4 videoId={video._id} />):(null)
         }
       <pre>{formatDate(video.createdAt)}</pre>
        </div>
      ))}
    </div>
   </div>
  );
};

export default VideoList4;
