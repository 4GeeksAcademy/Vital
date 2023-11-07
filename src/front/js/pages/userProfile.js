import React from 'react'
import "../../../front/styles/user-profile.css"

export const UserProfile = () => {
  return (
    <div className='container bg-vital-gray'>
      <div className='card bg-vital-black w-75 my-2'>
        <div className='card-body'>
          <div className='d-flex flex-row'>
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
          <div className='PARTE-INFERIOR'></div>
        </div>
      </div>
    </div>
  )
}
