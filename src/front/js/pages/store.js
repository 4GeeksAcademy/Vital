import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Image from "../../img/image1.png";
import ProductCard from "../component/productCard";
import { products } from "../constants/constants";

export const Store = () => {
  return (
    <div className="container-fluid p-5 bg-vital-black">
      <div className="container d-flex  flex-column title-workout">
        <div className="row col-11 d-flex mx-auto justify-content-around">
          {products.map((product, id) => {
            return (
              <ProductCard
                key={product.id}
                url={product.url}
                name={product.name}
                price={product.price}
                id={product.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
