import {useState, useEffect} from "react";
import { Exercises } from "../pages/exercises";


export const useFetch = (url, options) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    
    useEffect(()=>{
        const getData = async () => {
            try{
                const response = await fetch(url, options)
                if(response.ok) {
                    const dataJson = await response.json()
                    setData(dataJson)
                    console.log(dataJson)
                } else {
                    throw new Error(response.statusText)
                }
            } catch (error){
                setError(error)
            }finally {
                setLoading(false)
            }
        }

        getData()
        

    },[url])
    return {data, error, loading}
};