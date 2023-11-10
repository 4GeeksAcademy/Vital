import React from 'react'

export const FavoriteWorkout = () => {
    return (
        <div className='card bg-dark d-flex justify-content-evenly mb-1 p-3'>
            <div>
                <span className='text-vital-white mb-1'>CATEGORIA</span>
                <h5 className='text-vital-orange fs-5'>Nombre ejercicio/dieta</h5>
            </div>
            <div>
                <i className="fa-regular fa-trash-can text-vital-white"></i>
            </div>
        </div>
    )
}
