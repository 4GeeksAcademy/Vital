import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { chooseMeal } from "../constants/constants";
import { useParams } from "react-router-dom";
export const ShowRecipes = () => {
  const { diet, meal } = useParams()

  const { store, actions } = useContext(Context)
  const [recipe, setRecipe] = useState(null)
  const getRecipes = async (meal) => {
    const url = chooseMeal[diet][meal]
    const recipes = await actions.getMeals(url)
    const recipeJson = await recipes.json()
    setRecipe(recipeJson)
  }

  recipe && console.log(recipe)
  return (
    <div className="container-fluid  p-4 d-flex flex-column">
      <div className="d-flex mb-3  m-auto">
          <span className="nav-link active fs-3 text-vital-orange mx-5" aria-current="page" onClick={(e) => getRecipes("breakfast")}>Breakfast</span>
          <span className="nav-link fs-3 text-vital-orange mx-5" onClick={(e) => getRecipes("lunch")}>Lunch</span>
          <span className="nav-link fs-3 text-vital-orange mx-5" onClick={(e) => getRecipes("dinner")}>Dinner</span>
      </div>
      <div className="container d-flex flex-wrap">
      {store.meals.map((meal) => {
        return (

          <div className="d-flex">
            <div className="card d-flex me-4 mb-4" style={{ width: "18rem" }}>
              <img src={meal.recipe.image} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{meal.recipe.label}</h5>
                <p className="card-text">{meal.recipe.calories} Kcal</p>
              </div>
            </div>
          </div>
        )

      })}
      </div>

     

    </div>
  )
}