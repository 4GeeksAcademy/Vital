import React, { useState } from "react";
import "../../styles/register.css"


export const Register = () => {
    const [user,setUser] = useState( {
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",


    })
    return (
        <div className="bg-vital-black h-100 p-5">

        <div className="container bg-vital-gray  rounded-3">
            <div className="row">
                <div className="col-6 d-flex justify-content-center align-items-center bg-success text-light rounded-start-3 firstDiv"><h2><strong>Create your Account</strong></h2></div>
                <div className="col-6 ">
                    <h2 className="mb-4 mt-4 d-flex justify-content-center "><strong className= "text-vital-orange">Sign up</strong></h2>


                    <label for="inputPassword5" className="form-label text-vital-white">First Name</label>
                    <input type="string" value={user.firstname} id="inputPassword5" className="form-control mb-3" aria-describedby="passwordHelpBlock" onChange={(event)=>{setUser({...user, firstname: event.target.value})}} />

                    <label for="inputPassword5" className="form-label text-vital-white">Last Name</label>
                    <input type="string" value={user.lastname} id="inputPassword5" className="form-control mb-3" aria-describedby="passwordHelpBlock" onChange={(event)=>{setUser({...user, lastname: event.target.value})}} />

                    <label for="inputPassword5" className="form-label text-vital-white">Username</label>
                    <input type="string" id="inputPassword5" className="form-control mb-3" aria-describedby="passwordHelpBlock" onChange={(event)=>{setUser({...user, username: event.target.value})}} />

                    <label for="inputPassword5" className="form-label text-vital-white">Email</label>
                    <input type="string" id="inputPassword5" className="form-control mb-3" aria-describedby="passwordHelpBlock" onChange={(event=>{setUser({...user, email: event.target.value})})} />

                    <label for="inputPassword5" className="form-label text-vital-white">Password</label>
                    <input type="string" id="inputPassword5" className="form-control mb-4" aria-describedby="passwordHelpBlock" onChange={(event) =>{setUser({...user, password: event.target.value})}} />

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

