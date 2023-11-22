import React, { useContext, useRef, useEffect, useState } from "react";
import Pagination from "./pagination/pagination";
import { Context } from "../store/appContext";
import { ToastContainer, toast } from 'react-toastify';
const ManageGyms = () => {
    const { store, actions } = useContext(Context);
    const [gymEdit, setGymEdit] = useState({
        name: "",
        email: "",
        address: "",
        latitude: "",
        longitude: "",
        phone: "",
    })
    const [gymData, setGymData] = useState({
        name: "",
        email: "",
        address: "",
        latitude: "",
        longitude: "",
        phone: "",
    })
    const closeRef = useRef();
    useEffect(() => {
        actions.getData()
    }, [gymEdit])
    //26.269592486566175, -81.7530943755124
    const editGym = (id) => {
        const gym = store.gyms.find(gym => gym.id == id)
        setGymEdit({
            name: gym.name,
            description: gym.description,
            email: gym.email,
            address: gym.address,
            latitude: gym.latitude,
            longitude: gym.longitude,
            phone: gym.phone,
        })
    }
    const addGym = async () => {

        if (gymData.name == "" || gymData.email == "" || gymData.address == "" || gymData.latitude == "" || gymData.longitude == "" || gymData.phone == "" || gymData.description == "") {
            
            toast.warn('Please fill all the fields', {
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
        const isTrue = actions.addGym(gymData)
        if (isTrue) {
            closeRef.current.click()            
            toast.success('Gym added successfully', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                icon: "🏆",
                theme: "dark",
            })
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

    const pushGymEdit = async () => {
        if (gymEdit.name == "" || gymEdit.email == "" || gymEdit.address == "" || gymEdit.latitude == "" || gymEdit.longitude == "" || gymEdit.phone == "" || gymEdit.description == "") {
            toast.warn('Please fill all the fields', {
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
        const isTrue = actions.editGym(gymEdit)
        if (isTrue) {
            closeRef.current.click()            
            toast.success('Gym edited successfully', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                icon: "😃",
                theme: "dark",
            })
            setGymEdit({
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

    const changeStatus = async (email) => {
        const status = confirm("Are you sure you want to change the status of this gym?")
        if (status) {
            const resp = actions.changeStatus(email)
            if (resp) {
                actions.getGyms()                
                toast.success('Status changed successfully', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    icon: "🔁",
                    theme: "dark",
                })
            }
            else {
                toast.error('Something went wrong!', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    icon: "😭",        
                });
            }
        }
        return
    }


    //name, email, address, latitude, longitude, description, phone, image
    //console.log(store.gyms)
    return (
        <>
            <h1 className="h2 text-vital-orange">Manage Gyms</h1>
            <p className="text-vital-white">
                Page to manage admin gyms
            </p>
            <div className="col-3 m-auto mb-5 d-flex justify-content-center">
                <button
                    type="button"
                    className="btn btn-vital-orange text-vital-white rounded-pill" data-bs-toggle="modal" data-bs-target="#exampleModal"
                >
                    Add New Gym
                </button>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col-12 col-xl-8 mb-4 mb-lg-0">
                    <div className="card bg-vital-black">
                        <h5 className="card-header text-vital-orange">Table Gyms</h5>
                        <div className="card-body bg-dark">
                            <div className="table-responsive">
                                <table className="table table-dark table-striped">
                                    <thead>
                                        <tr >
                                            <th scope="col">Name</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Address</th>
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
                                                        <td>{gym.description}</td>
                                                        <td>{gym.email}</td>
                                                        <td>{gym.address}</td>
                                                        <td>{gym.phone}</td>
                                                        <td>{gym.is_active ? <i className="fa-solid fa-check text-success" value="disable" style={{ cursor: "pointer" }} onClick={() => changeStatus(gym.email)}></i> : <i className="fa-solid fa-x text-danger" name="enable" style={{ pointer: "" }} onClick={() => changeStatus(gym.email)}></i>}</td>
                                                        <td>
                                                            <span className="btn btn-sm text-vital-white btn-vital-orange" data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={() => editGym(gym.id)}>
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
            <div className="modal fade bg-vital-gray" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content bg-black">
                        <div className="modal-header border-bottom border-vital-orange">
                            <h1 className="modal-title fs-5 text-vital-orange" id="exampleModalLabel">Add Gym</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body bg-vital-black">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label text-vital-white">Name</label>
                                    <input type="text" className="form-control rounded-pill" value={gymData.name} onChange={
                                        (e) => setGymData({ ...gymData, name: e.target.value })
                                    } />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label text-vital-white">Description</label>
                                    <input type="text" className="form-control rounded-pill" value={gymData.description} onChange={
                                        (e) => setGymData({ ...gymData, description: e.target.value })
                                    } />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message-text" className="col-form-label text-vital-white">Email:</label>
                                    <input type="text" className="form-control rounded-pill" value={gymData.email} onChange={
                                        (e) => setGymData({ ...gymData, email: e.target.value })
                                    } />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message-text" className="col-form-label text-vital-white">Address:</label>
                                    <input type="text" className="form-control rounded-pill" value={gymData.address} onChange={
                                        (e) => setGymData({ ...gymData, address: e.target.value })
                                    } />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message-text" className="col-form-label text-vital-white">Phone:</label>
                                    <input type="text" className="form-control rounded-pill" value={gymData.phone} onChange={
                                        (e) => setGymData({ ...gymData, phone: e.target.value })
                                    } />
                                </div>
                                <div className="mb-3 d-flex">
                                    <div className="d-flex flex-column justify-content-around">
                                        <label htmlFor="message-text" className="col-form-label text-vital-white">Longitud:</label>
                                        <input type="text" className="w-75 form-control" value={gymData.longitude} onChange={
                                            (e) => setGymData({ ...gymData, longitude: e.target.value })
                                        } />
                                    </div>
                                    <div className="d-flex flex-column justify-content-around">
                                        <label htmlFor="message-text" className="col-form-label text-vital-white">Latitude:</label>
                                        <input type="text" className="w-75 form-control" value={gymData.latitude} onChange={
                                            (e) => setGymData({ ...gymData, latitude: e.target.value })
                                        } />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer border-top border-vital-orange">
                            <button type="button" className="btn btn-secondary rounded-pill" data-bs-dismiss="modal" ref={closeRef}>Close</button>
                            <button type="button" className="btn btn-vital-orange text-vital-white rounded-pill" onClick={addGym}>Add Gym</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade bg-vital-gray" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModal2Label" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content bg-black">
                        <div className="modal-header border-bottom border-vital-orange">
                            <h1 className="modal-title fs-5 text-vital-orange" id="exampleModal2Label">Edit Gym</h1>
                            <button type="button" className="btn-close rounded-pill" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body bg-vital-black">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label text-vital-white">Name</label>
                                    <input type="text" className="form-control rounded-pill" value={gymEdit.name} onChange={
                                        (e) => setGymEdit({ ...gymEdit, name: e.target.value })
                                    } />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label text-vital-white">Description</label>
                                    <input type="text" className="form-control rounded-pill" value={gymEdit.description} onChange={
                                        (e) => setGymEdit({ ...gymEdit, description: e.target.value })
                                    } />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message-text" className="col-form-label text-vital-white">Email:</label>
                                    <input type="text" className="form-control rounded-pill" value={gymEdit.email} onChange={
                                        (e) => setGymEdit({ ...gymEdit, email: e.target.value })
                                    } />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message-text" className="col-form-label text-vital-white">Address:</label>
                                    <input type="text" className="form-control rounded-pill" value={gymEdit.address} onChange={
                                        (e) => setGymEdit({ ...gymEdit, address: e.target.value })
                                    } />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message-text" className="col-form-label text-vital-white">Phone:</label>
                                    <input type="text" className="form-control rounded-pill" value={gymEdit.phone} onChange={
                                        (e) => setGymEdit({ ...gymEdit, phone: e.target.value })
                                    } />
                                </div>
                                <div className="mb-3 d-flex">
                                    <div className="d-flex flex-column justify-content-around">
                                        <label htmlFor="message-text" className="col-form-label text-vital-white">Latitude:</label>
                                        <input type="text" className="w-75 form-control rounded-pill" value={gymEdit.latitude} onChange={
                                            (e) => setGymEdit({ ...gymEdit, latitude: e.target.value })
                                        } />
                                    </div>
                                    <div className="d-flex flex-column justify-content-around">
                                        <label htmlFor="message-text" className="col-form-label text-vital-white">Longitude:</label>
                                        <input type="text" className="w-75 form-control rounded-pill" value={gymEdit.longitude} onChange={
                                            (e) => setGymEdit({ ...gymEdit, longitude: e.target.value })
                                        } />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer border-top border-vital-orange">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeRef}>Close</button>
                            <button type="button" className="btn btn-vital-orange text-vital-white rounded-pill" onClick={pushGymEdit}>Edit Gym</button>
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


export default ManageGyms;