import React, { useEffect, useState } from "react";
import "../../styles/bodypart-exercises.css";
import { useFetch } from "../hooks/useFetch";
import imageBackgroundArm from "../../img/low-arm.png";


export const BodypartExercises = () => {
  const bodyPart = "chest";
  const url = "https://exercisedb.p.rapidapi.com/exercises";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "89971d01c0msh1690c1d9906070dp1cb205jsnac087ad4de35",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };

  // const { data, error, loading } = useFetch(url, options);
  // console.log(data);

  return (
    <>
      <div
        className="container-fluid image-background vh-50"
        style={{ backgroundImage: `url(${imageBackgroundArm})` }}
      >
        <div className="container w-50 d-flex justify-content-center align-items-center wrap-background-image">
          <div className="title">
            <h1 className="text-vital-orange text-center fw-bold">Routines</h1>
            <p className="text-vital-white text-center pb-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              accumsan odio ut mi aliquam volutpat. Nam tincidunt quam vitae
              massa suscipit placerat.
            </p>
          </div>
        </div>
      </div>
      <div className="container-fluid bg-vital-black">
        <div className="container d-flex pb-5 flex-column title-workout">
          <h1 className="text-vital-orange pt-4 text-center fw-bold">
            Lower arms
          </h1>
          <div className="row col-11 d-flex mx-auto justify-content-around">
            Exercises
          </div>
        </div>
      </div>
    </>
  );
};

