import React, { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Context } from "../store/appContext"
import { useNavigate } from "react-router-dom"

export const MealDetails = () => {
  const navigate = useNavigate()
  const { store, actions } = useContext(Context)
  const { index } = useParams()
  console.log(store.meals[index])
  const meal = store.meals[index]
  //if (!meal.recipe) return ""
  useEffect(() => {
    if (store.meals.length <= 0) navigate("/mealPlans")
  }, [])
  return (
    <>
      {
        store.meals.length > 0 &&
        <div className="container bg-dark mt-5 mb-5 p-0">
          <div className="d-flex pt-5 pe-5 pb-5">
            <div className="border border-3 rounded border-vital-orange mx-5" >
              <img src={meal.recipe.image} />
            </div>
            <div className="ps-5">
              <h1 className="pb-4 text-vital-orange">{meal.recipe.label}</h1>
              <p className="fs-5 text-vital-white">{meal.recipe.healthLabels}</p>
            </div>
          </div>

          <div className="bg-vital-white">
            <div className="d-flex flex-column justify-content-evenly">
              <div className="d-flex justify-content-center align-items-start fs-5">
              <h1>Servings <strong>{meal.recipe.yield}</strong></h1>
              </div>
              <div className="d-flex px-5 justify-content-center align-items-start flex-column fs-5 ">
                
                <p className="text-vital-orange">Ingredients</p>
                <p>
                  {meal.recipe.ingredientLines.map((ingredient, index) => {
                    return (
                      <p key={index}>
                        <i className="fa-solid fa-circle mx-3 text-vital-orange"></i>
                        {ingredient}
                      </p>
                    )
                  }
                  )}
                </p>
              </div>
              <div className="d-flex bg-dark text-vital-white justify-content-around fs-5">
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
                  <a href={meal.recipe.url} className="btn btn-vital-orange text-vital-white" target="_blank">Go to recipe</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>


  )
}