import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import Image from "../../img/image1.png";
import Carousel from "../component/carousel";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <div
        className="container-fluid bg-vital-black"
        style={{ height: "60vh" }}
      >
        <section className="container d-flex justify-content-between align-items-center w-100 h-100 bg-vital-black">
          <div className="col-5">
            <h1 className="text-vital-orange fw-bold">
              Todo relacionado al ejercicio en un solo lugar
            </h1>
            <p className="text-vital-white fs-5">
              Unlock your potential with a fitness membership that gives you
              access to a world of training possibilities.
            </p>
            <div className="d-flex justify-content-start">
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
          <div
            className="d-flex justify-content-center col-5"
            style={{ height: "80%" }}
          >
            <img
              src={Image}
              className="img-fluid object-fit-contain w-100 h-100 bg-vital-black"
              alt="..."
            />
          </div>
        </section>
      </div>
      <div
        className="text-center bg-vital-gray mt-0"
        style={{ height: "600px" }}
      >
        <h1 className="text-vital-white p-5 fw-bold">¿Qué ofrece Vital?</h1>
        <div className="wrapp-cards d-flex container  justify-content-around flex-wrap">
          <div className="d-flex flex-column card-style justify-content-around rounded-5 bg-vital-black">
            <i className="fa-regular fa-calendar mt-4" />
            <h4 className="fs-6 text-vital-white mt-3">Workout</h4>
            <p className="text-vital-white p-3">
              Egestas elit dui scelerisque ut eu purus aliquam vitae habitasse.
            </p>
            <div>
              <button
                className="btn btn-vital-orange text-vital-white rounded-pill mb-5"
                type="submit"
              >
                Primary Action
              </button>
            </div>
          </div>
          <div className="d-flex flex-column card-style justify-content-around rounded-5 bg-vital-black">
            <i className="fa-regular fa-calendar mt-4" />
            <h4 className="fs-6 text-vital-white mt-3">Meal Plans</h4>
            <p className="text-vital-white p-3 text-center">
              Egestas elit dui scelerisque ut eu purus aliquam vitae habitasse.
            </p>
            <div>
              <button
                className="btn btn-vital-orange text-vital-white rounded-pill mb-5"
                type="submit"
              >
                Primary Action
              </button>
            </div>
          </div>
          <div className="d-flex flex-column card-style justify-content-around rounded-5 bg-vital-black">
            <i className="fa-regular fa-calendar mt-4" />
            <h4 className="fs-6 text-vital-white mt-3">Find fitness centers</h4>
            <p className="text-vital-white p-3">
              Egestas elit dui scelerisque ut eu purus aliquam vitae habitasse.
            </p>
            <div>
              <button
                className="btn btn-vital-orange text-vital-white rounded-pill mb-5"
                type="submit"
              >
                Primary Action
              </button>
            </div>
          </div>
          <div className="d-flex flex-column card-style justify-content-around rounded-5 bg-vital-black">
            <i className="fa-regular fa-calendar mt-4" />
            <h4 className="fs-6 text-vital-white mt-3">Fitness Store</h4>
            <p className="text-vital-white p-3">
              Egestas elit dui scelerisque ut eu purus aliquam vitae habitasse.
            </p>
            <div>
              <button
                className="btn btn-vital-orange text-vital-white rounded-pill mb-5"
                type="submit"
              >
                Primary Action
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="text-center bg-vital-black mt-0"
        style={{ height: "600px" }}
      >
        <h1 className="text-vital-white p-5 fw-bold">
          Estos usuarios hicieron su vida mas facil con Vital
        </h1>
        <Carousel />
      </div>
    </>
  );
};
