import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from "../../store/appContext";

export const FavoriteWorkout = ({exercises, category}) => {
    const { store } = useContext(Context)
    const { favorites } = store
    const navigate = useNavigate()

    return (
        <div className='card bg-dark d-flex justify-content-evenly mb-1 p-3'>
            <div>
                <span className='text-vital-white mb-1'>{category}</span>
                <h5 className='text-vital-orange fs-5'>{exercises}</h5>
            </div>
            <div>
                <i className="fa-regular fa-trash-can text-vital-white"></i>
            </div>
        </div>
    )
}
