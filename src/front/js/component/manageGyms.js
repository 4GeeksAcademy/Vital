import React, { useContext, useEffect, useState } from "react";
import Pagination from "./pagination/pagination";
import { Context } from "../store/appContext";
const ManageGyms = () => {
    const { store, actions } = useContext(Context);
    const [gymData, setGymData] = useState({
        name: "",
        email: "",
        address: "",
        latitude: "",
        longitude: "",
        phone: "",
    })

    useEffect(() => {
        actions.getData()
    }, [store.gyms])
 //26.269592486566175, -81.7530943755124
    const addGym = async () => {
        if (gymData.name == "" || gymData.email == "" || gymData.address == "" || gymData.latitude == "" || gymData.longitude == "" || gymData.phone == "" || gymData.description == "") {
            alert("Please fill all the fields")
            return
        }
        const isTrue = actions.addGym(gymData)
        if (isTrue) {
            alert("Gym was added succesfully")
        setGymData({
            name: "",
            description: "",
            email: "",
            address: "",
            latitude: "",
            longitude: "",
            phone: "",
        })

    }
    }

    //name, email, address, latitude, longitude, description, phone, image
    return (
        <>
            <h1 className="h2 text-vital-orange">Manage Gyms</h1>
            <p className="text-vital-white">
                Page to manage admin gyms
            </p>
            <div className="col-3 m-auto mb-5 d-flex justify-content-center">
                <button
                    type="button"
                    className="btn btn-vital-orange text-vital-white" data-bs-toggle="modal" data-bs-target="#exampleModal"
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
                                            <th scope="col">Description</th>
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
                                                        <td>Location</td>
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
            <div className="modal fade bg-vital-gray" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content bg-black">
                        <div className="modal-header border-bottom border-vital-orange">
                            <h1 className="modal-title fs-5 text-vital-orange" id="exampleModalLabel">Add Gym</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body bg-vital-black">
                            <form>
                                <div className="mb-3">
                                    <label for="recipient-name" className="col-form-label text-vital-white">Name</label>
                                    <input type="text" className="form-control" value={gymData.name} onChange={
                                        (e) => setGymData({ ...gymData, name: e.target.value })
                                    } />
                                </div>
                                <div className="mb-3">
                                    <label for="recipient-name" className="col-form-label text-vital-white">Description</label>
                                    <input type="text" className="form-control" value={gymData.description} onChange={
                                        (e) => setGymData({ ...gymData, description: e.target.value })
                                    } />
                                </div>
                                <div className="mb-3">
                                    <label for="message-text" className="col-form-label text-vital-white">Email:</label>
                                    <input type="text" className="form-control" value={gymData.email} onChange={
                                        (e) => setGymData({ ...gymData, email: e.target.value })
                                    } />
                                </div>
                                <div className="mb-3">
                                    <label for="message-text" className="col-form-label text-vital-white">Address:</label>
                                    <input type="text" className="form-control" value={gymData.address} onChange={
                                        (e) => setGymData({ ...gymData, address: e.target.value })
                                    } />
                                </div>
                                <div className="mb-3">
                                    <label for="message-text" className="col-form-label text-vital-white">Phone:</label>
                                    <input type="text" className="form-control" value={gymData.phone} onChange={
                                        (e) => setGymData({ ...gymData, phone: e.target.value })
                                    } />
                                </div>
                                <div className="mb-3 d-flex">
                                    <div className="d-flex flex-column justify-content-around">
                                        <label for="message-text" className="col-form-label text-vital-white">Longitud:</label>
                                        <input type="text" className="w-75 form-control" value={gymData.longitude} onChange={
                                            (e) => setGymData({ ...gymData, longitude: e.target.value })
                                        } />
                                    </div>
                                    <div className="d-flex flex-column justify-content-around">
                                        <label for="message-text" className="col-form-label text-vital-white">Latitude:</label>
                                        <input type="text" className="w-75 form-control" value={gymData.latitude} onChange={
                                            (e) => setGymData({ ...gymData, latitude: e.target.value })
                                        } />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer border-top border-vital-orange">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-vital-orange text-vital-white" onClick={addGym}>Add Gym</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


// name = body.get("name", None)
// email = body.get("email", None)
// address = body.get("address", None)
// latitude = body.get("latitude", None)
// longitude = body.get("longitude", None)
// description = body.get("description", None)
// phone = body.get("phone", None)
// image = body.get("image", None)

export default ManageGyms;