import React from "react";
import backWorkout from "../../img/back-workout.jpg";
import "../../styles/card-workout.css";
import { Link } from "react-router-dom";

const CardWorkout = ({ title }) => {
  return (
    <div
      className="rounded-3 image-card d-flex justify-content-center mt-5 align-items-center"
      style={{
        backgroundImage: `url(${backWorkout})`,
      }}
    >
      <h1 className="text-vital-white text-center fs-3  fw-bold">
        <Link
          to={`/bodypart/${title}`}
          className="text-vital-white fw-bold text-decoration-none"
        >
          {title}
        </Link>
      </h1>
    </div>
  );
};

export default CardWorkout;
