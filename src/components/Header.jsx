import React from "react";
import { IoHome } from "react-icons/io5";

import { FaUserAlt } from "react-icons/fa";
import { FaVideo } from "react-icons/fa6";

import "../Styles/Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <div className="header">
        <div className="header-img">
          <img src="CHeeT.png" alt="" width="125px" />
        </div>
        <Link to="/home">
          <button className="header-button">
            <IoHome />
          </button>
        </Link>

        <Link to="/profile">
          <button className="header-button">
            <FaUserAlt />
          </button>
        </Link>
       <Link to='/videos' ><button className="header-button">
          <FaVideo/>
        </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
