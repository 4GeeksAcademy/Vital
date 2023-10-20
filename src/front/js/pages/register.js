import React from "react";
import "../../styles/register.css"

export const Register = () => {
    return (
        <div className="container   border rounded my-5">
            <div className="row">
                <div className="col-6 d-flex justify-content-center align-items-center bg-success text-light firstDiv"><h2><strong>Create your Account</strong></h2></div>
                <div className="col-6 ">
                    <h2 className="mb-4 mt-4 d-flex justify-content-center "><strong>Sign up</strong></h2>


                    <label for="inputPassword5" className="form-label ">First Name</label>
                    <input type="string" id="inputPassword5" className="form-control mb-3" aria-describedby="passwordHelpBlock" />

                    <label for="inputPassword5" className="form-label">Last Name</label>
                    <input type="string" id="inputPassword5" className="form-control mb-3" aria-describedby="passwordHelpBlock" />

                    <label for="inputPassword5" className="form-label">Username</label>
                    <input type="string" id="inputPassword5" className="form-control mb-3" aria-describedby="passwordHelpBlock" />

                    <label for="inputPassword5" className="form-label">Email</label>
                    <input type="string" id="inputPassword5" className="form-control mb-3" aria-describedby="passwordHelpBlock" />

                    <label for="inputPassword5" className="form-label">Password</label>
                    <input type="string" id="inputPassword5" className="form-control mb-4" aria-describedby="passwordHelpBlock" />

                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label className="form-check-label mb-4" for="flexCheckDefault">
                            Forgot Password
                        </label>
                    </div>  

                    





                </div>
            </div>
        </div>
    )
}