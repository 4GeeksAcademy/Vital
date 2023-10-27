import React from "react";
import "./pagination.css";

const Pagination = ({ exercisesPerPage, totalExercises, paginate }) => {
  return (
    <nav data-pagination="" className="bg-vital-black p-3 m-0">
      <i className="previous fa-solid fa-angle-left"></i>
      <ul>
        <li >
          <a className="text-vital-white" href="#1">1</a>
        </li>
        <li>
          <a className="text-vital-white" href="#2">2</a>
        </li>
        <li>
          <a className="text-vital-white" href="#3">3</a>
        </li>
        <li>
          <a className="text-vital-white" href="#4">4</a>
        </li>
        <li>
          <a className="text-vital-white" href="#5">5</a>
        </li>
        <li>
          <a className="text-vital-white" href="#6">6</a>
        </li>
        <li>
          <a className="text-vital-white" href="#7">7</a>
        </li>
        <li>
          <a className="text-vital-white" href="#8">8</a>
        </li>
        <li>
          <a className="text-vital-white" href="#9">9</a>
        </li>
        <li>
          <a className="text-vital-white" href="#10">…</a>
        </li>
        <li>
          <a className="text-vital-white" href="#41">41</a>
        </li>
      </ul>
      <i className="next fa-solid fa-angle-right"></i>
    </nav>
  );
};

export default Pagination;
