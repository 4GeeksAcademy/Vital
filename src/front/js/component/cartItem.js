import React, { useContext, useEffect, useState, useMemo } from "react";
import { Context } from "../store/appContext";
// import { TrashOutline } from "react-ionicons";

const CartItem = ({ title, price, image, id, quantity, deleteItem }) => {

    const { store, actions } = useContext(Context)

    const [quantityItem, setQuantityItem] = useState(quantity)

    const [total, setTotal] = useState(price * quantityItem)

    console.log({ quantity: quantity })

    useEffect(() => {
        setTotal(price * quantityItem)
        setQuantityItem(quantity)
        actions.calculateTotalCart()
    }, [])

    useEffect(() => {
        setTotal(price * quantityItem)
        actions.calculateTotalCart()
        console.log("cuando se cambia quantityItem")
    }, [quantityItem])

    const removeItemFromCart = () => {
        deleteItem(id)
    }

    const handleQuantity = (e) => {
        if (e.target.value > 1) {
            setQuantityItem(e.target.value)
            actions.setQuantity(id, e.target.value)
        } else {
            setQuantityItem(1)
        }
    }


    return (
        <div className="card shadow-none bg-vital-black mt-2">
            <div className="card-body">
                <div className="d-flex align-items-start border-bottom pb-3">
                    <div className="me-4">
                        <img src={image} style={{ width: "10rem", height: "10rem", objectFit: "cover" }} alt="" className="rounded" />
                    </div>
                    <div className="flex-grow-1 align-self-center overflow-hidden">
                        <div className="d-flex justify-content-between">
                            <h5 className="text-truncate nfont-size-18 text-vital-white"><a href="#" className="text-vital-orange">{title}</a></h5>
                            <i className="fa-solid fa-trash-can text-vital-orange" onClick={() => removeItemFromCart()} ></i>
                            {/* <TrashOutline
                            color={"#ff5300"}
                            style={{ cursor: "pointer" }}
                            onClick={() => removeItemFromCart()} /> */}
                        </div>
                    </div>
                </div>

                <div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="mt-3">
                                <p className="mb-2 text-vital-white">Price</p>
                                <h5 className="mb-0 mt-2 text-vital-white">
                                    <span className="me-2"></span>${price}
                                </h5>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="mt-3">
                                <p className="text-vital-white mb-2">Quantity</p>
                                <div className="d-inline-flex">
                                    <input type="number" value={quantityItem} onChange={(e) => handleQuantity(e)} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="mt-3">
                                <p className="text-vital-white mb-2">Total</p>
                                <h5 className="text-vital-white">${total}</h5>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CartItem;