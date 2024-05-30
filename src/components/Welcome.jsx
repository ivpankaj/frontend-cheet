import React, { useState, useEffect } from "react";
import LikeButton from "./LikeButton";
import DislikeButton from "./DislikeButton";
import CommentForm from "./CommentForm";
import "../Styles/Welcome.css";
import { FaCommentAlt } from "react-icons/fa";
import Comments from "./Comments";
import Likeuserlist from "./Likeuserlist";
import FollowButton from "./FollowButton";
import UnfollowButton from "./UnfollowButton";

const Welcome = () => {
  const [tweets, setTweets] = useState([]);
  const [error, setError] = useState(null);
  const [activeCommentPostId, setActiveCommentPostId] = useState(null);
  const [likedPosts, setLikedPosts] = useState({});
  const [likeUserLists, setLikeUserLists] = useState({});
  const [followedUsers, setFollowedUsers] = useState({});

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
        "http://localhost:4000/leet/auth/tweets",
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

  const handleFollowToggle = (userId) => {
    setFollowedUsers((prevFollowedUsers) => ({
      ...prevFollowedUsers,
      [userId]: !prevFollowedUsers[userId],
    }));
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
              <div className="card-header">
                {" "}
                {item.createdBy.avatar && (
                  <img
                    src={`http://localhost:4000/${item.createdBy.avatar}`}
                    alt="Avatar"
                    className="avatar"
                    width="55"
                  />
                )}
                <pre className="name-card">{item.createdBy.username}</pre>
                <button
                  className="f-but"
                  onClick={() => handleFollowToggle(item.createdBy._id)}
                >
                  {followedUsers[item.createdBy._id] ? (
                    <UnfollowButton unfollowedUserId={item.createdBy._id} />
                  ) : (
                    <FollowButton followedUserId={item.createdBy._id} />
                  )}
                </button>
              </div>
              <hr />
              <div className="card-content">
                {item.picture && (
                  <img
                    src={`http://localhost:4000/${item.picture}`}
                    className="picture"
                  />
                )}
              </div>
              <div>{item.data}</div>
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
                <button></button>
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

export default Welcome;
