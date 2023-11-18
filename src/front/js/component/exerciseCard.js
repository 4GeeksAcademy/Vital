import React, { useContext } from "react";
import exerciseImage from "../../img/exercise.png";
import "../../styles/exercise-card.css";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


const ExerciseCard = ({ exercise, id, target, equipment, bodypart, url }) => {

  const { store, actions } = useContext(Context)

  const title = target.charAt(0).toUpperCase() + target.slice(1);
  const titleExcercise = exercise.charAt(0).toUpperCase() + exercise.slice(1);
  const newBodypart = bodypart.replace('%20', '').replace(/\s/g, '')
  // console.log(newBodypart)
  const particularExercise = Object.values(store.favorites[newBodypart])
  // console.log(particularExercise.map(item => item.id).includes(id))

  return (
    <div
      className="wrap-exercise-card d-flex p-0 bg-vital-black mt-4 rounded-3"
      style={{ width: "500px" }}
    >
      {
        particularExercise.map(item => item.id).includes(id) ? <i className="heart fa-solid fa-heart" style={{ color: "#ff5300", cursor: "pointer" }} onClick={() => actions.removeFavExercise(newBodypart, exercise, id)}></i> : <i className="heart fa-regular fa-heart" style={{ color: "#ff5300", cursor: "pointer" }} onClick={() => actions.addFavExercise(newBodypart, exercise, id)}></i>
      }
      <div className="d-flex-inline justify-content-center p-2 h-100 overflow-y-hidden" style={{ width: "200px" }}>
        <img src={url} alt="" className="h-100 img-fluid img-thumbnail" />
      </div>
      <div className="d-flex flex-column justify-content-center p-2 " style={{ width: "300px" }}>
        <div className="rounded-3  d-flex flex-column w-100 h-100 justify-content-center align-items-center">
          <div className="d-flex-inline p-0 w-100 flex-column justify-content-start p-2 overflow-y-hidden">
            <h2 className="fs-5 text-vital-orange fw-bold">
              <Link
                className="fs-5 text-vital-orange fw-bold text-decoration-none"
                to={`/exercisedetail/${id}`}>
                {titleExcercise}
              </Link>
            </h2>
            <span className="text-vital-white ">
              Equipment: {equipment}.
            </span>
          </div>
        </div>
      </div>

    </div>
  );
  //   <div
  //     className="wrap-exercise-card  col-3 p-0 pb-2 bg-vital-gray mt-4 border border-1 rounded-3 border-vital-orange"
  //     // style={{ height: "220px" }}
  //   >
  //     {
  //       particularExercise.map(item => item.id).includes(id) ? <i className="heart fa-solid fa-heart" style={{ color: "#ff5300", cursor: "pointer" }} onClick={() => actions.removeFavExercise(newBodypart, exercise, id)}></i> :  <i className="heart fa-regular fa-heart" style={{ color: "#ff5300", cursor: "pointer" }} onClick={() => actions.addFavExercise(newBodypart, exercise, id)}></i>
  //     }
  //     <div
  //       className="rounded-3 image-card-exercise d-flex justify-content-center align-items-center"
  //       style={{
  //         backgroundImage: `url(${exerciseImage})`,
  //       }}
  //     >
  //       <h1 className="text-vital-white text-center w-50 fw-bold excercise-title">
  //         <Link
  //           className="text-decoration-none text-vital-white"
  //           to={`/exercisedetail/${id}`}
  //         >
  //           {title}
  //         </Link>
  //       </h1>
  //     </div>
  //     <div className="d-flex-inline flex-column justify-content-start p-2 overflow-y-hidden">
  //       <span className="font-p text-vital-orange fw-bold">
  //       {titleExcercise}
  //       </span>
  //       <br />
  //       <span className="font-p text-vital-white ">
  //         Equipment: {equipment}
  //       </span>
  //     </div>
  //   </div>
  // );
};

export default ExerciseCard;
