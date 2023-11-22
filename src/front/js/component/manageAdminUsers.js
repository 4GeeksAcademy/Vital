import React, {useContext} from "react";
import Pagination from "./pagination/pagination";
import { Context } from "../store/appContext";

const ManageAdminUsers = (props) => {
    const {store, actions} = useContext(Context);


    return (
        <>
        <h1 className="h2 text-vital-orange">Manage Admin User</h1>
                        <p className="text-vital-white">
                            Page to manage admin users
                        </p>                        
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
                                                        <th scope="col" />
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {   store.admins &&
                                                        store.admins.map((admin, index) => {
                                                            console.log(admin)
                                                            return (
                                                                <tr key={index}>
                                                                    <th scope="row">{admin.user.username}</th>
                                                                    <td>{admin.user.email}</td>
                                                                    <td>{admin.user.is_active}</td>
                                                                    <td>{Date()}</td>                                                                    
                                                                    <td>
                                                                        <span href="#" className="btn btn-sm text-vital-white btn-vital-orange rounded-pill">
                                                                            View
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
                         
        </>
    )
}

export default ManageAdminUsers;