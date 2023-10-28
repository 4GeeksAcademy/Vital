import React from "react";
import "./pagination.css";

const Pagination = ({ exercisesPerPage, totalExercises, setPage }) => {
  // console.log(Array.from({ length: Math.ceil(totalExercises / exercisesPerPage) }).map((_, index) => {
  //   return (
  //     index + 1
  //   )
  // }))

  const handleClick = (e) => {
    e.preventDefault()
    console.log(e.target.innerText)
    setPage(e.target.innerText)
  }

  return (
    <nav data-pagination="" className="bg-vital-black p-3 m-0">
      <i className="previous fa-solid fa-angle-left"></i>
      <ul>
        {
          Array.from({ length: Math.ceil(totalExercises / exercisesPerPage) }).map((_, index) => {
            return (
              <li key={index}>
                <a className="text-vital-white" onClick={handleClick}>{index + 1}</a>
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
