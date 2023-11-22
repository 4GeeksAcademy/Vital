import React, {useContext, useRef, useState} from "react";
import Pagination from "./pagination/pagination";
import { Context } from "../store/appContext";
import { ToastContainer, toast } from 'react-toastify';

const ManageUser = (props) => {
    const {store, actions} = useContext(Context);
    const closeRef = useRef();
    const openRef = useRef();
    const [userEdit, setUserEdit] = useState({
        username: "",
        email: "",
        password: "",
    });

    const editUser = (id) => {
        const user = store.users.find((user) => user.id === id);
        setUserEdit({
            username: user.username,
            email: user.email,
            password: ""
        });        
    }

    const resetPassword = async () => {
        const isValid = await actions.resetPassword(userEdit);
        if (isValid){
            setUserEdit({
                username: "",
                email: "",
                password: "",
            });    
            toast.success('Password Reseted!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });        
            closeRef.current.click();
        }
    }


    return (
        <>
        <h1 className="h2 text-vital-orange">Manage User</h1>
                        <p className="text-vital-white">
                            Page to manage Users
                        </p>                        
                        <div className="row d-flex justify-content-center">
                            <div className="col-12 col-xl-8 mb-4 mb-lg-0">
                                <div className="card bg-vital-black">
                                    <h5 className="card-header text-vital-orange">Table Users</h5>
                                    <div className="card-body bg-dark">
                                        <div className="table-responsive">
                                            <table className="table table-dark table-striped">
                                                <thead>
                                                    <tr >
                                                        <th scope="col">Username</th>
                                                        <th scope="col">Email</th>
                                                        <th scope="col">Status</th>
                                                        <th scope="col">Date</th>                                                        
                                                        <th scope="col" />
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {   store.users &&
                                                        store.users.map((user, index) => {
                                                            console.log(user)
                                                            return (
                                                                <tr key={index}>
                                                                    <td>{user.username}</td>
                                                                    <td>{user.email}</td>
                                                                    <td>{user.is_active}</td>
                                                                    <td>{Date()}</td>                                                                    
                                                                    <td>
                                                                        <span className="btn btn-sm text-vital-white btn-vital-orange rounded-pill" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => editUser(user.id)}>
                                                                            Edit
                                                                        </span>
                                                                    </td>
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
                            <h1 className="modal-title fs-5 text-vital-orange" id="exampleModal2Label">Reset User Password</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body bg-vital-black">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label text-vital-white">Username</label>
                                    <input type="text" className="form-control" value={userEdit.username} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label text-vital-white">Email</label>
                                    <input type="text" className="form-control" value={userEdit.email}  />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message-text" className="col-form-label text-vital-white">Password:</label>
                                    <input type="text" className="form-control" value={userEdit.password} onChange={
                                        (e) => setUserEdit({ ...userEdit, password: e.target.value })
                                    } />
                                </div>   
                            </form>
                        </div>
                        <div className="modal-footer border-top border-vital-orange">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeRef}>Close</button>
                            <button type="button" className="btn btn-vital-orange text-vital-white" onClick={resetPassword}>Reset Password</button>
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

export default ManageUser;