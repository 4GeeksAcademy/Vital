import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from "../../store/appContext";
import "../../../styles/favorite-workout.css"

export const FavoriteMeals = ({ label, url }) => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate()

    const handleClick = async () => {
        console.log(url)
        const isValid = await actions.getMealDetails(url)
        console.log(store.mealDetail)
        if (isValid) navigate("/mealDetails")
    }

    return (
        <div className='card bg-dark d-flex justify-content-evenly mb-1 p-3 position-relative'>
            <div>
                <span className='text-vital-white mb-1' style={{cursor: "pointer"}} onClick={handleClick}>{label}</span>
            </div>
            <div>
                <i className="delete-icon fa-regular fa-trash-can text-vital-white" onClick={() => actions.removeFavMeal(url)}></i>
            </div>
        </div>
    )
}