import React from "react";
import "./pagination.css";

const Pagination = ({ exercisesPerPage, totalExercises }) => {
  console.log(Array.from({ length: Math.ceil(totalExercises / exercisesPerPage) }).map((_, index) => {
    return (
      index + 1
    )
  }))
  return (
    <nav data-pagination="" className="bg-vital-black p-3 m-0">
      <i className="previous fa-solid fa-angle-left"></i>
      <ul>
        {
          Array.from({ length: Math.ceil(totalExercises / exercisesPerPage) }).map((_, index) => {
            return (
              <li key={index}>
                <a className="text-vital-white" href="#1">{index + 1}</a>
              </li>
            )
          })
        }        
      </ul>
      <i className="next fa-solid fa-angle-right"></i>
    </nav>
  );
};

export default Pagination;
