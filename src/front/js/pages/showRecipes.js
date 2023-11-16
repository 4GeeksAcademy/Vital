import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { chooseMeal } from "../constants/constants";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"
import Loading from "../component/loading/loading";
import { MealDetails } from "./mealDetails";


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

  

  return (
    <>
      {

        store.meals.length <= 0 ? <Loading /> :
          <>
            <div className="container-fluid  p-4 d-flex flex-column">
              <div className="d-flex mb-3  m-auto">
                <span className="nav-link active fs-3 text-vital-orange mx-5" aria-current="page" onClick={(e) => getRecipes("breakfast")}>Breakfast</span>
                <span className="nav-link fs-3 text-vital-orange mx-5" onClick={(e) => getRecipes("lunch")}>Lunch</span>
                <span className="nav-link fs-3 text-vital-orange mx-5" onClick={(e) => getRecipes("dinner")}>Dinner</span>
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
              <motion.div className="container d-flex flex-wrap"
                variants={container}
                initial="hidden"
                animate="show"
              >

                {store.meals.map((meal, index) => {
                  return (

                    <motion.div key={index} className="d-flex"
                      variants={item}
                    >
                      
                        <div className="card d-flex me-4 mb-4 bg-dark" style={{ width: "18rem" }} onClick={()=>{navigate(`/mealDetails/${index}`)}}>
                          <img src={meal.recipe.image} className="card-img-top" alt="..." />
                          <div className="card-body">
                            <h5 className="card-title text-vital-orange">{meal.recipe.label}</h5>
                            <p className="card-text text-vital-white">{meal.recipe.dishType}</p>
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

