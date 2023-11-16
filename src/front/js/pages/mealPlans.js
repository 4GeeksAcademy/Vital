import React, { useContext, useEffect, useState, useRef } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import BackgroundContainer from "../component/backgroundContainer";
import Imagen from "../../img/background-nutrition.png"
import highFiberImg from "../../img/background-type-of-meal/high-fiber.png"
import highProteinImg from "../../img/background-type-of-meal/high-protein.jpg"
import lowcarbImg from "../../img/background-type-of-meal/low-carb.jpg"
import lowFatImg from "../../img/background-type-of-meal/low-fat.jpg"
import "../../styles/meals.css"
import { motion } from "framer-motion"

const image = {
   cardFiber:{
    backgroundImage:`url(${highFiberImg})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    borderRadius:"30px",
    minHeight: "200px",
    minWidth: "300px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  cardProtein:{
    backgroundImage:`url(${highProteinImg})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    borderRadius:"30px",
    minHeight: "200px",
    minWidth: "300px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  cardCarb:{
    backgroundImage:`url(${lowcarbImg})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    borderRadius:"30px",
    minHeight: "200px",
    minWidth: "300px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  cardFat:{
    backgroundImage:`url(${lowFatImg})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    borderRadius:"30px",
    minHeight: "200px",
    minWidth: "300px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
}
export const MealPlans = () => {
  const { store, actions } = useContext(Context);
  const navigate= useNavigate()
// const [diet, setDiet]= useState(null)
const diet = useRef("")
const setDiet = (e) =>{
  console.log(e.target.name)
   diet.current= e.target.name
  }

  useEffect(() => {
    !store.token && navigate("/login")
  }, []);


  return (
    <div className="bg-vital-gray">

      <BackgroundContainer
        title="Choose your Plan"
        image={Imagen}

      />


      <div className="container-fluid contenido mt-4 ">
        <div className="carrousel">

          <span className="text-decoration-none" data-bs-toggle="modal" data-bs-target="#exampleModal"  onClick={()=>{navigate("/showRecipes/highFiber")}}>
            <article className="meal-card-high-fiber" style={image.cardFiber}>
              <h1 className="text-vital-orange" name="highFiber">High Fiber</h1>
            </article>
          </span>
          

          <span  onClick={()=>{navigate("/showRecipes/highProtein")}}>
            <article className="meal-card-high-protein" style={image.cardProtein}>
              <h1 className="text-vital-orange" name="highProtein" >High Protein</h1>
            </article>
          </span>

          <span onClick={()=>{navigate("/showRecipes/lowCarb")}}>
            <article className="meal-card-low-carb" style={image.cardCarb}>
              <h1 className="text-vital-orange" name="lowCarb">Low Carb</h1>
            </article>
          </span>

          <span  onClick={()=>{navigate("/showRecipes/lowFat" )}}>
            <article className="meal-card-low-fat" style={image.cardCarb}>
              <h1 className="text-vital-orange" name="lowFat">Low Fat</h1>
            </article>
          </span>

        </div>
      </div>

      
    
      
     


    </div>

  )
}
