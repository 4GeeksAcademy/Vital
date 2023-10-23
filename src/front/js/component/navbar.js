import React from "react";
import Logo from "../../img/logo-vital.png";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-vital-black p-3">
      <div className="container d-flex justify-space-around">
        <a className="navbar-brand" href="#">
          <img src={Logo} style={{ width: "150px" }} />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
            <i className="fa-solid fa-bars" style={{ color: "#e13d3d" }}></i>
          </span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 fs-6">
            <li className="nav-item">
              <a
                className="nav-link text-vital-white active"
                aria-current="page"
                href="#"
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-vital-white active"
                aria-current="page"
                href="#"
              >
                About us
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-vital-white" href="#">
                Workout
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-vital-white active"
                aria-current="page"
                href="#"
              >
                Meal plans
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-vital-white active"
                aria-current="page"
                href="#"
              >
                Gyms near me
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-vital-white active"
                aria-current="page"
                href="#"
              >
                Store
              </a>
            </li>
          </ul>
        </div>
        <div>
          <Link to="/login">
            <button
              className="btn btn-outline-vital-orange text-vital-white rounded-pill"
              type="submit"
            >
              Log in
            </button>
          </Link>
          <Link to="/register">
            <button
              className="btn btn-vital-orange text-vital-white rounded-pill mx-3"
              type="submit"
            >
              Sign up free
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
