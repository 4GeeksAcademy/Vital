import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import ProductCard from "../component/productCard";
import BackgroundContainer from "../component/backgroundContainer";
import Imagen from "../../img/store-background.png";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config"
import { useNavigate } from "react-router-dom";
import Loading from "../component/loading/loading.js";


export const Store = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context)
  const [loading, setLoading] = useState(true)
  // const productos = store.products;

  const [products, setProducts] = useState([])

  useEffect(() => {
    // actions.getProducts();
    !store.token && navigate("/login")
    const productsRef = collection(db, "products")
    // console.log(productsRef);

    getDocs(productsRef)
      .then((resp) => {
        const products = resp.docs.map((doc) => {
          return { ...doc.data(), id: doc.id }
        })
        setProducts(products)
        setLoading(false)
      })

  }, []);

  return (
    <div className="m-auto d-flex flex-column align-items-center">
    {
      loading ? <Loading /> :
      <>
      <BackgroundContainer
        title="Store"
        description="Many people take vitamins, supplements and other products to make them look and feel their best. Vitamins, supplements and other high-quality products make it easier to support your nutritional needs. At GNC, we’ve compiled a list of our best sellers all in one place so you can see the products everyone is talking about."
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
    }
    </div>
  );
};
