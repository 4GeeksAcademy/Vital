import React, {useContext} from "react";
import Pagination from "./pagination/pagination";
import { Context } from "../store/appContext";

const ManageUser = (props) => {
    const {store, actions} = useContext(Context);
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
                                                                        <span href="#" className="btn btn-sm text-vital-white btn-vital-orange">
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

export default ManageUser;