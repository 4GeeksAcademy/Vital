import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { chooseMeal } from "../constants/constants";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"
import Loading from "../component/loading/loading";
import { MealDetails } from "./mealDetails";
import "../../styles/meals.css"

export const ShowRecipes = () => {
  const { diet, meal } = useParams()
  const navigate = useNavigate()
  const [isShow, setIsShow] = useState(false)
  const { store, actions } = useContext(Context)
  const [recipe, setRecipe] = useState(null)
  const [search, setSearch] = useState(null)
  const [url, setUrl] = useState(null)
  const getRecipes = async (meal) => {
    const urlFetch = chooseMeal[diet][meal]
    setUrl(urlFetch)
    const recipes = await actions.getMeals(urlFetch)
    const recipeJson = await recipes.json()
    console.log(recipeJson)
    setRecipe(recipeJson)

  }


  console.log(store.favoritesMeals)


  useEffect(() => {
    !store.token && navigate("/login")
    getRecipes("breakfast")
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, scale: 0 },
    show: { opacity: 1, scale: 1 }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    const recipes = await actions.getMeals(url + "&q=" + search)
    const recipeJson = await recipes.json()
    setRecipe(recipeJson)
    setSearch("")
  }


  const handleMealDetails = async (url) => {
    console.log(url)
    const isValid = await actions.getMealDetails(url)
    console.log(store.mealDetail)
    if (isValid) navigate("/mealDetails")

  }



  return (
    <>
      {

        store.meals.length <= 0 ?
          <div className="d-flex justify-content-center">
            <Loading />
          </div> :
          <>
            <div className="container-fluid d-flex flex-column mt-3">
              <div className="d-flex mb-3 m-auto">
                <span className="meal-cards nav-link active fs-3 text-vital-orange mx-5" aria-current="page" onClick={() => getRecipes("breakfast")}>Breakfast</span>
                <span className="meal-cards nav-link fs-3 text-vital-orange mx-5" onClick={() => getRecipes("lunch")}>Lunch</span>
                <span className="meal-cards nav-link fs-3 text-vital-orange mx-5" onClick={() => getRecipes("dinner")}>Dinner</span>
              </div>
              <div className="d-flex justify-content-center mb-5 mt-2">
                <input
                  type="text"
                  value={search}
                  placeholder="Search"
                  className="search-input rounded-pill px-3 mx-3"
                  style={{ height: "45px" }}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <input
                  type="button"
                  value="Search"
                  className="search-button btn btn-vital-orange text-vital-white rounded-pill mx-3"
                  onClick={handleSearch}
                />
              </div>
              <motion.div className="container d-flex flex-wrap justify-content-around"
                variants={container}
                initial="hidden"
                animate="show"
              >

                {store.meals.map((meal, index) => {
                  return (

                    <motion.div key={index} className="d-flex"
                      variants={item}
                    >

                      <div className="card-map card d-flex mb-4 bg-vital-black position-relative rounded-3 justify-content-center" style={{ width: "18rem" }} > {/*navigate(`/mealDetails/${index}`)*/}
                        <img src={meal.recipe.image} className="card-img-top" alt="..." />

                        {
                          store.favoritesMeals.map(fav => fav.label).includes(meal.recipe.label) ? <i className="heart fa-solid fa-heart" style={{ color: "#ff5300", cursor: "pointer" }} onClick={() => actions.removeFavMeal(meal._links.self.href)}></i> : <i className="heart fa-regular fa-heart" style={{ color: "#ff5300", cursor: "pointer" }} onClick={() => actions.addFavMeal(meal._links.self.href, meal.recipe.label)}></i>
                        }

                        <div className="d-flex flex-column card-body text-vital-orange">
                          <h5 className="card-title text-vital-white">{meal.recipe.label}</h5>
                          <p className="card-text">Dish Type: <span className="text-vital-white"> {meal.recipe.dishType}</span></p>
                          <button className="btn btn-vital-orange text-vital-white rounded-pill fw-bold tooltiptext mt-auto w-50" onClick={() => handleMealDetails(meal._links.self.href)}>View details</button>
                        </div>
                      </div>

                    </motion.div>
                  )
                })}
              </motion.div>
            </div>
          </>
      }
    </>
  )
}

