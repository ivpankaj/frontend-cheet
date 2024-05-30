import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Register.css";

const Register = () => {
  const [userdata, setUser] = useState({
    username: "",
    email: "",
    password: "",
    bio: "", // Added bio field to state
  });
  const [avatar, setAvatar] = useState(null);

  const { username, email, password, bio } = userdata; // Destructure bio from state

  const handleChange = (e) => {
    setUser({ ...userdata, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("bio", bio); // Append bio to FormData
      if (avatar) {
        formData.append("avatar", avatar);
      }

      const response = await fetch("http://localhost:4000/leet/auth/register", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message === "Username or email already exists") {
          alert("Username or email already exists");
        } else {
          alert(data.message);
          setUser({ username: "", email: "", password: "", bio: "" }); // Reset bio field
          setAvatar(null);
        }
      } else {
        alert("Failed to create user");
      }
    } catch (error) {
      alert("Failed to create user");
    }
  };

  return (
    <div className="register">
      <div className="register-form">
        <img src="CHeeT.png" alt="" width="90px" />
        <pre>Register Here!</pre><hr />
        <pre>Enter your username (try something unique)</pre>
        <input
          type="text"
          placeholder="Enter your username"
          name="username"
          value={username}
          onChange={handleChange}
        />
        <pre>Enter about yourself</pre>
        <textarea
          placeholder="Enter about yourself"
          name="bio"
          value={bio} // Updated value to userdata.bio
          onChange={handleChange}
        />
        <pre>Enter your email</pre>
        <input
          type="email"
          placeholder="Enter your email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <pre>Enter your password (don't forget it)</pre>
        <input
          type="password"
          placeholder="Create your password"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <pre>Upload your avatar</pre>
        <input type="file" accept="image/*" onChange={handleFileChange} />

        <div className="signup2">
          <button className="submit" onClick={handleSubmit}>
            Submit
          </button>

          <Link to="/">
            <button>Have an Account? Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
