import React from "react";
import "./shoppingCart.css";
import CartItem from "../../component/cartItem";
import { Link, useNavigate } from "react-router-dom";
import {products} from "../../constants/constants"

const ShoppingCart = () => {
    const navigate = useNavigate();
  return (
    <div className="container bg-vital-gray">
      <div className="row">
        <div className="col-xl-8">
          {
            products.map((product, index) => {
              return <CartItem key={index} name={product.name} price={product.price} url={product.url}/>
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
                <a href="ecommerce-checkout.html" className="btn btn-vital-orange text-vital-white">
                  <i className="mdi mdi-cart-outline me-1"></i> Checkout{" "}
                </a>
              </div>
            </div>{" "}
            {/* end col */}
          </div>{" "}
          {/* end row*/}
        </div>
        {/*Order Summary row*/}
        <div className="col-xl-4 bg-vital-gray">
          <div className="mt-5 mt-lg-0">
            <div className="card border shadow-none bg-vital-black">
              <div className="card-header bg-transparent border-bottom mt-2 py-3 px-4">
                <h5 className="font-size-16 mb-0 text-vital-white">
                  Order Summary{" "}
                  <span className="float-end">
                    {/*Could be change for a Order number*/}0245896
                  </span>
                </h5>
              </div>
              <div className="card-body p-4 pt-2">
                <div className="table-responsive">
                  <table className="table mb-0">
                    <tbody>
                      <tr>
                        <td className="bg-vital-black text-vital-white">Sub Total:</td>
                        <td className="bg-vital-black text-end text-vital-white">$ 780</td>
                      </tr>
                      <tr>
                        <td className="bg-vital-black text-vital-white">Discount: </td>
                        <td className="bg-vital-black text-end text-vital-white">- $ 78</td>
                      </tr>
                      <tr>
                        <td className="bg-vital-black text-vital-white">Delivery Charge :</td>
                        <td className="bg-vital-black text-end text-vital-white">$ 25</td>
                      </tr>
                      <tr>
                        <td className="bg-vital-black text-vital-white">Tax: </td>
                        <td className="bg-vital-black text-end text-vital-white">$ 18.20</td>
                      </tr>
                      <tr className="bg-light">
                        <th className="bg-vital-black text-vital-white">Total :</th>
                        <td className="bg-vital-black text-end text-vital-white">
                          <span className="fw-bold">$ 745.2</span>
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
  );
};

export default ShoppingCart;