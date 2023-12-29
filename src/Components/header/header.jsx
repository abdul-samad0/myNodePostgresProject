import React, { useState } from 'react';
import logo from "../../logo-removebg-preview.png";
import { Link } from 'react-router-dom';
import { ImSearch } from 'react-icons/im';
import { FaBars } from 'react-icons/fa'; // Import the Bars icon for the dropdown

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="header">
      <img src={logo} alt="" />
      <div className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/tvshows">TV Shows</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/tvshows">My List</Link>
      </div>
      <div className="dropdown-icon" onClick={toggleDropdown}>
        <FaBars />
      </div>
      {showDropdown && (
        <div className="dropdown-menu">
          <Link to="/">Home</Link>
          <Link to="/tvshows">TV Shows</Link>
          <Link to="/tvshows">Movies</Link>
          <Link to="/tvshows">My List</Link>
        </div>
      )}
      <ImSearch />
    </nav>
  );
};

export default Header;
