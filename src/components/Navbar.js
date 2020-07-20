import React from "react";
import { isAuthenticated } from "../Helpers";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          {!isAuthenticated() ? (
            <Link to="/" className="nav-item nav-link active" href="#">
              Register <span className="sr-only">(current)</span>
            </Link>
          ) : (
            <>
              <Link to="/" className="nav-item nav-link active" href="#">
                Register <span className="sr-only">(current)</span>
              </Link>
              <Link to="/rooms" className="nav-item nav-link active" href="#">
                Boards
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
