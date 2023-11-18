import React, { useContext, useEffect, useState } from 'react'
import "../../../front/styles/user-profile.css"
import { Context } from '../store/appContext'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"

export const UserProfile = () => {
  const { store, actions } = useContext(Context)
  const navigate = useNavigate()
  const [userInput, setUserInput] = useState({
    username: store.user.username || '',
    name: store.user.name || '',
    lastname: store.user.lastname || '',
    description: store.profile?.description || '',
    email: store.user.email || '',
    phone: store.profile?.phone || '',
    jobies: store.profile?.jobies || ''
  })
  const user = store.user
  const profile = store.profile

  useEffect(() => {
    const profileLocal = JSON.parse(localStorage.getItem('profile'))
    !user && !profileLocal && navigate('/login')
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
    , [])

  const updateUser = async () => {

   
      const isGood = await actions.updateUser(userInput)
      if (isGood) {  
        setUserInput({
          username: "",
          name: "",
          lastname: "",
          description: "",
          email: "",
          phone: "",
          jobies: ""
        })
      }
      else {
        alert('Something went wrong')
    }
  }



    console.log(profile)
    return (
      <>
        {
          profile && user &&
          <div className='container d-flex justify-content-center bg-vital-gray'>
            <div className='card bg-vital-black w-50 my-2'>
              <div className='card-body'>
                <div className='top-card position-relative border-bottom border-vital-orange d-flex flex-row'>
                  <div className=''>
                    <img src='https://avatars.githubusercontent.com/u/136831607?v=4' className="profile-image rounded-circle" alt='Profile photo of user' />
                  </div>
                  <div className='d-flex justify-content-between px-3'>
                    <div className='info-container'>
                      <h2 className='fs-5 fw-bold text-vital-orange'>{`${user.name} ${user.lastname}`}</h2>
                      <p className='text-vital-white'>{profile.description}</p>
                    </div>
                  </div>
                  <i className="edit-icon fa-regular fa-pen-to-square text-vital-orange fs-5" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
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
                        <input type="text" className="form-control bg-vital-gray text-vital-white" onChange={e => setUserInput({
                          ...userInput,
                          username: e.target.value
                        })} value={userInput.username} />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="recipient-name" className="col-form-label text-vital-white">Name</label>
                        <input type="text" className="form-control bg-vital-gray text-vital-white" onChange={e => setUserInput({
                          ...userInput,
                          name: e.target.value
                        })} value={userInput.name} />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="recipient-name" className="col-form-label text-vital-white">Last name</label>
                        <input type="text" className="form-control bg-vital-gray text-vital-white" onChange={e => setUserInput({
                          ...userInput,
                          lastname: e.target.value
                        })} value={userInput.lastname} />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="recipient-name" className="col-form-label text-vital-white">description</label>
                        <input type="text" className="form-control bg-vital-gray text-vital-white" onChange={e => setUserInput({
                          ...userInput,
                          description: e.target.value
                        })} value={userInput.description} />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="message-text" className="col-form-label text-vital-white">Email</label>
                        <input type="text" className="form-control bg-vital-gray text-vital-white" onChange={e => setUserInput({
                          ...userInput,
                          email: e.target.value
                        })} value={userInput.email} />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="message-text" className="col-form-label text-vital-white">Phone</label>
                        <input type="text" className="form-control bg-vital-gray text-vital-white" onChange={e => setUserInput({
                          ...userInput,
                          phone: e.target.value
                        })} value={userInput.phone} />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="message-text" className="col-form-label text-vital-white">Hobbies</label>
                        <input type="text" className="form-control bg-vital-gray text-vital-white" onChange={e => setUserInput({
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
      </>
    )
  }
