import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/bodypart-exercises.css";
import imageBackgroundArm from "../../img/low-arm.png";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ExerciseCard from "../component/exerciseCard";
import { scrollToTop } from "../function/scrollToTop";
import BackgroundContainer from "../component/backgroundContainer";
import { allExercises } from "../constants/allExcercises";
import { description, dataExcersises, useAPI } from "../constants/constants";
import Pagination from "../component/pagination/pagination";
import SortFilterBox from "../component/sortFilterBox/sortFilterBox";
import Loading from "../component/loading/loading";
import imgChestBackground from "../../img/background-containers/chest.png"

export const BodypartExercises = () => {
  const { store, actions } = useContext(Context);
  const [fetchExercises, setFetchExercises] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState(searchParams.get("sort") || "asc");  
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [exercises, setExercises] = useState(null)
  const [page, setPage] = useState(1);  
  const currentPage = searchParams.get("page") ? searchParams.get("page") : 1;
  const navigate = useNavigate();
  const { bodypart } = useParams();
  const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodypart}?limit=150`; //
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "89971d01c0msh1690c1d9906070dp1cb205jsnac087ad4de35",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };  

  useEffect(() => {
    !store.token && navigate("/login")
    scrollToTop();
    setPage(currentPage);
    if (!useAPI) {
      const dataFilter = allExercises.filter((exercise) => {
        return exercise.bodyPart === bodypart;
      });  
      setExercises(dataFilter);
      setLoading(false);
      return 
    }
    try {
      const getData = async () => {
        const response = await fetch(url, options);
        const dataJson = await response.json();
        setExercises(dataJson);
        setFetchExercises(dataJson)
        setLoading(false);
      }
      getData()
    } catch (error) {
      console.log(error);
    }
  }, []);

 

  useEffect(() => {  
    let newArray = []
    if (exercises) {
      console.log(exercises.filter((exercise) => exercise.name.toLowerCase().includes(search.toLowerCase()))) 
      newArray = exercises.filter((exercise) => exercise.name.toLowerCase().includes(search.toLowerCase()))   
      
      // setExercises(data.filter((exercise) => exercise.name.toLowerCase().includes(search.toLowerCase())));
    } 
    if (exercises && sort) {
      if (sort == "asc") {
        console.log(newArray.sort((a, b) => a.name.localeCompare(b.name)))
        setExercises(newArray.sort((a, b) => a.name.localeCompare(b.name)))
        // setExercises(data.sort((a, b) => a.name.localeCompare(b.name)));
      } else if (sort == "desc") {
        console.log(newArray.sort((a, b) => b.name.localeCompare(a.name)))
        setExercises(newArray.sort((a, b) => b.name.localeCompare(a.name)))
        // setExercises(data.sort((a, b) => b.name.localeCompare(a.name)));
      }
    }  
    search == '' && setExercises(fetchExercises)   
    setSearchParams({ sort: sort, page: page, search: search });
  }, [sort, page, search]);


  const start = (page - 1) * 8;
  const end = page * 8;    
  
  const title = bodypart.charAt(0).toUpperCase() + bodypart.slice(1);
  const params = Object.fromEntries([...searchParams]);
  
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <BackgroundContainer
            title={title}
            description={description}
            image={imgChestBackground}
          />
          <SortFilterBox setSort={setSort} setSearch={setSearch}/>
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
                            bodypart={bodypart}                         
                          />
                        )}
                      </>
                    );
                  })}
              </div>
            </div>
          </div>
          <div>
            <Pagination exercisesPerPage="8" totalExercises={exercises?.length} setPage={setPage} currentPage={currentPage} searchParams={searchParams} setSearchParams={setSearchParams}/>
          </div>
        </>
      )}
    </>
  );
};

