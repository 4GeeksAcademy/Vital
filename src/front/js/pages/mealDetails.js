import React, { useContext,useEffect } from "react"
import { useParams} from "react-router-dom"
import { Context } from "../store/appContext"
import { useNavigate } from "react-router-dom"

export const MealDetails = ( ) => {
    const navigate = useNavigate()
    const { store, actions} = useContext(Context)
    const {index} = useParams()
    console.log(store.meals[index])
    const meal = store.meals[index]
    //if (!meal.recipe) return ""
    useEffect(()=>{
        if(store.meals.length<=0) navigate("/mealPlans")
    },[])
    return (
    <>
        {
            store.meals.length >0 && 
      <div className="container  bg-white">
        <div className="row">
          <div className="col-4">
            <img src={meal.recipe.image} />
  
          </div>
          <div className="col-8 ">
            <h1 className="pb-4 text-vital-orange">{meal.recipe.label}</h1>
            <p>{meal.recipe.healthLabels}</p>
          </div>
        </div>
  
        <div className="bg-light">
          <div className="d-flex justify-content-evenly">
            <div className="d-flex justify-content-start align-items-center">
              <p className="fs-1"><strong>{meal.recipe.calories.toFixed(0)} Kcal</strong> </p>
            </div>
            <div className="d-flex justify-content-start flex-column">
              <p><i class="fa-solid fa-circle text-success"></i>PROTEIN <strong>{meal.recipe.digest[2].total.toFixed(0)} g</strong> </p>
              <p><i class="fa-solid fa-circle text-danger"></i>FAT <strong>{meal.recipe.digest[0].total.toFixed(0)} g</strong> </p>
              <p><i class="fa-solid fa-circle text-warning"></i>CARB <strong>{meal.recipe.digest[1].total.toFixed(0)} g</strong> </p>
            </div>
            <div className="d-flex justify-content-start flex-column">
              <p>{meal.recipe.digest[3].label}<strong> {meal.recipe.digest[3].total.toFixed(0)} mg</strong></p>
              <p>{meal.recipe.digest[4].label}<strong> {meal.recipe.digest[4].total.toFixed(0)} mg</strong></p>
              <p>{meal.recipe.digest[5].label}<strong> {meal.recipe.digest[5].total.toFixed(0)} mg</strong></p>
              <p>{meal.recipe.digest[6].label}<strong> {meal.recipe.digest[6].total.toFixed(0)} mg</strong></p>
              <p>{meal.recipe.digest[7].label}<strong> {meal.recipe.digest[7].total.toFixed(0)} mg</strong></p>
              <p>{meal.recipe.digest[8].label}<strong> {meal.recipe.digest[8].total.toFixed(0)} mg</strong></p>
            </div>
          </div>
        </div>
      </div>
        }
    
    </>
  
    )
  }