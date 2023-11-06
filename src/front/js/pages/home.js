import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import Image from "../../img/image1.png";
import Carousel from "../component/carousel";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/exercises");
  };
  return (
    <>
      <div
        className="container-fluid bg-vital-black frame-home"
        // style={{ height: "700px" }}
      >
        <section className="container d-flex justify-content-between align-items-center bg-vital-black">
          <div className="col-5 col-sm-12 col-md-12 col-lg-5 col-xl-5 col-xxl-5">
            <h1 className="text-vital-orange fw-bold fs-sm-2 p-sm-5 p-md-5">
              Build your Body Transform your life
            </h1>
            <p className="text-vital-white fs-md-5 fs-sd-5 p-sm-5 p-md-5">
              Unlock your potential with a fitness membership that gives you
              access to a world of training possibilities.
            </p>
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
        <h1 className="text-vital-white p-5 fw-bold">All that you can get in one place!</h1>
        <div className="wrapp-cards d-flex container pb-5 justify-content-around flex-wrap">
          <div className="d-flex flex-column mt-5 card-style justify-content-around rounded-5 bg-vital-black">
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
          </div>
          <div className="d-flex flex-column mt-5 card-style justify-content-around rounded-5 bg-vital-black">
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
          </div>
          <div className="d-flex flex-column mt-5 card-style justify-content-around rounded-5 bg-vital-black">
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
          </div>
          <div className="d-flex flex-column mt-5 card-style justify-content-around rounded-5 bg-vital-black">
            <i className="icon fa-regular fa-calendar mt-4" />
            <h4 className="fs-6 text-vital-white mt-3">Fitness Store</h4>
            <p className="text-vital-white p-3">
              Buy fitness product and aply for awsome discounts
            </p>
            <div>
              <button
                className="btn btn-vital-orange text-vital-white rounded-pill mb-5"
                type="submit" onClick={()=> navigate("/store")}
              >
                buy now!
              </button>
            </div>
          </div>
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
    </>
  );
};
