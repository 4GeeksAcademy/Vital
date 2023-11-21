import React, { useContext, useEffect } from 'react'
import { Context } from "../store/appContext"
import { FavoriteWorkout } from '../component/favoritesCards/favoriteWorkout'
import { FavoriteMeals } from '../component/favoritesCards/favoritesMeals'
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
        <div className='m-3'>
            {
                store.user && <>
                <h1 className="text-vital-orange fw-bold d-flex justify-content-center mt-2">Favorites</h1>
                <div className='container  row m-auto justify-content-center'>
                    <div className='col- d-flex justify-content-around  my-2 mx-1'>
                        <div className='card col-4 container bg-vital-black d-flex'>
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
                                                return <FavoriteWorkout key={index} id={exerciseInBodypart.id} exercise={exerciseInBodypart.exercise} bodypart={bodypart.toUpperCase()}/>
                                            })
                                        ))
                                    }
                                </div>
                            }
                        </div>
                        <div className='card col-4 container bg-vital-black d-flex'>
                            <h5 className="card-header border-0 text-vital-orange fw-bold">Favorite Meals</h5>
                            {
                                store.favoritesMeals.length <=0 ?
                                <div className='card-body'>
                                    <p className="text-vital-white">You haven't added meals.</p>
                                </div>
                                :
                                <div className='card-body'>
                                    {
                                        
                                        store.favoritesMeals.map((meal, index) => {  
                                            console.log(meal)                                          
                                            return <FavoriteMeals key={index} label={meal.label} url={meal.url}/>
                                        })
                                    }
                                </div>
                            }
                        </div>
                    </div>                    
                </div>
                </>
            }
        </div>
    )
}
