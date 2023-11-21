import React, {useContext, useEffect, useState} from "react";
import {Context} from "../store/appContext";
import Loading from "../component/loading/loading";
import { useNavigate } from "react-router-dom";
const Dashboard = (props) => {
    const {store, actions} = useContext(Context);
    const [loading, setLoading] = useState(true);
    const [revenue, setRevenue] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        let acum = 0;  
        const getData = async () => {
            const isDone = await actions.getData();
            if(!isDone) {
                setLoading(false);
            }
        }  
        getData();          
        store.transactions && store.transactions.map((transaction) => {
            console.log(transaction.comission);
            acum =+ parseFloat(transaction.comission)           
        });   
        setRevenue(acum);  
        store.revenue = acum;               
    }, [loading]);

    // useEffect(() => {
    //     actions.calculateRevenue();
    //    // setRevenue(store.revenue);
    // }, [store.transactions]);

    const usersQuantity = store.users && store.users.length;
    const gymsQuantity = store.gyms && store.gyms.length;
    const newsletterQuantity = store.newsletter && store.newsletter.length;    
    
    return (
        <>
        {
            loading ? <div className= "d-flex justify-content-center"><Loading /></div> : ( <>
        <h1 className="h2 text-vital-orange">Dashboard</h1>
                        <p className="text-vital-white">
                            Home page to manage the website
                        </p>
                        <div className="row my-4">
                            <div className="col-12 col-md-6 col-lg-3 mb-4 mb-lg-0">
                                <div className="card bg-vital-black">
                                    <h5 className="card-header text-vital-orange">Users</h5>
                                    <div className="card-body text-vital-white bg-dark">
                                        <h5 className="card-title">{usersQuantity}</h5>
                                        <p className="card-text">Nov 1 - current, United States</p>
                                        <p className="card-text text-success">
                                            {(usersQuantity - 0)*100}% increase since last month
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 mb-4 mb-lg-0 col-lg-3">
                                <div className="card bg-vital-black">
                                    <h5 className="card-header text-vital-orange">Gyms</h5>
                                    <div className="card-body text-vital-white bg-dark">
                                        <h5 className="card-title">{gymsQuantity}</h5>
                                        <p className="card-text">Nov 1 - current, United States</p>
                                        <p className="card-text text-success">
                                            {(gymsQuantity - 0)*100}% increase since last month
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 mb-4 mb-lg-0 col-lg-3">
                                <div className="card bg-vital-black">
                                    <h5 className="card-header text-vital-orange">Newsletter account</h5>
                                    <div className="card-body text-vital-white bg-dark">
                                        <h5 className="card-title">{newsletterQuantity}</h5>
                                        <p className="card-text">Nov 1 - current, United States</p>
                                        <p className="card-text text-success">
                                            {(newsletterQuantity - 0)*100}% increase since last month
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 mb-4 mb-lg-0 col-lg-3">
                                <div className="card bg-vital-black">
                                    <h5 className="card-header text-vital-orange">Revenue</h5>
                                    <div className="card-body text-vital-white bg-dark">
                                        <h5 className="card-title">{revenue.toFixed(2)}</h5>
                                        <p className="card-text">Nov 1 - current, United States</p>
                                        <p className="card-text text-success">
                                            {(revenue.toFixed(2) - 0)*100}% increase since last month
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-xl-8 mb-4 mb-lg-0">
                                <div className="card bg-vital-black">
                                    <h5 className="card-header text-vital-orange">Latest transactions</h5>
                                    <div className="card-body bg-dark">
                                        <div className="table-responsive">
                                            <table className="table table-dark table-striped">
                                                <thead>
                                                    <tr >
                                                        <th scope="col">Order</th>
                                                        <th scope="col">Product</th>
                                                        <th scope="col">Customer</th>
                                                        <th scope="col">Total</th>
                                                        <th scope="col">Date</th>                                                        
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {   store.transactions &&
                                                        store.transactions.map((transaction, index) => {                                                            
                                                            return (
                                                                <tr key={index}>
                                                                    <td>{transaction.id}</td>
                                                                    <td>{transaction.order}</td>
                                                                    <td>{transaction.date}</td>
                                                                    <td>{transaction.amount}</td>
                                                                    <td>{transaction.comission.toFixed(2)}</td>
                                                                    <td>{Date()}</td>                                                                   
                                                                
                                                                </tr>
                                                            )
                                                        }
                                                        )
                                                    }                                                    
                                                                                                 
                                                </tbody>
                                            </table>
                                        </div>
                                        {/* <span href="#" className="btn btn-block btn-secondary rounded-pill">
                                            View all
                                        </span> */}
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-xl-4">
                                <div className="card bg-vital-black">
                                    <h5 className="card-header text-vital-orange">Last 6 months subcriptions</h5>
                                    <div className="card-body bg-dark">
                                    <div className="table-responsive">
                                            <table className="table table-dark table-striped">
                                                <thead>
                                                    <tr >
                                                        <th scope="col">username</th>
                                                        <th scope="col">Email</th>                                                                                                               
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {   store.transactions &&
                                                        store.users.map((user, index) => {                                                            
                                                            return (
                                                                <tr key={index}>
                                                                    <td>{user.username}</td>
                                                                    <td>{user.email}</td>                                                                      
                                                                </tr>
                                                            )
                                                        }
                                                        )
                                                    }                                            
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>  
    </>)
        }
        </>
    )
}

export default Dashboard;