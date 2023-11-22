import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "../../styles/product-card.css"


const ProductCard = ({ title, price, image, id }) => {
  const navigate = useNavigate();

  const { store, actions } = useContext(Context)

  const addToCart = async () => {
    const isDone = await actions.addToCart(title, price, image, id, 1)
    if (!isDone) {
      toast.warn('You have already added this product to the cart!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return
    }    
    toast.info('Added to the cart!', {      
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  return (
    <div className="product-card card bg-vital-black my-3" style={{ width: "18rem" }}>
      <img
        src={image}
        className="card-img-top"
        alt={`Photo of ${title}`}
        // Pendiente por optimizar la imagen, que ocupe todo el ancho de la card
        style={{ objectFit: "cover" }}
      />
      <div className="card-body">
        <h5
          className="card-title fw-bold fs-5 text-vital-orange"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/product-detail/${id}`)}
        >
          {title}
        </h5>
        <p className="card-text text-vital-white">${price}</p>
        <button
          onClick={addToCart}
          className="btn btn-vital-orange rounded-pill text-vital-white fw-bold"
        >
          Add to cart
        </button>
      </div>
      {/* <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
      /> */}
    </div>
  );
};

export default ProductCard;