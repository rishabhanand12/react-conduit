import React from "react";
import { Link } from "react-router-dom";

export default function Header(props) {
  return (
    <>
      <header className="header container">
        <Link to="/">
          <h1 className="logo">Conduit</h1>
        </Link>
        <nav className="header-nav">
          <ul className="nav-menu">
            {props.isLoggedIn ? (
              <AuthenticatedHeader user={props.loggedInUser.username} />
            ) : (
              <UnauthenticatedHeader />
            )}
          </ul>
        </nav>
      </header>
    </>
  );
}

function AuthenticatedHeader(props) {
  return (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/">New Post</Link>
      </li>
      <li>
        <Link to="/">Settings</Link>
      </li>
      <li>
        <Link to="/">{props.user}</Link>
      </li>
    </>
  );
}

function UnauthenticatedHeader() {
  return (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/signup">Signup</Link>
      </li>
    </>
  );
}
