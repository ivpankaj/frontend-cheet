import React, { useState, useEffect } from "react";
import LikeButton from "./LikeButton";
import DislikeButton from "./DislikeButton";
import CommentForm from "./CommentForm";

import { FaCommentAlt } from "react-icons/fa";
import Comments from "./Comments";
import Likeuserlist from "./Likeuserlist";
import { MdDelete } from "react-icons/md";
const MyTweets = () => {
  const [tweets, setTweets] = useState([]);
  const [error, setError] = useState(null);
  const [activeCommentPostId, setActiveCommentPostId] = useState(null);
  const [likedPosts, setLikedPosts] = useState({});
  const [likeUserLists, setLikeUserLists] = useState({});

  useEffect(() => {
    if (!tweets.length) {
      fetchDetails();
    }
  }, []);

  const fetchDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        "http://localhost:4000/leet/auth/mytweets",
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setTweets(data.tweets);

      const initialFollowState = data.tweets.reduce((acc, tweet) => {
        acc[tweet.createdBy._id] = tweet.createdBy.isFollowed;
        return acc;
      }, {});
      setFollowedUsers(initialFollowState);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCommentToggle = (postId) => {
    setActiveCommentPostId(activeCommentPostId === postId ? null : postId);
  };

  const handleUserLikeToggle = (postId) => {
    setLikeUserLists((prevLikeUserLists) => ({
      ...prevLikeUserLists,
      [postId]: !prevLikeUserLists[postId],
    }));
  };

  const handleLikeToggle = (postId) => {
    setLikedPosts((prevLikedPosts) => ({
      ...prevLikedPosts,
      [postId]: !prevLikedPosts[postId],
    }));
  };

  const handleDelete = async (tweetId) => {
    try {
      const token = localStorage.getItem("token");
      const requestOptions = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        `http://localhost:4000/leet/auth/tweets/${tweetId}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // If tweet is deleted successfully, update state to reflect the change
      setTweets(tweets.filter((tweet) => tweet._id !== tweetId));
    } catch (error) {
      console.error("Error deleting tweet:", error);
      // Handle error, if any
    }
  };
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <div className="welcome">
      <div className="leets">
        {Array.isArray(tweets) &&
          tweets.map((item) => (
            <div className="card" key={item._id}>
              {item.createdBy.avatar && (
                <img
                  src={`http://localhost:4000/${item.createdBy.avatar}`}
                  alt="Avatar"
                  className="avatar"
                  width="70"
                />
              )}
              <pre>{item.createdBy.username}</pre>
              <hr />
              <div className="card-content">
              {item.picture &&(
                  <img 
                  src={`http://localhost:4000/${item.picture}`}
                  className="picture"
                  width="250"
                  />
                )}
                </div>
                {item.data}
              <div className="card-footer">
                <button onClick={() => handleLikeToggle(item._id)}>
                  {likedPosts[item._id] ? (
                    <DislikeButton postId={item._id} />
                  ) : (
                    <LikeButton postId={item._id} />
                  )}
                </button>
                <button onClick={() => handleCommentToggle(item._id)}>
                  <FaCommentAlt />
                </button>
                <button onClick={() => handleDelete(item._id)}>
                  <MdDelete />
                </button>
              </div>
              {activeCommentPostId === item._id && (
                <>
                  <CommentForm postId={item._id} />
                  <Comments postId={item._id} />
                </>
              )}
              <button
                className="seewho"
                onClick={() => handleUserLikeToggle(item._id)}
              >
                see who have liked
              </button>
              {likeUserLists[item._id] && <Likeuserlist postId={item._id} />}
              <pre>{formatDate(item.createdAt)}</pre>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyTweets;
