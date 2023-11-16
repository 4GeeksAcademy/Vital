import React, { useContext,useEffect } from "react"
import { useParams} from "react-router-dom"
import { Context } from "../store/appContext"
import { useNavigate } from "react-router-dom"
import "../../styles/meal-detail.css"

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
      <div className="container meal-detail  bg-vital-grey   ">
        <div className="d-flex pt-5 pe-5 pb-2">
          <div  >
            <img className="border border-0 rounded" src={meal.recipe.image} />
          </div>
          <div className="ps-5 ">
            <h1 className="pb-4 text-vital-orange">{meal.recipe.label}</h1>
            <p className="fs-5 mb-4">{meal.recipe.healthLabels}</p>
            <div className="d-flex justify-content-around macro-details">
                <div className="d-flex justify-content-center align-items-start flex-column fs-5 ">
                    <p><i class="fa-solid fa-circle text-success"></i><span >PROTEIN</span> <strong>{meal.recipe.digest[2].total.toFixed(0)} g</strong> </p>
                    <p><i class="fa-solid fa-circle text-danger"></i><span>FAT</span> <strong>{meal.recipe.digest[0].total.toFixed(0)} g</strong> </p>
                    <p><i class="fa-solid fa-circle text-warning"></i><span>CARB</span> <strong>{meal.recipe.digest[1].total.toFixed(0)} g</strong> </p>  
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