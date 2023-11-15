import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import Image from "../../img/image1.png";
import Carousel from "../component/carousel";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"

export const Home = ({ isVisible }) => {
  const { store, actions } = useContext(Context);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/exercises");
  };
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        ease: "linear",
        duration: 1.5,
      }}

    >
      <div
        className="container-fluid bg-vital-black frame-home"
      // style={{ height: "700px" }}
      >
        <section className="container d-flex justify-content-between align-items-center bg-vital-black">
          <div className="col-5 col-sm-12 col-md-12 col-lg-5 col-xl-5 col-xxl-5">
            <motion.h1 className="text-vital-orange fs-1 fw-bold fs-sm-2 p-sm-3 p-md-3 pb-2"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            >
              Build your Body Transform your life
            </motion.h1>
            <motion.p className="text-vital-white fs-4 fs-md-5 fs-sd-5 p-sm-3 p-md-3 pt-2"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Unlock your potential with a fitness membership that gives you
              access to a world of training possibilities.
            </motion.p>
            <div className="d-flex justify-content-center pb-5">
              <button
                className="btn btn-vital-orange text-vital-white rounded-pill mx-3"
                type="submit"
              >
                Get Started
              </button>
              <button
                className="btn btn-outline-vital-orange text-vital-white rounded-pill"
                type="submit"
              >
                Get more info
              </button>
            </div>
          </div>
          <div className="col-4 image-wrap  w-50 h-75">
            <img
              src={Image}
              className="img-fluid object-fit-cover w-75 h-100 d-none d-md-block d-sm-block bg-vital-black"
              alt="..."
            />
          </div>
        </section>
      </div>
      <div
        className="container-fluid text-center bg-vital-gray mt-0"
      //style={{ height: "600px" }}
      >
        <motion.h1 className="text-vital-white p-5 fw-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          ease: "linear",
          duration: 2.5,
        }}
        >All that you can get in one place!</motion.h1>
        <div className="wrapp-cards d-flex container pb-5 justify-content-around flex-wrap">
          <motion.div className="d-flex flex-column mt-5 card-style justify-content-around rounded-5 bg-vital-black"
          whileHover={{ scale: 1.2 }}
          onHoverStart={e => { }}
          onHoverEnd={e => { }}
          whileTap={{ scale: 0.9 }}
          >
            <i className="icon fa-regular fa-calendar mt-4" />
            <h4 className="fs-6 text-vital-white mt-3">Workout</h4>
            <p className="text-vital-white p-3">
              looks for routines, and start you journey know
            </p>
            <div>
              <button
                className="btn btn-vital-orange text-vital-white rounded-pill mb-5"
                type="submit"
                onClick={handleClick}
              >
                Get Exercises
              </button>
            </div>
          </motion.div>
          <motion.div className="d-flex flex-column mt-5 card-style justify-content-around rounded-5 bg-vital-black"
          whileHover={{ scale: 1.2 }}
          onHoverStart={e => { }}
          onHoverEnd={e => { }}
          whileTap={{ scale: 0.9 }}
          >
            <i className="icon fa-regular fa-calendar mt-4" />
            <h4 className="fs-6 text-vital-white mt-3">Meal Plans</h4>
            <p className="text-vital-white p-3 text-center">
              Find recipes base in your goals
            </p>
            <div>
              <button
                className="btn btn-vital-orange text-vital-white rounded-pill mb-5"
                type="submit"
              >
                Get recipes
              </button>
            </div>
          </motion.div>
          <motion.div className="d-flex flex-column mt-5 card-style justify-content-around rounded-5 bg-vital-black"
          whileHover={{ scale: 1.2 }}
          onHoverStart={e => { }}
          onHoverEnd={e => { }}
          whileTap={{ scale: 0.9 }}
          >
            <i className="icon fa-regular fa-calendar mt-4" />
            <h4 className="fs-6 text-vital-white mt-3">Find fitness centers</h4>
            <p className="text-vital-white p-3">
              See Gyms partners around you
            </p>
            <div>
              <button
                className="btn btn-vital-orange text-vital-white rounded-pill mb-5"
                type="submit"
              >
                Wacth now!
              </button>
            </div>
          </motion.div>
          <motion.div className="d-flex flex-column mt-5 card-style justify-content-around rounded-5 bg-vital-black"
          whileHover={{ scale: 1.2 }}
          onHoverStart={e => { }}
          onHoverEnd={e => { }}
          whileTap={{ scale: 0.9 }}
          >
            <i className="icon fa-regular fa-calendar mt-4" />
            <h4 className="fs-6 text-vital-white mt-3">Fitness Store</h4>
            <p className="text-vital-white p-3">
              Buy fitness product and aply for awsome discounts
            </p>
            <div>
              <button
                className="btn btn-vital-orange text-vital-white rounded-pill mb-5"
                type="submit" onClick={() => navigate("/store")}
              >
                buy now!
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      <div
        className="container-fluid text-center bg-vital-black mt-0"
      // style={{ height: "600px" }}
      >
        <h1 className="text-vital-white p-5 fw-bold">
          Estos usuarios hicieron su vida mas facil con Vital
        </h1>
        <Carousel />
      </div>
    </motion.main>
  );
};
