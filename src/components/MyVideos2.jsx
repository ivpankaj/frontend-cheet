import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import LikeInfo from "./LikeVideo/LikeInfo";
import "../Styles/Videos/VideoList.css";
import { FaMessage } from "react-icons/fa6";
import DeleteVideoButton from "./Deletevideobutton/DeleteVideoButton";
import Dislikevideobutton2 from "./Dislikevideo/Dislikevideobutton2";
import Likevideobutton2 from "./LikeVideo/Likevideobutton2";
import AddComment2 from "./commentvideo/AddComment2";
import CommentList2 from "./commentvideo/CommentsList2";
import LikeInfo2 from "./LikeVideo/LikeInfo2";
import DeleteVideoButton2 from "./Deletevideobutton/DeleteVideoButton2";

const MyVideos2 = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");
  const [likedPosts, setLikedPosts] = useState({});
  const [showComments, setShowComments] = useState({});
  const [likeInfo, setLikeInfo] = useState({});
  const videoRefs = useRef({});

  const handleShowComment = (videoId) => {
    setShowComments((prevShowComments) => ({
      ...prevShowComments,
      [videoId]: !prevShowComments[videoId],
    }));
  };

  const handleShowLike = (videoId) => {
    setLikeInfo((prevLikeInfo) => ({
      ...prevLikeInfo,
      [videoId]: !prevLikeInfo[videoId],
    }));
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
          "http://localhost:4000/leet/auth/myvideos2",
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

  const handleFollowToggle = (userId) => {
    // Implement the follow/unfollow logic here
    console.log(`Follow/unfollow user with ID: ${userId}`);
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
                  Follow
                </button>
              </div>
            </div>
            <video
              ref={(el) => (videoRefs.current[video._id] = el)}
              controls
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
                  <Dislikevideobutton2 videoId={video._id} />
                ) : (
                  <Likevideobutton2 videoId={video._id} />
                )}
              </button>
              <button onClick={() => handleShowComment(video._id)}>
                <FaMessage />
              </button>
              <DeleteVideoButton2 videoId={video._id} />
            </div>
            <button
              className="see-who"
              onClick={() => handleShowLike(video._id)}
            >
              see who have liked
            </button>
            {showComments[video._id] && (
              <>
                <AddComment2 videoId={video._id} />
                <CommentList2 videoId={video._id} />
              </>
            )}
            {likeInfo[video._id] && <LikeInfo2 videoId={video._id} />}
            <pre>{formatDate(video.createdAt)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyVideos2;
