import React, { useContext, useEffect } from 'react'
import { Context } from "../store/appContext"
import { FavoriteWorkout } from '../component/favoritesCards/favoriteWorkout'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"

export const Favorites = () => {
    const navigate = useNavigate()
    const { store } = useContext(Context)
    const { favorites } = store
    const isEmpty = Object.values(favorites).every(bodyPartKey => bodyPartKey.length === 0)

    useEffect(() => {
        !store.user && navigate('/login')
    }
        , [])

    return (
        <>
            {
                store.user && <>
                <h1 className="text-vital-orange fw-bold d-flex justify-content-center mt-2">Favorites</h1>
                <div className='container row m-auto justify-content-center'>
                    <div className='col-4 my-2 mx-1'>
                        <div className='card container bg-vital-black d-flex'>
                            <h5 className="card-header border-0 text-vital-orange fw-bold">Favorite workouts</h5>
                            {
                                isEmpty ?
                                <div className='card-body'>
                                    <p className="text-vital-white">You haven't added exercises.</p>
                                </div>
                                :
                                <div className='card-body'>
                                    {
                                        Object.keys(store.favorites).map((bodypart, index) =>(
                                            store.favorites[bodypart].map((exerciseInBodypart) => {
                                                return <FavoriteWorkout id={exerciseInBodypart.id} exercise={exerciseInBodypart.exercise} bodypart={bodypart.toUpperCase()}/>
                                            })
                                        ))
                                    }
                                </div>
                            }
                        </div>
                    </div>                    
                </div>
                </>
            }
        </>
    )
}
