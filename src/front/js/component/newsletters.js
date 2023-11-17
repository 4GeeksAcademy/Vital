import React, { useContext, useState } from "react";
import Pagination from "./pagination/pagination";
import { Context } from "../store/appContext";
const Newsletters = () => {
    const { store, actions } = useContext(Context);
    const [selectedFile, setSelectedFile] = useState(null);
    const body_message = "<html><head></head><body><h1>Hi!<br>How are you?</h1><br>Here is the <a href='https://sample-service-name-iwws.onrender.com/'>link</a> you wanted.</p></body></html>";
    const subject = "Vital Fit Newsletter";

    const changeStatus = async (email) => {
        const response = await actions.changeNewsletterStatus(email)
        if (response) {
            actions.getNewsletter()   
        } else {
            alert("Something went wrong")
        }     
    }

    const sendEmail = async () => {
        const response = await actions.sendEmail(subject, body_message)
        if (response) {
            alert("Email sent")
        } else {
            alert("Something went wrong")
        }
    }


    console.log(store.newsletter)
    return (
        <>
            <h1 className="h2 text-vital-orange">Manage Newsletters</h1>
            <p className="text-vital-white">
                Page to manage admin newsletters
            </p>
            <div>
            <button
                className="btn btn-vital-orange text-vital-white rounded-pill px-4"
                type="submit"
                onClick={sendEmail}
            >Send Newsletter</button>            
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col-12 col-xl-8 mb-4 mb-lg-0">
                    <div className="card bg-vital-black">
                        <h5 className="card-header text-vital-orange">Newsletter Subscriptions</h5>
                        <div className="card-body bg-dark">
                            <div className="table-responsive">
                                <table className="table table-dark table-striped">
                                    <thead>
                                        <tr >
                                            <th scope="col">Email</th>
                                            <th scope="col">Status</th>                                   
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {store.newsletter &&
                                            store.newsletter.map((item, index) => {
                                                console.log(item)
                                                return (
                                                    <tr key={index}>
                                                        <th scope="row">{item.email}</th>
                                                        <td>{item.is_active ? <i className="fa-solid fa-check text-success" value="disable" style={{cursor: "pointer"}} onClick={() => changeStatus(item.email)}></i> : <i className="fa-solid fa-x text-danger" name="enable" style={{pointer: ""}} onClick={()=>changeStatus(item.email)}></i>}</td>
                                                        <td>{Date()}</td>
                                                        
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

export default Newsletters;