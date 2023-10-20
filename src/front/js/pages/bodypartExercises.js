import React, { useEffect, useState } from "react";
import "../../styles/bodypart-exercises.css";
import { useFetch } from "../hooks/useFetch";
import imageBackgroundArm from "../../img/low-arm.png";
import ExerciseCard from "../component/exerciseCard";

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

  const exercises = ["exercise1", "exercise2", "exercise3", "exercise4", "exercise5", "exercise6", "exercise7", "exercise8"];

  return (
    <>
      <div
        className="container-fluid image-part-background"
        style={{ backgroundImage: `url(${imageBackgroundArm})` }}
      >
        <div className="container w-50 h-100 d-flex justify-content-center align-items-center">
          <div className="title">
            <h1 className="text-vital-orange text-center fw-bold">
              Lower arms
            </h1>
            <p className="text-vital-white text-center pb-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              accumsan odio ut mi aliquam volutpat. Nam tincidunt quam vitae
              massa suscipit placerat.
            </p>
          </div>
        </div>
      </div>
      <div className="container-fluid p-5 bg-vital-black">
        <div className="container d-flex  flex-column title-workout">
          <div className="row col-11 d-flex mx-auto justify-content-around">
            {
              exercises.map((exercise, index) => {
                return (
                  <ExerciseCard key={index} />
                );
              })
            }
            
          </div>
        </div>
      </div>
    </>
  );
};
