import React, {useContext, useState} from "react";
import Logo from "../../img/logo-vital.png";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { motion } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
import "../../styles/footer.css";

export const Footer = () => {
  const navigate = useNavigate();
  const {store, actions} = useContext(Context);
  const [newsletters, setNewsletters] = useState("");
  
  const handleNewsletter = async () => {
         
      const isSuccess = await actions.addNewsletter(newsletters);
      console.log(isSuccess)
      isSuccess ? 
      toast.success('Thanks for subscribed', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        icon: "🎉",
        theme: "dark",
    })
      : 
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
  };

  return (
  <footer className="text-white text-center text-lg-start bg-dark">
    <div className="container pt-4">
      <div className="d-flex pt-4">
        <div className="col-3 h-50 logo">
          <img
            src={Logo}
            className="img-fluid object-fit-cover d-none d-sm-block d-sm-block bg-dark d-md-block"
            alt="logo-vital"
            border="0"
          />
        </div>
        <div className="d-flex mx-auto justify-content-end col">
          <div className="email-wrap mx-5 col-5">
            <input
              type="email"
              className="rounded-pill col-6 w-100 h-100 ps-5"
              placeholder="Enter your email to get the latest news..."
              value={newsletters}
              onChange={(e) => setNewsletters(e.target.value)}
            />
            <i className="fa-regular fa-envelope fs-4 envelope"></i>
          </div>
          <motion.button
            className="btn btn-vital-orange text-vital-white rounded-pill px-4"
            type="submit"
            onClick={handleNewsletter}
            whileHover={{ scale: 1.2 }}
                  onHoverStart={e => {}}
                  onHoverEnd={e => {}}
                  whileTap={{ scale: 0.9 }}
          >
            Subscribe
          </motion.button>
        </div>
      </div>
      <hr className="hr text-vital-orange border-3 mt-5" />
      <div className="row justify-content-between">
        <div className="col-4">
        <h5 className="text-uppercase mb-4">About Us</h5>
						<p align="justify">
            Unleash your inner athlete and embrace a life of vitality with our all-encompassing fitness portal.
						</p>
						<p align="justify">
            Explore a treasure trove of exercise routines, personalized nutrition plans, and expert-guided wellness strategies to sculpt your physique, enhance your energy levels, and cultivate a holistic sense of well-being.
						</p>
        </div>        
        <div className="col-4">
          <h5 className="text-uppercase mb-4">Explore our site</h5>
          <ul>
            <li className="pointer mb-2" onClick={() => navigate("/exercises")}>Workout</li>
            <li className="pointer mb-2" onClick={()=> navigate("/mealPlans")}>Meal Recipes</li>
            <li className="pointer mb-2" onClick={() => navigate("/store")}>Fitness Store</li>
            <li className="pointer mb-2" onClick={()=> navigate("/admin-login")}>Intranet Access</li>
          </ul>
        </div>
        <div className="mt-4 d-flex">
          <a
            type="button"
            className="btn btn-floating text-vital-white  btn-lg rounded-circle mx-1"
          >
            <i className="fab fa-facebook-f "></i>
          </a>
          <a
            type="button"
            className="btn btn-floating text-vital-white  btn-lg rounded-circle mx-1"
          >
            <i className="fab fa-instagram "></i>
          </a>
          <a
            type="button"
            className="btn btn-floating text-vital-white  btn-lg rounded-circle mx-1"
          >
            <i className="fa-brands fa-x-twitter"></i>
          </a>
          <a
            type="button"
            className="btn btn-floating text-vital-white  btn-lg rounded-circle mx-1"
          >
            <i className="fab fa-google-plus-g"></i>
          </a>
        </div>
      </div>
      <hr className="hr text-vital-orange border-3 mt-5" />
    </div>
    <div className="text-center p-3">
      © 2023 Copyright:{" "}
      <a className="text-white" href="#">
        Vital.com
      </a>
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
  </footer>
)
  };
