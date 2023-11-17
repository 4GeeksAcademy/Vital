import React from "react";
import Postcard from "./postcard";

const Carousel = () => {
  return (
    <div id="carouselExample" className="carousel slide">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="d-flex justify-content-evenly flex-wrap pb-5">
            <Postcard />
            <Postcard />
          </div>
        </div>
        <div className="carousel-item">
          <div className="d-flex justify-content-evenly flex-wrap pb-5">
            <Postcard />
            <Postcard />
          </div>
        </div>
        <div className="carousel-item">
          <div className="d-flex justify-content-evenly flex-wrap pb-5">
            <Postcard />
            <Postcard />
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <i
          className="fa-solid fa-angle-left fs-2"
          style={{ color: "#ff5300" }}
        ></i>
        {/* <span className="carousel-control-prev-icon" aria-hidden="true" /> */}
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <i
          className="fa-solid fa-angle-right fs-2"
          style={{ color: "#ff5300" }}
        ></i>
        {/* <span className="carousel-control-next-icon" aria-hidden="true" /> */}
        <span className="visually-hidden">Next</span>
      </button>
    </div >
  );
};

export default Carousel;
