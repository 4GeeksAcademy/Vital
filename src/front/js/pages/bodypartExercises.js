import React, { useEffect, useState } from "react";
import "../../styles/bodypart-exercises.css";
import imageBackgroundArm from "../../img/low-arm.png";
import { useFetch } from "../hooks/useFetch";

import ExerciseCard from "../component/exerciseCard";
import { scrollToTop } from "../function/scrollToTop";
import BackgroundContainer from "../component/backgroundContainer";

export const BodypartExercises = () => {
  const bodyPart = "chest";
  const url = "https://exercisedb.p.rapidapi.com/exercises";

  useEffect(() => {
    scrollToTop();
  }, []);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "89971d01c0msh1690c1d9906070dp1cb205jsnac087ad4de35",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };

  // const { data, error, loading } = useFetch(url, options);
  // console.log(data);

  const title = "Lower arms";
  const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus accumsan odio ut mi aliquam volutpat. Nam tincidunt quam vitae massa suscipit placerat.";

  const exercises = [
    {
      name: "exercise 1",
      bodyPart: "chest",
      id: 1,
    },
    {
      name: "exercise 2",
      bodyPart: "chest",
      id: 2,
    },
    {
      name: "exercise 3",
      bodyPart: "chest",
      id: 3,
    },
    {
      name: "exercise 4",
      bodyPart: "chest",
      id: 4,
    },
    {
      name: "exercise 5",
      bodyPart: "chest",
      id: 5,
    },
    {
      name: "exercise 6",
      bodyPart: "chest",
      id: 6,
    },
    {
      name: "exercise 7",
      bodyPart: "chest",
      id: 7,
    },
    {
      name: "exercise 8",
      bodyPart: "chest",
      id: 8,
    },
  ];

  return (
    <>
      <BackgroundContainer title={title} description={description} image={imageBackgroundArm}/>
      <div className="container-fluid p-5 bg-vital-black">
        <div className="container d-flex  flex-column title-workout">
          <div className="row col-11 d-flex mx-auto justify-content-around">
            {exercises.map((exercise, index) => {
              return (
                <ExerciseCard
                  key={index}
                  exercises={exercise.name}
                  id={exercise.id}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
