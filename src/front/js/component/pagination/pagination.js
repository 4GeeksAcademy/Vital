import React from "react";
import "./pagination.css";
import { Navigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

const Pagination = ({ exercisesPerPage, totalExercises, setPage, currentPage, searchParams, setSearchParams }) => {
  
  const arrayPages = Array.from({ length: Math.ceil(totalExercises / exercisesPerPage) }).map((_, index) => {
    return (
      index + 1
    )
  }) 

  console.log(arrayPages)


  const handleClick = (e) => {
    e.preventDefault()
    console.log(e.target.innerText)
    setPage(e.target.innerText)
    setSearchParams({ ...searchParams, page: e.target.innerText });
    //navigate(`?page=${e.target.innerText}`)
  }

  return (
    <nav data-pagination="" className="bg-vital-black p-3 m-0">
      <i className="previous fa-solid fa-angle-left"></i>
      <ul>
        {
          arrayPages &&
          arrayPages.map((page, index) => {
            return (
              <li key={index}>               
                {
                  
                  page === parseInt(currentPage) ? (
                    <a className="text-vital-orange" onClick={handleClick}><strong>{page}</strong></a>
                  ) : (
                    <a className="text-vital-white" onClick={handleClick}>{page}</a>
                  )
                }
                
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
