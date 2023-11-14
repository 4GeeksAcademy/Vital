import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from "../../store/appContext";

export const FavoriteWorkout = ({exercise, bodypart, id}) => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate()

    return (
        <div className='card bg-dark d-flex justify-content-evenly mb-1 p-3'>
            <div>
                <span className='text-vital-white mb-1'>{bodypart}</span>
                <h5 className='text-vital-orange fs-5' onClick={() => navigate(`/exercisedetail/${id}`)}>{exercise}</h5>
            </div>
            <div>
                <i className="fa-regular fa-trash-can text-vital-white" onClick={() => actions.removeFavExercise(bodypart, exercise, id)}></i>
            </div>
        </div>
    )
}
