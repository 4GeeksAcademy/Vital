import React from "react";
import "../../styles/admin-panel.css"
import { useState, useEffect, useContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config"
import Dashboard from "../component/dashboard";
import ManageUser from "../component/manageUser";
import ManageAdminUsers from "../component/manageAdminUsers";
import ManageGyms from "../component/manageGyms";
import { Context } from "../store/appContext";


const AdminPanel = () => {
   const [products, setProducts] = useState([])
   const { store, actions } = useContext(Context);
   const [menu, setMenu] = useState({
    dashboard: true,
    manageUser: false,
    manageAdminUsers: false,
    manageGyms: false,
    manageNewsletter: false,
    integrations: false
   })

    useEffect(() => {
        // actions.getProducts();
    
        const productsRef = collection(db, "products")
        console.log(productsRef);
    
        getDocs(productsRef)
          .then((resp) => {
            const products = resp.docs.map((doc) => {
              return { ...doc.data(), id: doc.id }
            })              
            setProducts(products)  
            
          })          
            actions.getData();                
    
      }, []);

    return (
        <>
            <nav className="navbar navbar-dark bg-dark p-3">
                <div className="d-flex col-12 col-md-3 col-lg-2 mb-2 mb-lg-0 flex-wrap flex-md-nowrap justify-content-between">
                    <a className="navbar-brand" href="#">
                        Admin Dashboard
                    </a>
                    <button
                        className="navbar-toggler d-md-none collapsed mb-3"
                        type="button"
                        data-toggle="collapse"
                        data-target="#sidebar"
                        aria-controls="sidebar"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                </div>
                <div className="col-12 col-md-4 col-lg-2">
                    <input
                        className="form-control form-control-dark"
                        type="text"
                        placeholder="Search"
                        aria-label="Search"
                    />
                </div>
                <div className="col-12 col-md-5 col-lg-8 d-flex align-items-center justify-content-md-end mt-3 mt-md-0">
                    <div className="btn-group dropstart ">
                        <span className="btn btn-secondary dropdown-toggle bg-vital-orange" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Hello, Admin
                        </span>

                        <ul className="dropdown-menu bg-dark">
                            <li><a className="dropdown-item" href="#">change password</a></li>
                            <li><a className="dropdown-item" href="#">Logout</a></li>                            
                        </ul>
                    </div>

                </div>
            </nav>
            <div className="container-fluid">
                <div className="row bg-vital-gray">
                    <nav
                        id="sidebar"
                        className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse bg-vital-black"
                    >
                        <div className="position-sticky bg-vital-black">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" onClick={() => setMenu({
                                        dashboard: true,
                                        manageUser: false,
                                        manageAdminUsers: false,
                                        manageGyms: false,
                                        manageNewsletter: false,
                                        integrations: false
                                    })}>                                        
                                        <span className="ml-2">Dashboard</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={()=> setMenu({
                                        dashboard: false,
                                        manageUser: true,
                                        manageAdminUsers: false,
                                        manageGyms: false,
                                        manageNewsletter: false,
                                        integrations: false
                                    })}>
                                       
                                        <span className="ml-2">Manage User</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={() => setMenu({
                                        dashboard: false,
                                        manageUser: false,
                                        manageAdminUsers: true,
                                        manageGyms: false,
                                        manageNewsletter: false,
                                        integrations: false
                                    
                                    })}>
                                        
                                        <span className="ml-2">Manage Admin Users</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={() => setMenu({
                                        dashboard: false,
                                        manageUser: false,
                                        manageAdminUsers: false,
                                        manageGyms: true,
                                        manageNewsletter: false,
                                        integrations: false
                                    
                                    })}>
                                        
                                        <span className="ml-2">Manage Gyms</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        
                                        <span className="ml-2">Manage Newsletter subcriptions</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                       
                                        <span className="ml-2">Promotions</span>
                                    </a>
                                </li>  
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                       
                                        <span className="ml-2">Integrations Store</span>
                                    </a>
                                </li>                            
                            </ul>
                        </div>
                    </nav>
                    <main className="col-md-9 ml-sm-auto col-lg-10 px-md-4 py-4">    
                    {
                        menu.dashboard ? <Dashboard products={products}/> : menu.manageUser ? <ManageUser products={products}/> : menu.manageAdminUsers ? <ManageAdminUsers products={products}/>
                        : menu.manageGyms ? <ManageGyms products={products}/> : <Dashboard products={products}/>                  
                    }                   
                                            
                    </main>
                </div>
            </div>
        </>

    );
}

export default AdminPanel;