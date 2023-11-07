import React, { useContext } from "react";
import Logo from "../../img/logo-vital.png";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext"
// import { BagHandleOutline } from "react-ionicons";

export const Navbar = () => {
  const { store, actions } = useContext(Context)
  const navigate = useNavigate();
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
                onClick={() => navigate("/")}
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
              <a className="nav-link text-vital-white" onClick={() => navigate("/exercises")}>
                Workout
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-vital-white active"
                aria-current="page"

              >
                Meal plans
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-vital-white active"
                aria-current="page"
                onClick={() => navigate("/gyms-map")}
              >
                Gyms near me
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-vital-white active"
                aria-current="page"
                onClick={() => navigate("/store")}
              >
                Store
              </a>
            </li>
          </ul>
        </div>
        <Link to="/shopping-cart">
        <i className="fa-solid fa-cart-shopping text-vital-orange fs-5" ></i>
          {/* <span className="me-3">
            <BagHandleOutline color={"#ff5300"} />
          </span> */}
        </Link>
        {store.token ? console.log("true", store.token) : console.log("false", store.token)}
        {
          store.token ? (
            <button
              className="btn btn-vital-orange text-vital-white rounded-pill mx-3"
              type="submit"
              onClick={() => actions.logout()}
            >
              Logout
            </button>
          ) : (

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
          )
        }
      </div>
    </nav>
  );
};
