import React from 'react'
import { FavoriteWorkout } from '../component/favoritesCards/favoriteWorkout'

export const Favorites = () => {
    return (
        <>
            <h1 className="text-vital-orange fw-bold d-flex justify-content-center mt-2">Favorites</h1>
            <div className='container row m-auto justify-content-center'>
                <div className='col-4 my-2 mx-1'>
                    <div className='card container bg-vital-black d-flex'>
                        <h5 className="card-header text-vital-orange fw-bold">Favorite workouts</h5>
                        <div className='card-body'>
                            <FavoriteWorkout />
                            <FavoriteWorkout />
                            <FavoriteWorkout />
                        </div>
                    </div>
                </div>
                <div className='col-4 my-2'>
                    <div className='card container bg-vital-black d-flex'>
                        <h5 className="card-header text-vital-orange fw-bold">Favorite meal plans</h5>
                        <div className='card-body'>
                            <FavoriteWorkout />
                            <FavoriteWorkout />
                            <FavoriteWorkout />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
