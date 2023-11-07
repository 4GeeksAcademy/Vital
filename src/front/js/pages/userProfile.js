import React from 'react'
import "../../../front/styles/user-profile.css"

export const UserProfile = () => {
  return (
    <div className='container bg-vital-gray'>
      <div className='card bg-vital-black w-50 my-2'>
        <div className='card-body'>
          <div className='top-car border-bottom-vital-white d-flex flex-row'>
            <div className=''>
              <img src='https://avatars.githubusercontent.com/u/136831607?v=4' className="profile-image rounded-circle" alt='Profile photo of user' />
            </div>
            <div className='d-flex justify-content-between px-3'>
              <div className='info-container'>
                <h2 className='fs-5 fw-bold text-vital-orange'>Carlos Corona</h2>
                <p className='text-vital-white'>Soy un disenador grafico estudiando programacion. Me apasiona la tecnologia y la gastronomia. Me gusta mucho viajar.</p>
              </div>
              <div className='icon-container ps-1'>
                <i className="fa-regular fa-pen-to-square text-vital-orange fs-5" ></i>
              </div>
            </div>
          </div>
          <hr className='text-vital-orange'size='3px'/>
          <div className='mt-4'>
            <div className='row'>
              <h2 className='col fs-6 fw-bold text-vital-white text-start'>Username</h2>
              <p className='col fs-6 text-vital-white text-end'>carloscorona</p>
            </div>
            <div className='row'>
              <h2 className='col fs-6 fw-bold text-vital-white text-start'>Name</h2>
              <p className='col fs-6 text-vital-white text-end'>Carlos</p>
            </div>
            <div className='row'>
              <h2 className='col fs-6 fw-bold text-vital-white text-start'>Last name</h2>
              <p className='col fs-6 text-vital-white text-end'>Corona</p>
            </div>
            <div className='row'>
              <h2 className='col fs-6 fw-bold text-vital-white text-start'>Email</h2>
              <p className='col fs-6 text-vital-white text-end'>carlos@vital.com</p>
            </div>
            <div className='row'>
              <h2 className='col fs-6 fw-bold text-vital-white text-start'>Phone</h2>
              <p className='col fs-6 text-vital-white text-end'>+58 414 1234567</p>
            </div>
            <div className='row'>
              <h2 className='col fs-6 fw-bold text-vital-white text-start'>Hobbies</h2>
              <p className='col fs-6 text-vital-white text-end'>Patinar, comer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
