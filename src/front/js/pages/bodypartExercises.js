import React, { useEffect, useState } from "react";
import "../../styles/bodypart-exercises.css";
import imageBackgroundArm from "../../img/low-arm.png";
import { useParams } from "react-router-dom";
import ExerciseCard from "../component/exerciseCard";
import { scrollToTop } from "../function/scrollToTop";
import BackgroundContainer from "../component/backgroundContainer";
import { useAPI } from "../constants/constants";
import { useFetch } from "../hooks/useFetch";
import { allExercises } from "../constants/allExcercises";
import { description, dataExcersises } from "../constants/constants";
import Pagination from "../component/pagination/pagination";
import SortFilterBox from "../component/sortFilterBox/sortFilterBox";
import Loading from "../component/loading/loading";

export const BodypartExercises = () => {
  const [page, setPage] = useState(1);
  const { bodypart } = useParams();
  const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodypart}?limit=150`; //

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
  const start = (page - 1) * 8;
  const end = page * 8;
  //uncoment the line 35-36 to fetch API and comment the line 39-44
  // const { data, error, loading } = useFetch(url, options);
  // const dataFilter = null

  //uncoment line 39-44 to see the data without fetch API and comment line 35-36
  const dataFilter = allExercises.filter((exercise) => {
    return exercise.bodyPart === bodypart;
  });
  console.log(dataFilter);
  const data = dataFilter;  
  const loading = false;

  const title = bodypart.charAt(0).toUpperCase() + bodypart.slice(1);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <BackgroundContainer
            title={title}
            description={description}
            image={imageBackgroundArm}
          />
          <SortFilterBox />
          <div className="container-fluid p-5 bg-vital-black">
            <div className="container d-flex  flex-column title-workout">
              <div className="row col-11 d-flex mx-auto justify-content-around">
                {data &&
                  data.slice(start, end).map((exercise, index) => {
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
          <div>
            <Pagination exercisesPerPage="8" totalExercises={dataFilter ? dataFilter.length : data.length} setPage={setPage}/>
          </div>
        </>
      )}
    </>
  );
};

//exercisesPerPage, totalExercises
