import React, { useContext } from "react";
import Logo from "../../img/logo-vital.png";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext"
import { motion } from "framer-motion"

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
            <motion.li className="nav-item"
              whileHover={{ scale: 1.2 }}
              onHoverStart={e => { }}
              onHoverEnd={e => { }}
              whileTap={{ scale: 0.9 }}
            >
              <a
                className="nav-link text-vital-white active"
                aria-current="page"
                onClick={() => navigate("/")}
              >
                Home
              </a>
            </motion.li>
            <motion.li className="nav-item"
              whileHover={{ scale: 1.2 }}
              onHoverStart={e => { }}
              onHoverEnd={e => { }}
              whileTap={{ scale: 0.9 }}
            >
              <a
                className="nav-link text-vital-white active"
                aria-current="page"
              >
                About us
              </a>
            </motion.li>
            <motion.li className="nav-item"
              whileHover={{ scale: 1.2 }}
              onHoverStart={e => { }}
              onHoverEnd={e => { }}
              whileTap={{ scale: 0.9 }}
            >
              <a className="nav-link text-vital-white" onClick={() => navigate("/exercises")}>
                Workout
              </a>
            </motion.li>
            <motion.li className="nav-item"
              whileHover={{ scale: 1.2 }}
              onHoverStart={e => { }}
              onHoverEnd={e => { }}
              whileTap={{ scale: 0.9 }}
            >
              <a
                className="nav-link text-vital-white active"
                aria-current="page"
                href="#"
                onClick={() => navigate("/mealPlans")}
              >
                Meal plans
              </a>
            </motion.li>
            <motion.li className="nav-item"
              whileHover={{ scale: 1.2 }}
              onHoverStart={e => { }}
              onHoverEnd={e => { }}
              whileTap={{ scale: 0.9 }}
            >
              <a
                className="nav-link text-vital-white active"
                aria-current="page"
                onClick={() => navigate("/gyms-map")}
              >
                Gyms near me
              </a>
            </motion.li>
            <motion.li className="nav-item"
              whileHover={{ scale: 1.2 }}
              onHoverStart={e => { }}
              onHoverEnd={e => { }}
              whileTap={{ scale: 0.9 }}
            >
              <a
                className="nav-link text-vital-white active"
                aria-current="page"
                onClick={() => navigate("/store")}
              >
                Store
              </a>
            </motion.li>
          </ul>
        </div>
        <div className="d-flex flex-row">
          <motion.i className="fa-solid fa-cart-shopping text-vital-orange fs-5 px-1"
            onClick={() => navigate("/shopping-cart")}
            style={{ cursor: "pointer" }}
            whileHover={{ scale: 1.2 }}
            onHoverStart={e => { }}
            onHoverEnd={e => { }}
            whileTap={{ scale: 0.9 }}
          ></motion.i>
          <motion.i className="fa-solid fa-heart text-vital-orange fs-5 px-1"
            onClick={() => navigate("/favorites")}
            style={{ cursor: "pointer" }}
            whileHover={{ scale: 1.2 }}
            onHoverStart={e => { }}
            onHoverEnd={e => { }}
            whileTap={{ scale: 0.9 }}
          ></motion.i>
          <motion.i className="fa-solid fa-user text-vital-orange fs-5 px-1"
            onClick={() => navigate("/my-profile")}
            style={{ cursor: "pointer" }}
            whileHover={{ scale: 1.2 }}
            onHoverStart={e => { }}
            onHoverEnd={e => { }}
            whileTap={{ scale: 0.9 }}
          ></motion.i>
        </div>
        {/* {store.token ? console.log("true", store.token) : console.log("false", store.token)} */}
        {
          store.token ? (
            <motion.button
              className="btn btn-vital-orange text-vital-white rounded-pill mx-3"
              type="submit"
              whileHover={{ scale: 1.2 }}
              onHoverStart={e => { }}
              onHoverEnd={e => { }}
              onClick={() => actions.logout()}
              whileTap={{ scale: 0.9 }}
            >
              Logout
            </motion.button>
          ) : (

            <div>
              <Link to="/login">
                <motion.button
                  className="btn btn-outline-vital-orange text-vital-white rounded-pill"
                  type="submit"
                  whileHover={{ scale: 1.2 }}
                  onHoverStart={e => { }}
                  onHoverEnd={e => { }}
                  whileTap={{ scale: 0.9 }}
                >
                  Log in
                </motion.button>
              </Link>
              <Link to="/register">
                <motion.button
                  className="btn btn-vital-orange text-vital-white rounded-pill mx-3"
                  type="submit"
                  whileHover={{ scale: 1.2 }}
                  onHoverStart={e => { }}
                  onHoverEnd={e => { }}
                  whileTap={{ scale: 0.9 }}
                >
                  Sign up free
                </motion.button>
              </Link>
            </div>
          )
        }
      </div>
    </nav>
  );
};
