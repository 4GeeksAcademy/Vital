import React, {useContext, useEffect} from "react";
import { Context } from "../store/appContext";
import { chooseMeal } from "../constants/constants";

export const MealPlans = () => {
  const {store, actions} = useContext(Context)
  useEffect(()=>{
    actions.getMeals(chooseMeal.lowFat.dinner)
  },[])
    return(
      
        <div className="container bg-success p-4 ">
          <div className="row">
            <div className="col-12">
              <div className="input-group mb-3">
                <input type="text" className="form-control rounded-pill" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2"/>
              </div>
            </div>
          </div>

          <h1 className="text-vital-orange">Breakfast</h1>

          { store.meals && 
            store.meals.map((meal, index) => {
              
              return ( 
                <div className="row">
                  <div className="col">
                    <div className="card" style={{width: "18rem"}}>
                      <img src={meal.recipe.image} className="card-img-top" alt="..."/>
                      <div className="card-body">
                        <h5 className="card-title">{meal.recipe.label}</h5>
                        <p className="card-text">{meal.recipe.calories}</p>
                      </div>
                    </div>
                  </div>  
                </div>
              )
            })
          }
        </div>
      
    )
}