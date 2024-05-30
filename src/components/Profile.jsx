import { useEffect, useState } from "react";
import Header from "./Header";
import FollowerDetails from "./FollowerDetails";
import FollowingList from "./FollowingList";
import Logout from "./Logout";
import MyTweets from "./MyTweets";
import "../Styles/Profile.css";
import Videoshow2 from "./Videoshow2";

function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [showFollower, setShowFollower] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [visibleDiv, setVisibleDiv] = useState(null);

  const handleClick = (divId) => {
    setVisibleDiv(divId);
  };

  const handleShowFollowing = () => {
    setShowFollowing(!showFollowing);
  };

  const handleShowFollower = () => {
    setShowFollower(!showFollower);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
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
          "http://localhost:4000/leet/auth/user",
          requestOptions
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchUserDetails();
  }, []);

  return (
    <>
      <Header />
      <div className="profile">
        {user && (
          <>
            <div className="p-head2">
              <div className="p-head-avatar">
                {" "}
                {user.avatar && (
                  <img
                    className="avatar"
                    src={`http://localhost:4000/${user.avatar}`}
                    alt="Avatar"
                  width="100"
                  />
                )}
              </div>
              <div className="p-headd1">
                {" "}
                <pre>
                 <span>{user.username}</span>
                </pre>
                <pre>{user.email}</pre>
                <pre>{user.bio}</pre>
              </div>
            </div>

            <div className="p-butt">
              <button onClick={handleShowFollower}>Followers</button>
              <button onClick={handleShowFollowing}>Following</button>
            </div>
            {showFollower && <FollowerDetails userId={user._id} />}
            {showFollowing && <FollowingList userId={user._id} />}

            <div className="p-butt2">
            <button onClick={() => handleClick("div1")}>My tweets</button> <hr />
            <button onClick={() => handleClick("div2")}>My Videos</button>
            
            </div>
            <hr />
            {visibleDiv === "div1" && <MyTweets />}
            {visibleDiv === "div2" && <Videoshow2 />}

            <Logout />
          </>
        )}
        {error && <div className="error">{error}</div>}
      </div>
    </>
  );
}

export default Profile;
