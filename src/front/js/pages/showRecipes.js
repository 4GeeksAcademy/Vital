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
          <>
            <div className="d-flex">
              <span  data-bs-toggle="modal" data-bs-target="#exampleModal">
                <div className="card d-flex me-4 mb-4" style={{ width: "18rem" }}>
                  <img src={meal.recipe.image} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title text-vital-orange">{meal.recipe.label}</h5>
                    <p className="card-text">{meal.recipe.dishType}</p>
                  </div>
                </div>
              </span>
            </div>
                

              <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-xl">
                  <div className="modal-content">
                    <div className="modal-body">
                      <div className="row">
                        <div className="col-4">
                          <img src={meal.recipe.image}/>
                        </div>
                        <div className="col-8 ">
                          <h1 className="pb-4 text-vital-orange">{meal.recipe.label}</h1>
                          <p>{meal.recipe.healthLabels}</p>
                        </div>
                      </div>
                    </div>
                    <div className="modal-body bg-light">
                      <div className="d-flex justify-content-evenly">
                        <div className="d-flex justify-content-start align-items-center">
                          <p className="fs-1"><strong>{meal.recipe.calories} Kcal</strong> </p>
                        </div>
                        <div className="d-flex justify-content-start flex-column">
                          <p><i class="fa-solid fa-circle text-success"></i>PROTEIN <strong>{meal.recipe.digest[2].total} g</strong> </p>
                          <p><i class="fa-solid fa-circle text-danger"></i>FAT <strong>{meal.recipe.digest[0].total} g</strong> </p>
                          <p><i class="fa-solid fa-circle text-warning"></i>CARB <strong>{meal.recipe.digest[1].total} g</strong> </p>
                        </div>  
                        <div className="d-flex justify-content-start flex-column">
                          <p>{meal.recipe.digest[3].label}<strong> {meal.recipe.digest[3].total} mg</strong></p>
                          <p>{meal.recipe.digest[4].label}<strong> {meal.recipe.digest[4].total} mg</strong></p>
                          <p>{meal.recipe.digest[5].label}<strong> {meal.recipe.digest[5].total} mg</strong></p>
                          <p>{meal.recipe.digest[6].label}<strong> {meal.recipe.digest[6].total} mg</strong></p>
                          <p>{meal.recipe.digest[7].label}<strong> {meal.recipe.digest[7].total} mg</strong></p>
                          <p>{meal.recipe.digest[8].label}<strong> {meal.recipe.digest[8].total} mg</strong></p>
                        </div>  
                      </div>
                    </div>   
                  </div>
                </div>
              </div>
             
          </>

          )

        })}
      </div>



    </div>
  )
}