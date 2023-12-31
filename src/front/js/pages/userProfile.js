import React, { useContext, useEffect, useState, useRef } from 'react'
import "../../../front/styles/user-profile.css"
import { Context } from '../store/appContext'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"
import { ToastContainer, toast } from 'react-toastify';

export const UserProfile = () => {
  const { store, actions } = useContext(Context)
  const navigate = useNavigate()
  const closeRefPsw = useRef();
  const [userInput, setUserInput] = useState({
    username: store.user?.username || '',
    name: store.user?.name || '',
    lastname: store.user?.lastname || '',
    description: store.profile?.description || '',
    email: store.user?.email || '',
    phone: store.profile?.phone || '',
    jobies: store.profile?.jobies || ''
  })
  const [passwordNew, setPasswordNew] = useState({
    oldPassword: "",
    passwordNew: "",
    passwordNew2: ""
  })
  const user = store.user
  const profile = store.profile

  useEffect(() => {
    actions.getUser()
    actions.getProfile()
    const profileLocal = store.profile || JSON.parse(localStorage.getItem('profile'))
    const userStorage = JSON.parse(localStorage.getItem('user'))
    console.log({ profile: profileLocal, user: userStorage })
    console.log(!userStorage || !profileLocal)
    if (!userStorage || !profileLocal) {
      navigate('/login')
    } else {
      store.profile = profileLocal
      setUserInput({
        username: store.user.username || '',
        name: store.user.name || '',
        lastname: store.user.lastname || '',
        description: store.profile.description || '',
        email: store.user.email || '',
        phone: store.profile.phone || '',
        jobies: store.profile.jobies || ''
      })
    }

  }
    , [])

  const changePassword = async () => {
    if (passwordNew.passwordNew === passwordNew.passwordNew2) {
      const isGood = await actions.changePassword(passwordNew.passwordNew, passwordNew.oldPassword)
      if (isGood) {
        toast.success('Password changed!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
        closeRefPsw.current.click();
      }
      else {
        toast.error("Something went wrong!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })

      }
    }
    else {
      toast.error("Passwords didn't match!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })

    }
  }

  const updateUser = async () => {


    const isGood = await actions.updateUser(userInput)
    if (isGood) {
      toast.success('User updated!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        icon: "🎉",
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
      })

    }
  }

  return (
    <>
      {
        profile && user &&
        <div className='container d-flex justify-content-center bg-vital-gray'>
          <div className='card bg-vital-black w-50 my-2'>
            <div className='card-body'>
              <div className='top-card position-relative border-bottom border-vital-orange d-flex flex-row'>
                <div className=''>
                  <img src='https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg?w=826' className="profile-image rounded-circle p-2" alt='Profile photo of user' />
                </div>
                <div className='d-flex justify-content-between px-3'>
                  <div className='info-container'>
                    <h2 className='fs-5 fw-bold text-vital-orange'>{`${user.name} ${user.lastname}`}</h2>
                    <p className='text-vital-white'>{profile.description}</p>
                  </div>
                </div>
                <i className="edit-icon fa-regular fa-pen-to-square text-vital-orange fs-5" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ cursor: "pointer" }}></i>
              </div>
              <div className='mt-4'>
                <div className='row'>
                  <h2 className='col fs-6 fw-bold text-vital-white text-start'>Username</h2>
                  <p className='col fs-6 text-vital-white text-end'>{user.username}</p>
                </div>
                <div className='row'>
                  <h2 className='col fs-6 fw-bold text-vital-white text-start'>Name</h2>
                  <p className='col fs-6 text-vital-white text-end'>{user.name}</p>
                </div>
                <div className='row'>
                  <h2 className='col fs-6 fw-bold text-vital-white text-start'>Last name</h2>
                  <p className='col fs-6 text-vital-white text-end'>{user.lastname}</p>
                </div>
                <div className='row'>
                  <h2 className='col fs-6 fw-bold text-vital-white text-start'>Email</h2>
                  <p className='col fs-6 text-vital-white text-end'>{user.email}</p>
                </div>
                <div className='row'>
                  <h2 className='col fs-6 fw-bold text-vital-white text-start'>Phone</h2>
                  <p className='col fs-6 text-vital-white text-end'>{profile.phone}</p>
                </div>
                <div className='row'>
                  <h2 className='col fs-6 fw-bold text-vital-white text-start'>Hobbies</h2>
                  <p className='col fs-6 text-vital-white text-end'>{profile.jobies}</p>
                </div>
                <span className='text-vital-orange fs-6 fw-bold' data-bs-toggle="modal" data-bs-target="#exampleModal2" style={{ cursor: "pointer" }}>Change Password</span>
              </div>
            </div>
          </div>
          {/* Modal */}
          <div className="modal fade bg-vital-gray" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content bg-black">
                <div className="modal-header border-bottom border-vital-orange">
                  <h1 className="modal-title fs-5 text-vital-orange fw-bold" id="exampleModalLabel">Edit your information</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body bg-vital-black">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="recipient-name" className="col-form-label text-vital-white">Username</label>
                      <input type="text" className="form-control bg-vital-gray text-vital-white rounded-pill" onChange={e => setUserInput({
                        ...userInput,
                        username: e.target.value
                      })} value={userInput.username} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="recipient-name" className="col-form-label text-vital-white">Name</label>
                      <input type="text" className="form-control bg-vital-gray text-vital-white rounded-pill" onChange={e => setUserInput({
                        ...userInput,
                        name: e.target.value
                      })} value={userInput.name} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="recipient-name" className="col-form-label text-vital-white">Last name</label>
                      <input type="text" className="form-control bg-vital-gray text-vital-white rounded-pill" onChange={e => setUserInput({
                        ...userInput,
                        lastname: e.target.value
                      })} value={userInput.lastname} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="recipient-name" className="col-form-label text-vital-white">description</label>
                      <input type="text" className="form-control bg-vital-gray text-vital-white rounded-pill" onChange={e => setUserInput({
                        ...userInput,
                        description: e.target.value
                      })} value={userInput.description} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="message-text" className="col-form-label text-vital-white">Email</label>
                      <input type="text" className="form-control bg-vital-gray text-vital-white rounded-pill" onChange={e => setUserInput({
                        ...userInput,
                        email: e.target.value
                      })} value={userInput.email} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="message-text" className="col-form-label text-vital-white">Phone</label>
                      <input type="text" className="form-control bg-vital-gray text-vital-white rounded-pill" onChange={e => setUserInput({
                        ...userInput,
                        phone: e.target.value
                      })} value={userInput.phone} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="message-text" className="col-form-label text-vital-white">Hobbies</label>
                      <input type="text" className="form-control bg-vital-gray text-vital-white rounded-pill" onChange={e => setUserInput({
                        ...userInput,
                        jobies: e.target.value
                      })} value={userInput.jobies} />
                    </div>
                  </form>
                </div>
                <div className="modal-footer border-top border-vital-orange">
                  <button type="button" className="btn btn-secondary rounded-pill" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-vital-orange rounded-pill text-vital-white" onClick={updateUser}>Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      }
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
      <div className="modal fade bg-vital-gray" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content bg-black">
            <div className="modal-header border-bottom border-vital-orange">
              <h1 className="modal-title fs-5 text-vital-orange" id="exampleModalLabel">Changed Password</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body bg-vital-black">
              <form>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label text-vital-white">Old Password</label>
                  <input type="password" className="form-control" value={passwordNew.oldPassword} onChange={
                    (e) => setPasswordNew({ ...passwordNew, oldPassword: e.target.value })
                  } />
                </div>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label text-vital-white">Password</label>
                  <input type="password" className="form-control" value={passwordNew.passwordNew} onChange={
                    (e) => setPasswordNew({ ...passwordNew, passwordNew: e.target.value })
                  } />
                </div>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label text-vital-white">Repeat Passwword</label>
                  <input type="password" className="form-control" value={passwordNew.passwordNew2} onChange={
                    (e) => setPasswordNew({ ...passwordNew, passwordNew2: e.target.value })
                  } />
                </div>

              </form>
            </div>
            <div className="modal-footer border-top border-vital-orange">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeRefPsw}>Close</button>
              <button type="button" className="btn btn-vital-orange text-vital-white" onClick={changePassword}>Change Password</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
