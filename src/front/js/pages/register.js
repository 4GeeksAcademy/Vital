import React, { useContext, useState, useEffect } from "react";
import "../../styles/register.css"
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


export const Register = () => {
    const {store, actions}= useContext(Context)
    const navigate = useNavigate()
    const [user,setUser] = useState( {
        name: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
    })

    useEffect(()=>{
        store.token && navigate("/")
    })

    const addUser = async ()=> {
        if(user.password == ""){
            alert("Password can't be empty")
            return 
        }
        const newUser = await actions.createUser(user)
        if(newUser){
            alert("User was added successfully")
            navigate("/login")
        }
        else{
            alert("User was not created")
        }
        
        
    }

    return (
        <div className="bg-vital-black p-5">

        <div className="container  bg-vital-gray  rounded-3">
            <div className="row">
                <div className="col-6 d-flex justify-content-center align-items-center  text-light rounded-start-3 imageRegister"><h2><strong>Create your Account</strong></h2></div>
                <div className="col-6 ">
                    <h2 className="mb-4 mt-4 d-flex justify-content-center "><strong className= "text-vital-orange">Sign up</strong></h2>


                    <label for="inputPassword5" className="form-label text-vital-white">Name</label>
                    <input type="text" value={user.name} id="inputPassword5" className="form-control mb-3" aria-describedby="passwordHelpBlock" onChange={(event)=>{setUser({...user, name: event.target.value})}} />

                    <label for="inputPassword5" className="form-label text-vital-white">Last Name</label>
                    <input type="text" value={user.lastname} id="inputPassword5" className="form-control mb-3" aria-describedby="passwordHelpBlock" onChange={(event)=>{setUser({...user, lastname: event.target.value})}} />

                    <label for="inputPassword5" className="form-label text-vital-white">Username</label>
                    <input type="text" id="inputPassword5" className="form-control mb-3" aria-describedby="passwordHelpBlock" onChange={(event)=>{setUser({...user, username: event.target.value})}} />

                    <label for="inputPassword5" className="form-label text-vital-white">Email</label>
                    <input type="email" id="inputPassword5" className="form-control mb-3" aria-describedby="passwordHelpBlock" onChange={(event=>{setUser({...user, email: event.target.value})})} />

                    <label for="inputPassword5" className="form-label text-vital-white">Password</label>
                    <input type="password" id="inputPassword5" className="form-control mb-4" aria-describedby="passwordHelpBlock" onChange={(event) =>{setUser({...user, password: event.target.value})}} />

                    <button className="btn btn-vital-orange mb-2 w-100 text-vital-white" onClick={addUser}>Sign in </button>

                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label className="form-check-label mb-4 text-vital-white" for="flexCheckDefault">
                            Forgot Password
                        </label>
                    </div>  

                    





                </div>
            </div>
        </div>
        </div>
    )
}

