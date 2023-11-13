import React, { useContext, useState } from "react";
import Pagination from "./pagination/pagination";
import { Context } from "../store/appContext";
const Newsletters = () => {
    const { store, actions } = useContext(Context);
    const [selectedFile, setSelectedFile] = useState(null);
    const body_message = "<html><head></head><body><h1>Hi!<br>How are you?</h1><br>Here is the <a href='https://sample-service-name-iwws.onrender.com/'>link</a> you wanted.</p></body></html>";
    const subject = "Vital Fit Newsletter";

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
                onClick={() => actions.sendEmail(subject, body_message)}
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
                                            <th scope="col" />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {store.newsletter &&
                                            store.newsletter.map((item, index) => {
                                                console.log(item)
                                                return (
                                                    <tr key={index}>
                                                        <th scope="row">{item.email}</th>
                                                        <td>{item.is_active}</td>
                                                        <td>{Date()}</td>
                                                        <td>
                                                            <span href="#" className="btn btn-sm text-vital-white btn-vital-orange">
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

        </>
    )
}

export default Newsletters;