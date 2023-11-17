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
        title="Healthy recipes"
        description="Here you can find delicious and nutritious dishes for every occasion. Browse, cook, and enjoy"
        image={Imagen}

      />


      <div className="container contenido mt-5 mb-5 ">
        <div className="carrousel">

          <span className="text-decoration-none" data-bs-toggle="modal" data-bs-target="#exampleModal" >
            <article className="meal-card-high-fiber" style={image.cardFiber}>
              <h1 className="meal-cards text-vital-orange" name="highFiber" onClick={()=>{navigate("/showRecipes/highFiber")}}
             
              >High Fiber</h1>
            </article>
          </span>
          

          <span  >
            <article className="meal-card-high-protein" style={image.cardProtein}>
              <h1 className="meal-cards text-vital-orange" name="highProtein" onClick={()=>{navigate("/showRecipes/highProtein")}}
             
              >High Protein</h1>
            </article>
          </span>

          <span >
            <article className="meal-card-low-carb" style={image.cardCarb}>
              <h1 className="meal-cards text-vital-orange" name="lowCarb" onClick={()=>{navigate("/showRecipes/lowCarb")}}
             
              >Low Carb</h1>
            </article>
          </span>

          <span  >
            <article className="meal-card-low-fat" style={image.cardFat}>
              <h1 className="meal-cards text-vital-orange" name="lowFat" onClick={()=>{navigate("/showRecipes/lowFat" )}}
              
              >Low Fat</h1>
            </article>
          </span>

        </div>
      </div>

      
    
      
     


    </div>

  )
}
