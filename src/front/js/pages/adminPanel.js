import React from "react";
import "../../styles/admin-panel.css"
import { useState, useEffect, useContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config"
import Dashboard from "../component/dashboard";
import ManageUser from "../component/manageUser";
import ManageAdminUsers from "../component/manageAdminUsers";
import ManageGyms from "../component/manageGyms";
import Newsletters from "../component/newsletters";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import IntegrationsStore from "../component/integrationStore";
import { ToastContainer, toast } from 'react-toastify';
import { motion } from "framer-motion"

const AdminPanel = () => {
    const [products, setProducts] = useState([])
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()
    const [menu, setMenu] = useState({
        dashboard: true,
        manageUser: false,
        manageAdminUsers: false,
        manageGyms: false,
        manageNewsletter: false,
        integrations: false
    })
    useEffect(() => {
        // actions.getProducts();
        !store.token && navigate("/")
        console.log(store.username != "admin")
        if (store.username != "admin") {
            toast.warn('Just Admin user can Access to the Dashboard!', {
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
        }

    }, []);

    return (
        <>
        {
            store.username != "admin" && navigate("/")
        }
            <nav className="navbar navbar-dark bg-dark p-3">
                <div className="container ">

                    <div className="d-flex col-12 col-md-3 col-lg-2 mb-2 mb-lg-0 flex-wrap flex-md-nowrap justify-content-between">
                        <a className="navbar-brand" href="#">
                            Admin Dashboard
                        </a>
                        <button
                            className="navbar-toggler d-md-none collapsed mb-3 rounded-pill"
                            type="button"
                            data-toggle="collapse"
                            data-target="#sidebar"
                            aria-controls="sidebar"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon" />
                        </button>
                    </div>
                    <div className="col-12 col-md-4 col-lg-2">
                        <input
                            className="form-control form-control-dark rounded-pill"
                            type="text"
                            placeholder="Search"
                            aria-label="Search"
                        />
                    </div>
                    <div className="col-12 col-md-5 col-lg-8 d-flex align-items-center justify-content-md-end mt-3 mt-md-0">
                        <div className="btn-group dropstart ">
                            <span className="btn btn-secondary dropdown-toggle bg-vital-orange rounded-pill" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Hello, Admin
                            </span>

                            <ul className="dropdown-menu bg-dark">
                                <li><a className="dropdown-item" href="#">change password</a></li>
                                <li><a className="dropdown-item" href="#">Logout</a></li>
                            </ul>
                        </div>

                    </div>
                </div>
            </nav>
            <div className="container-fluid">
                <div className="row bg-vital-gray">
                    <nav
                        id="sidebar"
                        className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse bg-vital-black"
                    >
                        <div className="position-sticky bg-vital-black">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" onClick={() => setMenu({
                                        dashboard: true,
                                        manageUser: false,
                                        manageAdminUsers: false,
                                        manageGyms: false,
                                        manageNewsletter: false,
                                        integrations: false
                                    })}>
                                        <span className="ml-2">Dashboard</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={() => setMenu({
                                        dashboard: false,
                                        manageUser: true,
                                        manageAdminUsers: false,
                                        manageGyms: false,
                                        manageNewsletter: false,
                                        integrations: false
                                    })}>

                                        <span className="ml-2">Manage User</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={() => setMenu({
                                        dashboard: false,
                                        manageUser: false,
                                        manageAdminUsers: true,
                                        manageGyms: false,
                                        manageNewsletter: false,
                                        integrations: false

                                    })}>

                                        <span className="ml-2">Manage Admin Users</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={() => setMenu({
                                        dashboard: false,
                                        manageUser: false,
                                        manageAdminUsers: false,
                                        manageGyms: true,
                                        manageNewsletter: false,
                                        integrations: false

                                    })}>

                                        <span className="ml-2">Manage Gyms</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={() => setMenu({
                                        dashboard: false,
                                        manageUser: false,
                                        manageAdminUsers: false,
                                        manageGyms: false,
                                        manageNewsletter: true,
                                        integrations: false
                                    })
                                    }>

                                        <span className="ml-2">Manage Newsletter subcriptions</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={() => setMenu({
                                        dashboard: false,
                                        manageUser: false,
                                        manageAdminUsers: false,
                                        manageGyms: false,
                                        manageNewsletter: false,
                                        integrations: true
                                    })}>

                                        <span className="ml-2">Integrations Store</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <main className="col-md-9 ml-sm-auto col-lg-10 px-md-4 py-4">
                        {
                            menu.dashboard ? <Dashboard /> : menu.manageUser ? <ManageUser /> : menu.manageAdminUsers ? <ManageAdminUsers />
                                : menu.manageGyms ? <ManageGyms /> : menu.manageNewsletter ? <Newsletters /> : menu.integrations ? <IntegrationsStore /> : <Dashboard />
                        }

                    </main>
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
        </>

    );
}

export default AdminPanel;