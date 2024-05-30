import React from "react";
import Profile from "./Profile";

import "../Styles/Home.css";
import Welcome from "./Welcome";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Post from "./Post";
import VideoUpload from "./VideoUpload";
import VideoList from "./VideoList";
const Home = () => {
  return (
    <div className="home">
      <Header/>
      <Post/>
      {/* <Profile /> */}
      <Welcome />
    
      
    </div>
  );
};

export default Home;
