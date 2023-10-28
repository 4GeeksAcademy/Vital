import React, {useState} from "react";
import "../../styles/login.css"
import { Link } from "react-router-dom";

export const Login = () => {
    const [email,setEmail]= useState("");
    const [password,setPassword]= useState("");
    return (
        <div className="bg-vital-black p-5">
            <div className="container bg-vital-gray rounded-3">
                <div className="row">
                    <div className="col-6 imageLogin "></div>
                    <div className="col-6 d-flex-column">
                        <h1 className="d-flex justify-content-center my-4 text-vital-orange">Hello welcome back!</h1>
                        <div className="mb-3">
                            <label for="exampleFormControlInput1" className="form-label text-vital-white">Email</label>
                            <input type="string" value={email} className="form-control" id="exampleFormControlInput1" onChange={(event)=>{setEmail( event.target.value)}}/>
                        </div>
                        <div className="mb-3">
                            <label for="exampleFormControlInput1" className="form-label text-vital-white">Password</label>
                            <input type="password" value={password} className="form-control" id="exampleFormControlInput1" onChange={(event)=>{setPassword(event.target.value)}}/>
                        </div>
                        <div className="mb-3 mt-4">
                            <button className="btn btn-vital-orange text-vital-white w-100">Login</button>
                        </div>
                        <div className="d-flex-column justify-content-center mb-4">

                            <span className="d-flex justify-content-center text-vital-white">Don't have an account?</span>
                            <Link to='/register' className="d-flex justify-content-center text-vital-orange text-decoration-none">Create one here</Link>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}