import React, {useContext, useEffect, useState} from "react";
import "../../styles/login.css"
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const AdminLogin = () => {
    const navigate = useNavigate()
    const {store, actions}=useContext(Context)
    const [username,setUsername]= useState("");
    const [password,setPassword]= useState("");

    useEffect(()=>{
        store.token && navigate("/dashboard")
    })

    const loginAdmin = async () =>{
        if(username ==  "" || password == ""){
            alert("inputs can't be empty")
            return 
        }
        const isValid =  await actions.loginAdmin(username, password)
            if(isValid){
                actions.setUsername(username)
                alert("Login Successfully")
                navigate("/dashboard")
            }  else {
                alert("Invalid credentials")
                setPassword("")
                setUsername("")
            }                 
                
    }
    
    return (
        <div className="bg-vital-black p-5">
            <div className="container bg-vital-gray rounded-3">
                <div className="row">
                    <div className="col-6 imageLogin "></div>
                    <div className="col-6 d-flex-column">
                        <h1 className="d-flex justify-content-center my-4 text-vital-orange">AdminLogin WebPage!</h1>
                        <div className="mb-3">
                            <label for="exampleFormControlInput1" className="form-label text-vital-white">Username</label>
                            <input type="string" value={username} className="form-control" id="exampleFormControlInput1" onChange={(event)=>{setUsername( event.target.value)}}/>
                        </div>
                        <div className="mb-3">
                            <label for="exampleFormControlInput1" className="form-label text-vital-white">Password</label>
                            <input type="password" value={password} className="form-control" id="exampleFormControlInput1" onChange={(event)=>{setPassword(event.target.value)}}/>
                        </div>
                        <div className="mb-3 mt-4">
                            <button className="btn btn-vital-orange text-vital-white w-100" onClick={loginAdmin}>Login</button>
                        </div>                        
                    </div>
                </div>
            </div>
        </div>
    )
}