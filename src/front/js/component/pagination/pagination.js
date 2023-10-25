import React from "react";
import "./pagination.css";

const Pagination = ({ exercisesPerPage, totalExercises, paginate }) => {
  return (
    <nav data-pagination="" className="bg-vital-black p-3 m-0">
      <i className="previous fa-solid fa-angle-left"></i>
      <ul>
        <li className="current">
          <a href="#1">1</a>
        </li>
        <li>
          <a href="#2">2</a>
        </li>
        <li>
          <a href="#3">3</a>
        </li>
        <li>
          <a href="#4">4</a>
        </li>
        <li>
          <a href="#5">5</a>
        </li>
        <li>
          <a href="#6">6</a>
        </li>
        <li>
          <a href="#7">7</a>
        </li>
        <li>
          <a href="#8">8</a>
        </li>
        <li>
          <a href="#9">9</a>
        </li>
        <li>
          <a href="#10">…</a>
        </li>
        <li>
          <a href="#41">41</a>
        </li>
      </ul>
      <i className="next fa-solid fa-angle-right"></i>
    </nav>
  );
};

export default Pagination;
