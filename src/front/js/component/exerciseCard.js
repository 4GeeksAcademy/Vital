import React, { useContext } from "react";
import exerciseImage from "../../img/exercise.png";
import "../../styles/exercise-card.css";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

const ExerciseCard = ({ exercise, id, target, equipment, bodypart }) => {

  const { store, actions } = useContext(Context)

  const title = target.charAt(0).toUpperCase() + target.slice(1);
  const titleExcercise = exercise.charAt(0).toUpperCase() + exercise.slice(1);

  return (
    <div
      className="wrap-exercise-card  col-3 p-0 pb-2 bg-vital-gray mt-4 border border-1 rounded-3 border-vital-orange"
      // style={{ height: "220px" }}
    >
      {
        store.favorites[bodypart].includes(exercise) ? <i className="heart fa-solid fa-heart" style={{ color: "#ff5300", cursor: "pointer" }} onClick={() => actions.removeFavExercise(bodypart, exercise)}></i> :  <i className="heart fa-regular fa-heart" style={{ color: "#ff5300", cursor: "pointer" }} onClick={() => actions.addFavExercise(bodypart, exercise)}></i>
      }
      <div
        className="rounded-3 image-card-exercise d-flex justify-content-center align-items-center"
        style={{
          backgroundImage: `url(${exerciseImage})`,
        }}
      >
        <h1 className="text-vital-white text-center w-50 fw-bold excercise-title">
          <Link
            className="text-decoration-none text-vital-white"
            to={`/exercisedetail/${id}`}
          >
            {title}
          </Link>
        </h1>
      </div>
      <div className="d-flex-inline flex-column justify-content-start p-2 overflow-y-hidden">
        <span className="font-p text-vital-orange fw-bold">
        {titleExcercise}
        </span>
        <br />
        <span className="font-p text-vital-white ">
          Equipment: {equipment}
        </span>
      </div>
    </div>
  );
};

export default ExerciseCard;
