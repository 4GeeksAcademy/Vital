import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import ProductCard from "../component/productCard";
import BackgroundContainer from "../component/backgroundContainer";
import Imagen from "../../img/store-background.png";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config"

export const Store = () => {
  const { store, actions } = useContext(Context)
  // const productos = store.products;

  const [products, setProducts] = useState([])

  useEffect(() => {
    // actions.getProducts();

    const productsRef = collection(db, "products")

    getDocs(productsRef)
      .then((resp) => {
        
        setProducts(
          resp.docs.map((doc) => {
            return { ...doc.data(), id: doc.id }
          })
        )
      })

  }, []);

  return (
    <>
      <BackgroundContainer
        title="Store"
        description="Esta es la tienda donde se mostraran todos los productos"
        image={Imagen}
      />
      <div className="container-fluid p-5 bg-vital-gray">
        <div className="container d-flex  flex-column title-workout">
          <div className="row col-11 d-flex mx-auto justify-content-around">
            {products.map((product, id) => {
              return (
                <ProductCard
                  key={product.id}
                  image={product.image}
                  title={product.title}
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
