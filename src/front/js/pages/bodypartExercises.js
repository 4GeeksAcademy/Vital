import React, { useEffect, useState } from "react";
import "../../styles/bodypart-exercises.css";
import imageBackgroundArm from "../../img/low-arm.png";
import { useParams } from "react-router-dom";
import ExerciseCard from "../component/exerciseCard";
import { scrollToTop } from "../function/scrollToTop";
import BackgroundContainer from "../component/backgroundContainer";
import { useFetch } from "../hooks/useFetch";

import { description, data } from "../constants/constants";

export const BodypartExercises = () => {
  const { bodypart } = useParams();
  const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodypart}?limit=8`;

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

  //const { data, error, loading } = useFetch(url, options);
  //console.log(data);
  const title = bodypart.charAt(0).toUpperCase() + bodypart.slice(1);

  return (
    <>
      <BackgroundContainer
        title={title}
        description={description}
        image={imageBackgroundArm}
      />
      <div className="container-fluid p-5 bg-vital-black">
        <div className="container d-flex  flex-column title-workout">
          <div className="row col-11 d-flex mx-auto justify-content-around">
            {data &&
              data.map((exercise, index) => {
                return (
                  <>
                    {data && (
                      <ExerciseCard
                        key={index}
                        exercise={exercise.name}
                        id={exercise.id}
                        target={exercise.target}
                        equipment={exercise.equipment}
                      />
                    )}
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};
