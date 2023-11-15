import React, { useContext, useEffect, useState } from "react";
import "../../styles/login.css"
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { ToastContainer, toast } from 'react-toastify';
import { motion } from "framer-motion"

export const Login = () => {
    const navigate = useNavigate()
    const { store, actions } = useContext(Context)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        store.token && navigate("/")
    }, [])

    const loginUser = async () => {
        actions.setUsername(username)
        if (username == "" || password == "") {
            alert("inputs can't be empty")
            return
        }
        const isValid = await actions.loginUser(username, password)
        if (isValid) {
            toast.success('Welocme Back!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            navigate("/")
        } else {
            toast.error('Login Failded!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setUsername("")
            setPassword("")
        }

    }

    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                ease: "linear",
                duration: 0.5,                
            }}>
            <div className="bg-vital-black p-5">
                <div className="container bg-vital-gray rounded-3">
                    <div className="row">
                        <div className="col-6 imageLogin "></div>
                        <div className="col-6 d-flex-column">
                            <h1 className="d-flex justify-content-center my-4 text-vital-orange">Hello welcome back!</h1>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label text-vital-white">Username</label>
                                <input type="string" value={username} className="form-control" id="exampleFormControlInput1" onChange={(event) => { setUsername(event.target.value) }} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label text-vital-white">Password</label>
                                <input type="password" value={password} className="form-control" id="exampleFormControlInput1" onChange={(event) => { setPassword(event.target.value) }} />
                            </div>
                            <div className="mb-3 mt-4">
                                <button className="btn btn-vital-orange text-vital-white w-100" onClick={loginUser}>Login</button>
                            </div>
                            <div className="d-flex-column justify-content-center mb-4">

                                <span className="d-flex justify-content-center text-vital-white">Don't have an account?</span>
                                <Link to='/register' className="d-flex justify-content-center text-vital-orange text-decoration-none">Create one here</Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
        </motion.main>
    )
}