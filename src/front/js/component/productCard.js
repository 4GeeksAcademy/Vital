import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ title, price, image, id }) => {
  const navigate = useNavigate();

  return (
    <div className="card bg-vital-black m-1" style={{ width: "18rem" }}>
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
        <a
          href="#"
          className="btn btn-vital-orange rounded-3 text-vital-white fw-bold"
        >
          Add to cart
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
