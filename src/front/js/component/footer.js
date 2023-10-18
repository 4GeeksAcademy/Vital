import React from "react";
import Logo from "../../img/logo-vital.png";

export const Footer = () => (
  <footer className="text-white text-center text-lg-start bg-vital-gray">
    <div className="container pt-4">
      <div className="row d-flex justify-content-between pt-4">
        <div className="col-3">
          <img
            src={Logo}
            alt="logo-vital"
            border="0"
            style={{ height: "50px" }}
          />
        </div>
        <div className="d-flex mx-auto justify-content-end col-9">
          <input
            type="email"
            className="rounded-pill col-6 me-2 ps-5"
            placeholder="Enter your email to get the latest news..."
          />
          <button
            className="btn btn-vital-orange text-vital-white rounded-pill px-4"
            type="submit"
          >
            Subscribe
          </button>
        </div>
      </div>
      <hr class="hr text-vital-orange border-3 mt-5" />
      <div className="d-flex justify-content-between col-">
        <div>
          <h5 className="text-uppercase mb-4">Column One</h5>
          <ul>
            <li className="mb-2">Twenty One</li>
            <li className="mb-2">Twenty Two</li>
            <li className="mb-2">Twenty Three</li>
            <li className="mb-2">Twenty Four</li>
          </ul>
        </div>
        <div>
          <h5 className="text-uppercase mb-4">Column One</h5>
          <ul>
            <li className="mb-2">Twenty One</li>
            <li className="mb-2">Twenty Two</li>
            <li className="mb-2">Twenty Three</li>
            <li className="mb-2">Twenty Four</li>
          </ul>
        </div>
        <div>
          <h5 className="text-uppercase mb-4">Column One</h5>
          <ul>
            <li className="mb-2">Twenty One</li>
            <li className="mb-2">Twenty Two</li>
            <li className="mb-2">Twenty Three</li>
            <li className="mb-2">Twenty Four</li>
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
            <i className="fab fa-google-plus-g "></i>
          </a>
        </div>
      </div>
      <hr class="hr text-vital-orange border-3 mt-5" />
    </div>
    <div className="text-center p-3">
      © 2023 Copyright:{" "}
      <a className="text-white" href="#">
        Vital.com
      </a>
    </div>
  </footer>
);
