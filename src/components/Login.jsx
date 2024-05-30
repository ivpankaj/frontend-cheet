import React, { useState } from "react";
import "../Styles/Login.css";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import Home from "./Home";

const Login = () => {
  const [userdata, setUser] = useState({
    username: "",
    password: "",
  });
  const [islogin, setLogin] = useState(false);
  const { username, password } = userdata;
  const handlechange = (e) => {
    setUser({ ...userdata, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    try {
      const data = await fetch("http://localhost:4000/leet/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userdata),
      });
      if (data.ok) {
        const response = await data.json();
        alert("login successfull");
        const { token } = response;
        //store token in localstorage
        localStorage.setItem("token", token);
        setLogin(true);
      } else {
        alert("Invalid credentials"); // Display alert if login fails
      }
    } catch (error) {
      console.log("error to login");
    }
  };
  return (
    <>
      {islogin ? (
        <Home username={username} />
      ) : (
        <div className="login">
        
          <div className="form">
          <img src="CHeeT.png" alt="" width="90px"/>
          <pre>A fun way to explore more fun!</pre>
            <pre> Login Here!</pre><hr />
            <pre>Enter your name</pre>
            <input
              type="text"
              placeholder="Enter your username"
              name="username"
              value={username}
              onChange={handlechange}
            />
            <pre>Enter your password</pre>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={password}
              onChange={handlechange}
            />
            <div className="signup">
              <button onClick={handleSubmit}>submit</button>
              <Link to="/register">
                <button>No account ? Signup</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
