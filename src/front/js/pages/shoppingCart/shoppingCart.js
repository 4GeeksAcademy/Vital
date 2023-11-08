import React, { useContext, useEffect, useState } from "react";
import "./shoppingCart.css";
import CartItem from "../../component/cartItem";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";

const ShoppingCart = () => {
    const navigate = useNavigate();

    const {store, actions} = useContext(Context)

    const products = store.products

    useEffect(() => {
        !store.token && navigate("/login")
    }, [])  

  return (
    <>
    <div className="container bg-vital-gray">
      <div className="row">
        <div className="col-xl-8">
          {
            products.map((product, index) => {
              console.log({quantityMap: product.quantity})
              return <CartItem key={product.id} title={product.title} price={product.price} image={product.image} quantity={product.quantity} id={product.id} deleteItem={actions.removeFromCart} />
            })
          }
          <div className="row my-4">
            <div className="col-sm-6">
              <Link
                to="/store"
                className="btn btn-link text-vital-white"
              >
                <i className="mdi mdi-arrow-left me-1"></i> Continue adding
                products{" "}
              </Link>
            </div>{" "}
            {/* end col */}
            <div className="col-sm-6">
              <div className="text-sm-end mt-2 mt-sm-0">
                <span className="btn btn-vital-orange text-vital-white" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  <i className="mdi mdi-cart-outline me-1"></i> Checkout{" "}
                </span>
              </div>
            </div>{" "}
            {/* end col */}
          </div>{" "}
          {/* end row*/}
        </div>
        {/*Order Summary row*/}
        <div className="col-xl-4 bg-vital-gray">
          <div className="mt-5 mt-lg-0">
            <div className="card shadow-none bg-vital-black">
              <div className="card-header bg-transparent border-bottom border-vital-gray mt-2 py-3 px-4">
                <h5 className="font-size-16 mb-0 text-vital-white">
                  Order summary{" "}
                  <span className="float-end">
                    {/*Could be change for a Order number*/}0245896
                  </span>
                </h5>
              </div>
              <div className="card-body p-4 pt-2">
                <div className="table-responsive">
                  <table className="table mb-0">
                    <tbody>
                      <tr className="d-none">
                        <td className="bg-vital-black text-vital-white">Sub total:</td>
                        <td className="bg-vital-black text-end text-vital-white">$ 780</td>
                      </tr>
                      <tr className="d-none">
                        <td className="bg-vital-black text-vital-white">Discount: </td>
                        <td className="bg-vital-black text-end text-vital-white">- $ 78</td>
                      </tr>
                      <tr className="d-none">
                        <td className="bg-vital-black text-vital-white">Delivery harge :</td>
                        <td className="bg-vital-black text-end text-vital-white">$ 25</td>
                      </tr>
                      <tr className="d-none">
                        <td className="bg-vital-black text-vital-white">Tax: </td>
                        <td className="bg-vital-black text-end text-vital-white">$18.20</td>
                      </tr>
                      <tr className="bg-light">
                        <th className="bg-vital-black text-vital-white">Total:</th>
                        <td className="bg-vital-black text-end text-vital-white">
                          <span className="fw-bold">${store.totalShoppingCart}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* end table-responsive */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end row */}
    </div>
    <div className="modal fade bg-vital-gray" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content bg-black">
                        <div className="modal-header border-bottom border-vital-orange">
                            <h1 className="modal-title fs-5 text-vital-orange" id="exampleModalLabel">Add Gym</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body bg-vital-black">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label text-vital-white">Name</label>
                                    <input type="text" className="form-control"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label text-vital-white">Description</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message-text" className="col-form-label text-vital-white">Email:</label>
                                    <input type="text" className="form-control"  />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message-text" className="col-form-label text-vital-white">Address:</label>
                                    <input type="text" className="form-control"  />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message-text" className="col-form-label text-vital-white">Phone:</label>
                                    <input type="text" className="form-control"/>
                                </div>
                                <div className="mb-3 d-flex">
                                    <div className="d-flex flex-column justify-content-around">
                                        <label htmlFor="message-text" className="col-form-label text-vital-white">Longitud:</label>
                                        <input type="text" className="w-75 form-control" />
                                    </div>
                                    <div className="d-flex flex-column justify-content-around">
                                        <label htmlFor="message-text" className="col-form-label text-vital-white">Longitud:</label>
                                        <input type="text" className="w-75 form-control" />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer border-top border-vital-orange">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-vital-orange text-vital-white">Add Gym</button>
                        </div>
                    </div>
                </div>
            </div>
    </>
  );
};

export default ShoppingCart;