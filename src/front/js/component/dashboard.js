import React from "react";

const Dashboard = (props) => {
    return (
        <>
        <h1 className="h2 text-vital-orange">Dashboard</h1>
                        <p className="text-vital-white">
                            Home page to manage the website
                        </p>
                        <div className="row my-4">
                            <div className="col-12 col-md-6 col-lg-3 mb-4 mb-lg-0">
                                <div className="card bg-vital-black">
                                    <h5 className="card-header text-vital-orange">Users</h5>
                                    <div className="card-body text-vital-white bg-dark">
                                        <h5 className="card-title">345k</h5>
                                        <p className="card-text">Feb 1 - Apr 1, United States</p>
                                        <p className="card-text text-success">
                                            10.2% increase since last month
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 mb-4 mb-lg-0 col-lg-3">
                                <div className="card bg-vital-black">
                                    <h5 className="card-header text-vital-orange">Gyms</h5>
                                    <div className="card-body text-vital-white bg-dark">
                                        <h5 className="card-title">4k</h5>
                                        <p className="card-text">Feb 1 - Apr 1, United States</p>
                                        <p className="card-text text-success">
                                            3.6% increase since last month
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 mb-4 mb-lg-0 col-lg-3">
                                <div className="card bg-vital-black">
                                    <h5 className="card-header text-vital-orange">Newsletter subcriptions</h5>
                                    <div className="card-body text-vital-white bg-dark">
                                        <h5 className="card-title">43</h5>
                                        <p className="card-text">Feb 1 - Apr 1, United States</p>
                                        <p className="card-text text-success">
                                            1.6% increase since last month
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 mb-4 mb-lg-0 col-lg-3">
                                <div className="card bg-vital-black">
                                    <h5 className="card-header text-vital-orange">Revenue</h5>
                                    <div className="card-body text-vital-white bg-dark">
                                        <h5 className="card-title">$2.4k</h5>
                                        <p className="card-text">Feb 1 - Apr 1, United States</p>
                                        <p className="card-text text-success">
                                            2.5% increase since last month
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
                                                        <th scope="col" />
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {   props.products &&
                                                        props.products.map((product, index) => {
                                                            console.log(product)
                                                            return (
                                                                <tr key={index}>
                                                                    <th scope="row">{product.id}</th>
                                                                    <td>{product.title}</td>
                                                                    <td>{product.category}</td>
                                                                    <td>{product.price}</td>
                                                                    <td>{Date()}</td>
                                                                    <td>
                                                                        <span href="#" className="btn btn-sm text-vital-white btn-vital-orange">
                                                                            View
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
                                        <span href="#" className="btn btn-block btn-secondary">
                                            View all
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-xl-4">
                                <div className="card bg-vital-black">
                                    <h5 className="card-header text-vital-orange">Last 6 months subcriptions</h5>
                                    <div className="card-body bg-dark">
                                        <div id="traffic-chart" />
                                    </div>
                                </div>
                            </div>
                        </div>  
        </>
    )
}

export default Dashboard;