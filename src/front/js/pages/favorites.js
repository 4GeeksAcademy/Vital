import React, { useContext } from 'react'
import { Context } from "../store/appContext"
import { FavoriteWorkout } from '../component/favoritesCards/favoriteWorkout'

export const Favorites = () => {

    const { store } = useContext(Context)
    const { favorites } = store
    const isEmpty = Object.values(favorites).every(bodyPartKey => bodyPartKey.length === 0)


    return (
        <>
            <h1 className="text-vital-orange fw-bold d-flex justify-content-center mt-2">Favorites</h1>
            <div className='container row m-auto justify-content-center'>
                <div className='col-4 my-2 mx-1'>
                    <div className='card container bg-vital-black d-flex'>
                        <h5 className="card-header text-vital-orange fw-bold">Favorite workouts</h5>
                        {
                            isEmpty ?
                            <div className='card-body'>
                                <p className="text-vital-white">You haven't added exercises.</p>
                            </div>
                            :
                            <div className='card-body'>
                                {
                                    Object.keys(store.favorites).map((category, index) =>(
                                        store.favorites[category].map((exercise) => {
                                            return <FavoriteWorkout exercises={exercise} category={category.toUpperCase()}/>
                                        })
                                    ))
                                }
                            </div>
                        }
                    </div>
                </div>
                {/* <div className='col-4 my-2'>
                    <div className='card container bg-vital-black d-flex'>
                        <h5 className="card-header text-vital-orange fw-bold">Favorite meal plans</h5>
                        <div className='card-body'>
                            <FavoriteWorkout />
                        </div>
                    </div>
                </div> */}
            </div>
        </>
    )
}
