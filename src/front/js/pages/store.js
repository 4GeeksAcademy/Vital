import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import ProductCard from "../component/productCard";
// import { products } from "../constants/constants";
import BackgroundContainer from "../component/backgroundContainer";
import Imagen from "../../img/store-background.png"

export const Store = () => {

  const { store, actions } = useContext(Context)
  const products = store.products

  useEffect(() => {
    actions.getProducts();
  }, []);

  return (
    <>
    <BackgroundContainer 
    title="Store"
    description="Esta es la tienda donde se mostraran todos los productos"
    image={Imagen}/>
      <div className="container-fluid p-5 bg-vital-black">
        <div className="container d-flex  flex-column title-workout">
          <div className="row col-11 d-flex mx-auto justify-content-around">

            {products.map((product, id) => {
              return (
                <ProductCard
                  key={product.id}
                  url={product.image}
                  name={product.title}
                  price={product.price}
                  id={product.id}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
