import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Image from "../../img/image1.png";
import ProductCard from "../component/productCard"
import { products } from "../constants/constants";

export const Store = () => {
    
    return (
      <div className="container-fluid">
        {products.map((product, index) => {
          return (
            <ProductCard 
            key={product.id}
            name={product.name}
            price={product.price}
            />
          )
        })}
      </div>
    )
}