import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Context } from "../store/appContext"
import { useNavigate } from "react-router-dom"
import "../../styles/meals.css"

export const MealDetails = () => {
  const navigate = useNavigate()
  const { store, actions } = useContext(Context)
  const [meal, setMeal] = useState(null)
  // const { index } = useParams()
  // console.log(store.meals[index])
  //const meal = store.mealDetail
  //if (!meal.recipe) return ""
  useEffect(() => {    
    if (!store.mealDetail) navigate("/mealPlans")
    console.log(store)
    actions.getMealDetails(store.urlMeal)
    setMeal(store.mealDetail)
  }, [])

  console.log(meal)
 

  return (
    <>
      {
        meal &&
        <div className="container bg-dark mt-5 mb-5 p-0" style={{ borderRadius: "2em" }}>
          <div className="d-flex pt-5 pe-5 pb-5">
            <div className="mx-5" >
              <img className="rounded-3" src={meal.recipe.image} />
            </div>
            <div className="ps-5">
              <h1 className="pb-4 text-vital-orange">{meal.recipe.label}</h1>
              <p className="fs-5 text-vital-white">{meal.recipe.healthLabels}</p>
            </div>
          </div>

          <div className="bg-dark pt-4" style={{ borderTop: "1px solid #ff5300", borderRadius: "0 0 2em 2em"}}>
            <div className="d-flex flex-column justify-content-evenly">
              <div className="d-flex justify-content-center align-items-start fs-5">
              <h1 className="text-vital-white">Servings <strong>{meal.recipe.yield}</strong></h1>
              </div>
              <div className="d-flex px-5 justify-content-center align-items-start flex-column fs-5 ">
                
                <p className="text-vital-orange">Ingredients</p>
                <div>
                  {meal.recipe.ingredientLines.map((ingredient, index) => {
                    return (
                      <p className="text-vital-white" key={index}>
                        <i className="fa-solid fa-circle mx-3 text-vital-orange"></i>
                        {ingredient}
                      </p>
                    )
                  }
                  )}
                </div>
              </div>
              <div className="d-flex bg-dark text-vital-white justify-content-around fs-5" style={{ borderTop: "1px solid #ff5300", borderRadius: "0 0 2em 2em" }}>
                <div className="d-flex flex-column justify-content-center">
                  <p><i className="fa-solid fa-circle mx-3 text-success"></i><span >PROTEIN</span> <strong>{meal.recipe.digest[2].total.toFixed(0)} g</strong> </p>
                  <p><i className="fa-solid fa-circle mx-3 text-danger"></i><span>FAT</span> <strong>{meal.recipe.digest[0].total.toFixed(0)} g</strong> </p>
                  <p><i className="fa-solid fa-circle mx-3 text-warning"></i><span>CARB</span> <strong>{meal.recipe.digest[1].total.toFixed(0)} g</strong> </p>
                </div>
                <div className="d-flex justify-content-center flex-column py-3">
                  <p>{meal.recipe.digest[3].label}<strong> {meal.recipe.digest[3].total.toFixed(0)} mg</strong></p>
                  <p>{meal.recipe.digest[4].label}<strong> {meal.recipe.digest[4].total.toFixed(0)} mg</strong></p>
                  <p>{meal.recipe.digest[5].label}<strong> {meal.recipe.digest[5].total.toFixed(0)} mg</strong></p>
                  <p>{meal.recipe.digest[6].label}<strong> {meal.recipe.digest[6].total.toFixed(0)} mg</strong></p>
                  <p>{meal.recipe.digest[7].label}<strong> {meal.recipe.digest[7].total.toFixed(0)} mg</strong></p>
                  <p>{meal.recipe.digest[8].label}<strong> {meal.recipe.digest[8].total.toFixed(0)} mg</strong></p>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <p className="fs-1"><strong>{meal.recipe.calories.toFixed(0)} Kcal</strong> </p>
                  <a href={meal.recipe.url} className="recipe-btn btn btn-vital-orange text-vital-white rounded-pill fw-bold" target="_blank">Go to recipe</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>


  )
}