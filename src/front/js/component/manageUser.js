import React from "react";
import Pagination from "./pagination/pagination";

const ManageUser = (props) => {
    return (
        <>
        <h1 className="h2 text-vital-orange">Manage User</h1>
                        <p className="text-vital-white">
                            Page to manage Users
                        </p>                        
                        <div className="row d-flex justify-content-center">
                            <div className="col-12 col-xl-8 mb-4 mb-lg-0">
                                <div className="card bg-vital-black">
                                    <h5 className="card-header text-vital-orange">Latest transactions</h5>
                                    <div className="card-body bg-dark">
                                        <div className="table-responsive">
                                            <table className="table table-dark table-striped">
                                                <thead>
                                                    <tr >
                                                        <th scope="col">Username</th>
                                                        <th scope="col">Email</th>
                                                        <th scope="col">Address</th>
                                                        <th scope="col">Date</th>
                                                        <th scope="col">Status</th>
                                                        <th scope="col" />
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {   props.products &&
                                                        props.products.map((product, index) => {
                                                            console.log(product)
                                                            return (
                                                                <tr key={index}>
                                                                    <th scope="row">{product.id}</th>
                                                                    <td>{product.title}</td>
                                                                    <td>{product.category}</td>
                                                                    <td>{product.price}</td>
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