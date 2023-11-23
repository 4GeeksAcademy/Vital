import React, { useContext, useEffect, useRef, useState } from "react";
import Pagination from "./pagination/pagination";
import { Context } from "../store/appContext";
import { ToastContainer, toast } from 'react-toastify';

const ManageAdminUsers = () => {
    const { store, actions } = useContext(Context);
    const closeRef = useRef();    
    const [editAdmin, setEditAdmin] = useState({
        name: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        checkPassword: ""
    });

    useEffect(() => {
        actions.getAdmins();
    }, []);

    const addAdmin = async () => {    
        
        if (editAdmin.password != editAdmin.checkPassword){
            toast.error('Passwords do not match!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        } else {            
        const isValid = await actions.createAdmin(editAdmin);        
        if (isValid) {
            toast.success('Admin added!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setEditAdmin({
                names: "",
                lastname: "",
                username: "",
                email: "",
                password: "",
                checkPassword: ""
            });
            closeRef.current.click();
        } else {
            toast.error('Error adding Admin!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }  
    } 

    }

    return (
        <>
            <h1 className="h2 text-vital-orange">Manage Admin User</h1>
            <p className="text-vital-white">
                Page to manage admin users
            </p>
            <div className="col-3 m-auto mb-5 d-flex justify-content-center">
                <button
                    type="button"
                    className="btn btn-vital-orange text-vital-white rounded-pill" data-bs-toggle="modal" data-bs-target="#exampleModal"
                >
                    Add New Admin User
                </button>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col-12 col-xl-8 mb-4 mb-lg-0">
                    <div className="card bg-vital-black">
                        <h5 className="card-header text-vital-orange">Table Admin Users</h5>
                        <div className="card-body bg-dark">
                            <div className="table-responsive">
                                <table className="table table-dark table-striped">
                                    <thead>
                                        <tr >
                                            <th scope="col">Username</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {store.admins &&
                                            store.admins.map((admin, index) => {
                                                console.log(admin)
                                                return (
                                                    <tr key={index}>
                                                        <th scope="row">{admin.user.username}</th>
                                                        <td>{admin.user.email}</td>
                                                        <td>{admin.user.is_active}</td>
                                                        <td>{Date()}</td>

                                                    </tr>
                                                )
                                            }
                                            )
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <Pagination />
                    </div>
                </div>
            </div>
            <div className="modal fade bg-vital-gray" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModal2Label" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content bg-black">
                        <div className="modal-header border-bottom border-vital-orange">
                            <h1 className="modal-title fs-5 text-vital-orange" id="exampleModal2Label">Add Admin User</h1>
                            <button type="button" className="btn-close rounded-pill" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body bg-vital-black">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label text-vital-white">Name</label>
                                    <input type="text" className="form-control rounded-pill"  onChange={
                                        (e) => {
                                            setEditAdmin({
                                                ...editAdmin,
                                                name: e.target.value
                                            })
                                        }
                                    } />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label text-vital-white">Lastname</label>
                                    <input type="text" className="form-control rounded-pill"  onChange={
                                        (e) => {
                                            setEditAdmin({
                                                ...editAdmin,
                                                lastname: e.target.value
                                            })
                                        }
                                    } />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label text-vital-white">Username</label>
                                    <input type="text" className="form-control rounded-pill"  onChange={
                                        (e) => {
                                            setEditAdmin({
                                                ...editAdmin,
                                                username: e.target.value
                                            })
                                        }
                                    } />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label text-vital-white">Email</label>
                                    <input type="text" className="form-control rounded-pill"  onChange={
                                        (e) => {
                                            setEditAdmin({
                                                ...editAdmin,
                                                email: e.target.value
                                            })
                                        }
                                    } />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message-text" className="col-form-label text-vital-white">Password:</label>
                                    <input type="password" className="form-control rounded-pill"  onChange={
                                        (e) => {
                                            setEditAdmin({
                                                ...editAdmin,
                                                password: e.target.value
                                            })
                                        }
                                    } />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message-text" className="col-form-label text-vital-white">Repeat Password:</label>
                                    <input type="password" className="form-control rounded-pill"  onChange={
                                        (e) => {
                                            setEditAdmin({
                                                ...editAdmin,
                                                checkPassword: e.target.value
                                            })
                                        }
                                    } />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer border-top border-vital-orange">
                            <button type="button" className="btn btn-secondary rounded-pill" data-bs-dismiss="modal" ref={closeRef}>Close</button>
                            <button type="button" className="btn btn-vital-orange text-vital-white rounded-pill" onClick={() => addAdmin()}>Submit</button>
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
        </>
    )
}

export default ManageAdminUsers;