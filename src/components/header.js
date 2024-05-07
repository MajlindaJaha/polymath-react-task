import React from "react";
import { Link } from "react-router-dom";
import { unAuthUser } from "../helpers/auth";

const Header = () => {
  const handleLogout = () => {
    unAuthUser();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tasks">
                Tasks
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/lists">
                Lists
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            <button
              className="btn btn-outline-danger me-2"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
