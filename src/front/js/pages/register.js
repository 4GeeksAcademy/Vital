import React, { useContext, useState, useEffect } from "react";
import "../../styles/register.css"
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"
import { ToastContainer, toast } from 'react-toastify';


export const Register = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate()
    const [user, setUser] = useState({
        name: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
    })

    useEffect(() => {
        store.token && navigate("/")
    })

    const addUser = async () => {
        if (user.password == "") {
            toast.warn('Password can not be empty', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                icon: "😔",
            });
            return
        }
        const newUser = await actions.createUser(user)
        if (newUser) {
            toast.success('User was added successfully', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                icon: "👍",
            });
            navigate("/login")
        }
        else {
            toast.error('User was not created', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                icon: "😔",
            });
        }


    }

    return (
        <div className="bg-vital-black p-5">

            <div className="container  bg-vital-gray  rounded-3">
                <div className="row">
                    <div className="col-6 d-flex justify-content-center align-items-center  text-light rounded-start-3 imageRegister"><h2><strong>Create your Account</strong></h2></div>
                    <div className="col-6 ">
                        <h2 className="mb-4 mt-4 d-flex justify-content-center "><strong className="text-vital-orange">Sign up</strong></h2>


                        <label htmlFor="inputPassword5" className="form-label text-vital-white">Name</label>
                        <input type="text" value={user.name} id="inputPassword1" className="form-control mb-3 rounded-pill" aria-describedby="passwordHelpBlock" onChange={(event) => { setUser({ ...user, name: event.target.value }) }} />

                        <label htmlFor="inputPassword5" className="form-label text-vital-white">Last Name</label>
                        <input type="text" value={user.lastname} id="inputPassword2" className="form-control mb-3 rounded-pill" aria-describedby="passwordHelpBlock" onChange={(event) => { setUser({ ...user, lastname: event.target.value }) }} />

                        <label htmlFor="inputPassword5" className="form-label text-vital-white">Username</label>
                        <input type="text" id="inputPassword3" className="form-control mb-3 rounded-pill" aria-describedby="passwordHelpBlock" onChange={(event) => { setUser({ ...user, username: event.target.value }) }} />

                        <label htmlFor="inputPassword5" className="form-label text-vital-white">Email</label>
                        <input type="email" id="inputPassword4" className="form-control mb-3 rounded-pill" aria-describedby="passwordHelpBlock" onChange={(event => { setUser({ ...user, email: event.target.value }) })} />

                        <label htmlFor="inputPassword5" className="form-label text-vital-white">Password</label>
                        <input type="password" id="inputPassword5" className="form-control mb-4 rounded-pill" aria-describedby="passwordHelpBlock" onChange={(event) => { setUser({ ...user, password: event.target.value }) }} />

                        <button className="btn btn-vital-orange mb-2 w-100 text-vital-white rounded-pill" onClick={addUser}>Sign up </button>
                        
                        <ToastContainer
                            position="top-center"
                            autoClose={2000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={true}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="dark"

                        />






                    </div>
                </div>
            </div>
        </div>
    )
}

