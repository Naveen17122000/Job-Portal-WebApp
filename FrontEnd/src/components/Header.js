import React, { useState } from "react";
import "./Header.css";
import { useLocation,NavLink } from "react-router-dom";
import 'boxicons'
const Navbar = () => {
 
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  return (
    <>
      <nav className="main-nav">
        {/* 1st logo part  */}
        <div className="logo">
          <img src="./images/logo.png"/>
        <h1>JobPortal</h1>
        </div>

        {/* 2nd menu part  */}
        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="#">about</NavLink>
            </li>
            <li>
              <NavLink to="#">services</NavLink>
            </li>
            <li>
              <NavLink to="/contact">contact</NavLink>
            </li>
          </ul>
        </div>

        {/* 3rd social media links */}
        <div className="social-media">
          <ul className="social-media-desktop">
            <li>
              <a
                href="https://www.facebook.com/VCubeSoftwareSolutions"
                target="_thapa">
                <box-icon name='facebook-square' type='logo' color='#1c1ae7' size="lg" ></box-icon>
                
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/vcubesoftwaresolutions/"
                target="_thapa">
                <box-icon type='logo' name='instagram'  color='#c32aa3' size="lg" ></box-icon>
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/@VCUBESoftwareSolutions"
                target="_thapa">
                <box-icon type='logo' name='youtube' color='#cc2417' size="lg"></box-icon>
              </a>
            </li>
          </ul>

          {/* hamburget menu start  */}
          <div className="hamburger-menu">
            <a href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
            <box-icon name='menu' ></box-icon>
            </a>
          </div>
        </div>
      </nav>

      {/* hero section  */}
      {/* <section className="hero-section">
        <p>Welcome to </p>
        <h1>Thapa Technical</h1>
      </section> */}
    </>
  );
};

export default Navbar;
