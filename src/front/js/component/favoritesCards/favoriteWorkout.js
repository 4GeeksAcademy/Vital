import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from "../../store/appContext";
import "../../../styles/favorite-workout.css"

export const FavoriteWorkout = ({exercise, bodypart, id}) => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate()

    return (
        <div className='card bg-dark d-flex justify-content-evenly mb-1 p-3 position-relative'>
            <div>
                <span className='text-vital-white mb-1'>{bodypart}</span>
                <h5 className='text-vital-orange fs-5' style={{cursor: "pointer"}} onClick={() => navigate(`/exercisedetail/${id}`)}>{exercise}</h5>
            </div>
            <div>
                <i className="delete-icon fa-regular fa-trash-can text-vital-white" onClick={() => actions.removeFavExercise(bodypart, exercise, id)}></i>
            </div>
        </div>
    )
}
