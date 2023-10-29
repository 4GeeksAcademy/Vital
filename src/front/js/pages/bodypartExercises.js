import React, { useEffect, useState } from "react";
import "../../styles/bodypart-exercises.css";
import imageBackgroundArm from "../../img/low-arm.png";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ExerciseCard from "../component/exerciseCard";
import { scrollToTop } from "../function/scrollToTop";
import BackgroundContainer from "../component/backgroundContainer";
import { useFetch } from "../hooks/useFetch";
import { allExercises } from "../constants/allExcercises";
import { description, dataExcersises } from "../constants/constants";
import Pagination from "../component/pagination/pagination";
import SortFilterBox from "../component/sortFilterBox/sortFilterBox";
import Loading from "../component/loading/loading";


export const BodypartExercises = () => {
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState(searchParams.get("sort") || "asc");
  const [filter, setFilter] = useState(searchParams.get("filter") || "");
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [exercises, setExercises] = useState(null)
  const [page, setPage] = useState(1);
  // const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page") ? searchParams.get("page") : 1;
  const navigate = useNavigate();
  const { bodypart } = useParams();
  const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodypart}?limit=150`; //

  useEffect(() => {
    scrollToTop();
    setPage(currentPage);
    
  }, []);

  useEffect(() => {
    if (data) {
      setExercises(data);
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {        
    setSearchParams({ sort: sort, page: page, filter: filter, search: search });
  }, [sort, page, filter, search]);

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
  //console.log(dataFilter);
  const data = dataFilter;    
  
  const title = bodypart.charAt(0).toUpperCase() + bodypart.slice(1);
  const params = Object.fromEntries([...searchParams]);
  console.log('Mounted:', params);

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
          <SortFilterBox setSort={setSort} setFilter={setFilter} setSearch={setSearch}/>
          <div className="container-fluid p-5 bg-vital-black">
            <div className="container d-flex  flex-column title-workout">
              <div className="row col-11 d-flex mx-auto justify-content-around">
                {exercises &&
                  exercises.slice(start, end).map((exercise, index) => {
                    return (
                      <>
                        {exercises && (
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
            <Pagination exercisesPerPage="8" totalExercises={dataFilter ? dataFilter.length : data.length} setPage={setPage} currentPage={currentPage} searchParams={searchParams} setSearchParams={setSearchParams}/>
          </div>
        </>
      )}
    </>
  );
};

//exercisesPerPage, totalExercises
