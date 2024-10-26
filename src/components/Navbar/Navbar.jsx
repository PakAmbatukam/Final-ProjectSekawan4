import React from "react";
import "./Navbar.css";
import logo from "../../assets/ClickFilm.png";
import search_icon from "../../assets/search_icon.png";
import bell_icon from "../../assets/bell_icon.svg";
import profile_img from "../../assets/profile_img.png";
import caret_icon from "../../assets/caret_icon.svg";
import { Link } from "react-router-dom";
import SearchMovies from "../Search/Search";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="" />
        <ul>
          <Link to={"/"}>
            {" "}
            <li>Home</li>
          </Link>
          <Link to={"/tvshows"}>
            {" "}
            <li>TvShows</li>
          </Link>
          <Link to={"/movies"}>
            {" "}
            <li>Movies</li>
          </Link>
          <Link to={"/genre-filter"}>
            {" "}
            <li>Movies by Genre</li>
          </Link>
          <li>Your Ratings</li>
        </ul>
      </div>

      <div className="navbar-right">
        <SearchMovies />
        <img src={bell_icon} alt="" className="icons" />
        <div className="navbar-profile">
          <img src={profile_img} alt="" className="profile" />
          <img src={caret_icon} alt="" />
          <div className="dropdown">
            <p>Sign Out of Netflix</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
