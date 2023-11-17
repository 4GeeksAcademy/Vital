import React, { useEffect, useState, useContext} from "react";
import { Context } from "../store/appContext";
import "../../styles/exercises.css";
import { useFetch } from "../hooks/useFetch";
import imageBackground from "../../img/image-background.png";
import CardWorkout from "../component/cardWorkout";
import { scrollToTop } from "../function/scrollToTop";
import { allExercises } from "../constants/allExcercises";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"
import backImg from "../../img/card-workout/card-workout-back.jpg"
import cardioImg from "../../img/card-workout/card-workout-cardio.jpg"
import chestImg from "../../img/card-workout/card-workout-chest.jpg"
import neckImg from "../../img/card-workout/card-workout-neck.jpg"
import shouldersImg from "../../img/card-workout/card-workout-shoulders.jpg"
import upperArmsImg from "../../img/card-workout/card-workout-upper-arms.jpg"
import lowerArmsImg from "../../img/card-workout/card-workout-lower-arms.jpg"
import upperLegsImg from "../../img/card-workout/card-workout-upper-legs.jpg"
import lowerLegsImg from "../../img/card-workout/card-workout-lower-legs.jpg"
import waistImg from "../../img/card-workout/card-workout-waist.jpg"

export const Exercises = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const bodyPart = "chest";
  const url = "https://exercisedb.p.rapidapi.com/exercises";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "89971d01c0msh1690c1d9906070dp1cb205jsnac087ad4de35",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };

  useEffect(() => {
    !store.token && navigate("/login")
    scrollToTop()
    console.log(allExercises.length);
  }, []);

  // const { data, error, loading } = useFetch(url, options);
  // console.log(data);
  const categories = {
    back: {
      title: "Back",
      image: backImg
    },
    cardio: {
      title: "Cardio",
      image: cardioImg
    },
    chest: {
      title: "Chest",
      image: chestImg
    },
    neck: {
      title: "Neck",
      image: neckImg
    },
    shoulders: {
      title: "Shoulders",
      image: shouldersImg
    },
    upperArms: {
      title: "Upper arms",
      image: upperArmsImg}
      ,
    lowerArms: {
      title: "Lower arms",
      image: lowerArmsImg
    },
    upperLegs: {
      title: "Upper legs",
      image: upperLegsImg
    },
    lowerLegs: {
      title: "Lower legs",
      image: lowerLegsImg
    },
    waist: {
      title: "Waist",
      image: waistImg
    }
  };

  return (
    <>
      <div
        className="container-fluid image-background vh-75"
        style={{ backgroundImage: `url(${imageBackground})` }}
      >
        <div className="container w-75 d-flex justify-content-center align-items-center wrap-background-image">
          <div className="title">
            <motion.h1 className="text-vital-orange text-center fw-bold"
            initial={{ x: -100, }}
            animate={{ x: 0, }}
            transition={{ duration: 1 }}
            >Routines</motion.h1>
            <motion.p className="text-vital-white text-center pb-5"
            initial={{ x: 100, }}
            animate={{ x: 0, }}
            transition={{ duration: 1 }}
            >
              Welcome to Routines, your gateway to a healthier, more vibrant lifestyle. We are dedicated to revolutionizing the way you approach fitness by offering a comprehensive array of workout routines, designed to cater to all levels of fitness enthusiasts.
            </motion.p>
          </div>
        </div>
      </div>
      <div className="container-fluid bg-vital-black">
        <div className="container d-flex pb-5 flex-column title-workout">
          <h1 className="text-vital-orange pt-4 text-center fw-bold">
            Workout Categories
          </h1>
          <div className="row col-11 d-flex mx-auto justify-content-around">
            {Object.values(categories).map((category, index) => {
              // console.log(Object.values(categories)[index].title)
              return <CardWorkout title={category.title} image= {category.image} key={index} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

{

}
