import React from "react";
import {Link} from 'react-router-dom';

export default function Header() {
  return (
    <>
      <header className="header container">
      <Link to="/"> <h1 className="logo">Conduit</h1></Link>
        <nav className="header-nav">
          <ul className="nav-menu">
            {/* <a href="#"><li>Home</li></a>
            <a href="#"><li>Sign Up</li></a>
            <a href="#"><li>Sign In</li></a> */}
            <li>Home</li>
            <li>Sign Up</li>
            <li>Sign In</li>
          </ul>
        </nav>
      </header>
    </>
  );
}
