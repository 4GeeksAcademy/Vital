import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Pagination from "./pagination/pagination";

// "id": self.id,
// "order": self.order,
// "date": self.date,
// "amount": self.amount,
// "comission": self.comission

const IntegrationsStore = () => {
    const {store, actions} = useContext(Context);

    useEffect(() => {        
        actions.getTransactions();
    }, []);

    return (
        <>
        {
            store.transactions && 
            (
                <>
        <h1 className="h2 text-vital-orange">View Transactions</h1>
                        <p className="text-vital-white">
                            Page to manage Users
                        </p>                        
                        <div className="row d-flex justify-content-center">
                            <div className="col-12 col-xl-8 mb-4 mb-lg-0">
                                <div className="card bg-vital-black">
                                    <h5 className="card-header text-vital-orange">Table Transactions</h5>
                                    <div className="card-body bg-dark">
                                        <div className="table-responsive">
                                            <table className="table table-dark table-striped">
                                                <thead>
                                                    <tr >
                                                        <th scope="col">Id</th>
                                                        <th scope="col">Order</th>
                                                        <th scope="col">Date</th>
                                                        <th scope="col">Amount</th>  
                                                        <th scope="col">Commission</th>                                                      
                                                        <th scope="col" />
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
                                                                    <td>
                                                                        <span className="btn btn-sm text-vital-white btn-vital-orange">
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
                                    </div>
                                    <Pagination />   
                                </div>
                            </div>                                                    
                        </div>  
                        </>
            )
                                                }         
        </>

    )
}

export default IntegrationsStore;