import React, { useContext, useEffect, useState, useRef } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import BackgroundContainer from "../component/backgroundContainer";
import Imagen from "../../img/background-nutrition.png"
import "../../styles/meals.css"

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
            <article className="meal-card-high-fiber">
              <h1 className="text-vital-orange" name="highFiber">High Fiber</h1>
            </article>
          </span>
          

          <span  onClick={()=>{navigate("/showRecipes/highProtein")}}>
            <article className="meal-card-high-protein">
              <h1 className="text-vital-orange" name="highProtein" >High Protein</h1>
            </article>
          </span>

          <span onClick={()=>{navigate("/showRecipes/lowCarb")}}>
            <article className="meal-card-low-carb">
              <h1 className="text-vital-orange" name="lowCarb">Low Carb</h1>
            </article>
          </span>

          <span  onClick={()=>{navigate("/showRecipes/lowFat")}}>
            <article className="meal-card-low-fat">
              <h1 className="text-vital-orange" name="lowFat">Low Fat</h1>
            </article>
          </span>

        </div>
      </div>

      
    
      
     


    </div>

  )
}
