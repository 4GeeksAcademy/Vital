import React, { useEffect, useState } from "react";

const CartItem = ({ name, price, url, id }) => {

    const [quantity, setQuantity] = useState(1)
    const [total, setTotal] = useState(0)

    const handleQuantity = (e) => {
        if(e.target.value > 1) {
            setQuantity(e.target.value)
        } else {
            setQuantity(1)
        }
    } 

    useEffect(() => {
        setTotal(price * quantity)
    }, [quantity])

    return (
        <div className="card shadow-none bg-vital-black mt-2">
            <div className="card-body">
                <div className="d-flex align-items-start border-bottom pb-3">
                    <div className="me-4">
                        <img src={url} style={{ width: "10rem", height: "10rem" }} alt="" className="rounded" />
                    </div>
                    <div className="flex-grow-1 align-self-center overflow-hidden">
                        <div>
                            <h5 className="text-truncate font-size-18 text-vital-white"><a href="#" className="text-vital-orange">{name}</a></h5>
                            <p className="text-vital-white mb-0">
                                <i className="bx bxs-star text-warning"></i>
                                <i className="bx bxs-star text-warning"></i>
                                <i className="bx bxs-star text-warning"></i>
                                <i className="bx bxs-star text-warning"></i>
                                <i className="bx bxs-star-half text-warning"></i>
                            </p>
                        </div>
                    </div>
                    <div className="flex-shrink-0 ms-2">
                        <ul className="list-inline mb-0 font-size-16">
                            <li className="list-inline-item">
                                <a href="#" className="text-vital-white px-1">
                                    <i className="mdi mdi-trash-can-outline"></i>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#" className="text-vital-white px-1">
                                    <i className="mdi mdi-heart-outline"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="mt-3">
                                <p className="mb-2 text-vital-white">Price</p>
                                <h5 className="mb-0 mt-2 text-vital-white"><span className="me-2"></span>{price}</h5>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="mt-3">
                                <p className="text-vital-white mb-2">Quantity</p>
                                <div className="d-inline-flex">
                                    <input type="number" value={quantity} onChange={(e) => handleQuantity(e)} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="mt-3">
                                <p className="text-vital-white mb-2">Total</p>
                                <h5 className="text-vital-white">{total}</h5>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CartItem;