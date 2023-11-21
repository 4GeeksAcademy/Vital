import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from "../../store/appContext";

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
        <div className='card bg-dark d-flex justify-content-evenly mb-1 p-3'>
            <div>
                <span className='text-vital-white mb-1' onClick={handleClick}>{label}</span>
            </div>
            <div>
                <i className="fa-regular fa-trash-can text-vital-white" onClick={() => actions.removeFavMeal(url)}></i>
            </div>
        </div>
    )
}