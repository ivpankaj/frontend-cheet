import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import Likevideobutton1 from "./LikeVideo/Likevideobutton1";
import Dislikevideobutton1 from "./Dislikevideo/Dislikevideobutton1";
import AddComment from "./commentvideo/AddComment";
import CommentsList from "./commentvideo/CommentsList";
import LikeInfo from "./LikeVideo/LikeInfo";
import "../Styles/Videos/VideoList.css";
import { FaMessage } from "react-icons/fa6";
import DeleteVideoButton from "./Deletevideobutton/DeleteVideoButton";

const MyVideos = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");
  const [likedPosts, setLikedPosts] = useState({});
  const [activeCommentVideoId, setActiveCommentVideoId] = useState(null);
  const [activeLikeInfoVideoId, setActiveLikeInfoVideoId] = useState(null);
  const videoRefs = useRef({});
  const observerRef = useRef(null);

  const handleShowComment = (videoId) => {
    setActiveCommentVideoId(activeCommentVideoId === videoId ? null : videoId);
  };

  const handleShowLike = (videoId) => {
    setActiveLikeInfoVideoId(
      activeLikeInfoVideoId === videoId ? null : videoId
    );
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
          "http://localhost:4000/leet/auth/myvideos",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("API response:", response.data);

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
                  <Dislikevideobutton1 videoId={video._id} />
                ) : (
                  <Likevideobutton1 videoId={video._id} />
                )}
              </button>
              <button onClick={() => handleShowComment(video._id)}>
                <FaMessage />
              </button>
              <DeleteVideoButton videoId={video._id} />
            </div>
            <button className="see-who" onClick={() => handleShowLike(video._id)}>see who have liked</button>
            {activeCommentVideoId === video._id && (
              <>
                <AddComment videoId={video._id} />
                <CommentsList videoId={video._id} />
              </>
            )}
            {activeLikeInfoVideoId === video._id && <LikeInfo videoId={video._id} />}
            <pre>{formatDate(video.createdAt)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyVideos;
