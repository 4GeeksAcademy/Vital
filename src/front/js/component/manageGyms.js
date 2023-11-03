import React, { useContext } from "react";
import Pagination from "./pagination/pagination";
import { Context } from "../store/appContext";
const ManageGyms = () => {
    const { store, actions } = useContext(Context);
    //name, email, address, latitude, longitude, description, phone, image
    return (
        <>
            <h1 className="h2 text-vital-orange">Manage Gyms</h1>
            <p className="text-vital-white">
                Page to manage admin gyms
            </p>
            <div className="col-3 m-auto mb-5 d-flex justify-content-center">
            <button
                  className="btn btn-vital-orange text-vital-white rounded-pill"
                  type="submit"
                >
                  Add New Gym
                </button>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col-12 col-xl-8 mb-4 mb-lg-0">
                    <div className="card bg-vital-black">
                        <h5 className="card-header text-vital-orange">Latest transactions</h5>
                        <div className="card-body bg-dark">
                            <div className="table-responsive">
                                <table className="table table-dark table-striped">
                                    <thead>
                                        <tr >
                                            <th scope="col">Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Address</th>
                                            <th scope="col">Location</th>
                                            <th scope="col">Phone</th>
                                            <th scope="col">Status</th>
                                            <th scope="col" />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {store.gyms &&
                                            store.gyms.map((gym, index) => {
                                                console.log(gym)
                                                return (
                                                    <tr key={index}>
                                                        <th scope="row">{gym.name}</th>
                                                        <td>{gym.email}</td>
                                                        <td>{gym.address}</td>
                                                        <td>{location}</td>
                                                        <td>{gym.phone}</td>
                                                        <td>{gym.is_active}</td>
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

export default ManageGyms;