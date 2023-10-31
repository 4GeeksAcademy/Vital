import React from "react";

const AdminPanel = () => {
    return (
        <>
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">                            
                            <ul
                                className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                                id="menu"
                            >
                                <li className="nav-item">
                                    <a href="#" className="nav-link align-middle px-0">
                                        <i className="fs-4 bi-house" />{" "}
                                        <span className="ms-1 d-none d-sm-inline">Home</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#submenu1"
                                        data-bs-toggle="collapse"
                                        className="text-vite-white  nav-link px-0 align-middle"
                                    >
                                        <i className="fs-4 bi-speedometer2" />{" "}
                                        <span className="ms-1 d-none d-sm-inline">Dashboard</span>{" "}
                                    </a>
                                    <ul
                                        className="collapse nav flex-column ms-1"
                                        id="submenu1"
                                        data-bs-parent="#menu"
                                    >
                                        
                                        <li>
                                            <a href="#" className="text-vite-white  nav-link px-0">                                                
                                                <span className="d-none d-sm-inline">Manage User</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="nav-link px-0">                                                
                                                <span className="d-none d-sm-inline">Manage Admin User</span> 
                                            </a>
                                        </li>
                                        <li className="w-100 bg-vite-white">
                                            <a href="#" className="   nav-link px-0">                                                
                                                <span className="d-none d-sm-inline">Manage Gyms</span>
                                            </a>
                                        </li>                                        
                                        <li>
                                            <a href="#" className="text-vite-white  nav-link px-0">                                                
                                                <span className="d-none d-sm-inline">Manage User</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className=" text-vite-white nav-link px-0">
                                                
                                                <span className="d-none d-sm-inline">Manage Newsletter subscriptions</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#" className="nav-link px-0 align-middle">
                                        <i className="fs-4 bi-table" />
                                        <span className="text-vite-white ms-1 d-none d-sm-inline">Promotions</span>
                                    </a>
                                </li>
                            </ul>
                            <hr />
                            <div className="dropdown pb-4">
                                <a
                                    href="#"
                                    className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                                    id="dropdownUser1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <img
                                        src="https://github.com/mdo.png"
                                        alt="hugenerd"
                                        width={30}
                                        height={30}
                                        className="rounded-circle"
                                    />
                                    <span className="d-none d-sm-inline mx-1">loser</span>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            New project...
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Settings
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Profile
                                        </a>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Sign out
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col py-3">Content area...</div>
                </div>
            </div>

        </>


    );
}

export default AdminPanel;