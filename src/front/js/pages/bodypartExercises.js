import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/bodypart-exercises.css";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ExerciseCard from "../component/exerciseCard";
import { scrollToTop } from "../function/scrollToTop";
import BackgroundContainer from "../component/backgroundContainer";
import { allExercises } from "../constants/allExcercises";
import { description, dataExcersises, useAPI } from "../constants/constants";
import Pagination from "../component/pagination/pagination";
import SortFilterBox from "../component/sortFilterBox/sortFilterBox";
import Loading from "../component/loading/loading";
import backImg from "../../img/background-containers/back.png"
import cardioImg from "../../img/background-containers/cardio.png"
import chestImg from "../../img/background-containers/chest.png"
import lowerArmsImg from "../../img/background-containers/lower-arms.png"
import lowerLegsImg from "../../img/background-containers/lower-legs.png"
import neckImg from "../../img/background-containers/neck.png"
import shouldersImg from "../../img/background-containers/shoulders.png"
import upperLegsImg from "../../img/background-containers/upper-legs.png"
import upperArmsImg from "../../img/background-containers/upper-arms.png"
import waistImg from "../../img/background-containers/waist.png"
import { motion } from "framer-motion"
// import bodyPartsImgs from "../constants/constants"

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

const bodyPartsImgs = {
    back: {
      image: backImg,
      description: "Find the best exercises to strengthen your back muscles and improve your posture"},
    cardio: {
      image: cardioImg,
      description: " Boost your heart health and burn calories with these cardio exercises. You can do them at gym, outdoors or home" },
    chest: {
      image: chestImg,
      description: "Build a powerful chest with these exercises that target your pectoral muscles. You can use dumbbells, resistance bands, or your own body weight"},
    neck: {
      image: neckImg,
      description: "Relieve neck pain and stiffness with these gentle exercises. They will help you stretch and mobilize your neck muscles"},
    shoulders: {
      image: shouldersImg,
      description: "Enhance your shoulder mobility and stability with these exercises that challenge your deltoids and rotator cuff. You can use a broomstick, a pillow, or a bottle." },
    upperarms: { image: upperArmsImg,
      description: "Tone and sculpt your upper arms with these exercises that work your biceps and triceps. You can choose from different levels of difficulty"},
    lowerarms: { 
      image: lowerArmsImg,
      description: "Strengthen your lower arms and wrists with these exercises that improve your grip and flexibility. You can use a tennis ball, a towel, or a rubber band"},
    upperlegs: {
      image: upperLegsImg,
      description: "Shape and strengthen your upper legs with these exercises that work your quads, hamstrings, and glutes. You can use a chair, a wall, or a step"},
    lowerlegs: {
      image: lowerLegsImg,
      description: "Train your lower legs and prevent injuries with these exercises that target your calves and ankles. You can do them with or without equipment"},
    waist: {
      image: waistImg,
      description: "Slim and tighten your waist with these exercises that activate your core and oblique muscles. You can do them on the floor, on a mat, or on a ball"}
}

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
      const getData = async (bodypart) => {
        console.log({bodypart: bodypart})
        const response = await fetch(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodypart}?limit=150`, options);
        const dataJson = await response.json();
        setExercises(dataJson);
        setFetchExercises(dataJson)
        setLoading(false);
      }
      const newBodypart = bodypart.replace(/\s/g, '%20')
      getData(newBodypart)

    } catch (error) {
      console.log(error);
    }
  }, []);

 
  useEffect(() => {  
    let newArray = []
    if (exercises) {
      console.log(fetchExercises.filter((exercise) => exercise.name.toLowerCase().includes(search.toLowerCase()))) 
      newArray = fetchExercises.filter((exercise) => exercise.name.toLowerCase().includes(search.toLowerCase()))   
      
      // setExercises(data.filter((exercise) => exercise.name.toLowerCase().includes(search.toLowerCase())));
    } 
    //search == '' && setExercises(fetchExercises)
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
            description={bodyPartsImgs[bodypart.replace(/\s/g, '')].description}
            image={bodyPartsImgs[bodypart.replace(/\s/g, '')].image}
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

