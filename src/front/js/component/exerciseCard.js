import React from "react";
import exerciseImage from "../../img/exercise.png";
import "../../styles/exercise-card.css";

const ExerciseCard = ({ exercises }) => {
  return (
    <div
      className="wrap-exercise-card  col-3 p-0 pb-2 bg-vital-gray mt-4 border border-1 rounded-3 border-vital-orange"
      // style={{ height: "220px" }}
    >
      <div
        className="rounded-3 image-card-exercise d-flex justify-content-center align-items-center"
        style={{
          backgroundImage: `url(${exerciseImage})`,
        }}
      >
        <h1 className="text-vital-white text-center w-50 fw-bold">
          Nombre del ejercicio
        </h1>
      </div>
      <div className="d-flex-inline flex-column justify-content-start p-2 overflow-y-hidden">
        <span className="font-p text-vital-orange ">
          Nombre de ejercicio, quizás sea largo o corto, no lo sé
        </span>
        <br />
        <span className="font-p text-vital-white ">
          Pequeña descripción de lo que trata el ejercicio
        </span>
      </div>
    </div>
  );
};

export default ExerciseCard;
