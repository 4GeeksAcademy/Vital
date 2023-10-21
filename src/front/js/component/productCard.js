import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Image from "../../img/image1.png";

const ProductCard = ({ name, price, id }) => {
    
    return (
        <div className="card bg-vital-gray" style={{ width: "18rem" }}>
        <img src="https://www.valentiamedical.com/795-home_default/rodillera-deportiva-elastica.jpg" className="card-img-top" alt="Imagen del producto" />
        <div className="card-body">
          <h5 className="card-title fw-bold text-vital-orange">{name}</h5>
          <p className="card-text text-vital-white">{price}</p>
          <a href="#" className="btn btn-vital-orange rounded-3 text-vital-white fw-bold">
            Agregar al carrito
          </a>
        </div>
      </div>
    )
}

export default ProductCard;