import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import gif from "../../img/exercise.gif";
import { useFetch } from "../hooks/useFetch";
import Loading from "../component/loading/loading.js";
import { ArrowBackOutline } from "react-ionicons";
import { collection, getDocs, getLocation } from "firebase/firestore";
import { db } from "../../firebase/config";

const ProductDetail = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    //getDocument();
    const productsRef = collection(db, "products");
    console.log(productsRef);    
    let results = [];
    getDocs(productsRef).then((resp) => {
      results = resp.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      //console.log(results);
      const data = results.find((item) => item.id === id);
      console.log(data);
      if (data === undefined) {
        navigate("/store");
      }
      setLoading(false);
      setData(data);
    });
  }, []);

  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center">
      {loading ? (
        <Loading />
      ) : (
        <div className="container-fluid bg-vital-black d-flex flex-column p-5">
          <div className="mb-3">
            <span
              className="text-vital-orange"
              onClick={() => navigate(`/store`)}
              style={{ cursor: "pointer" }}
            >
              <ArrowBackOutline color={"#ff5300"} className="me-1" />
              Go back
            </span>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-12 text-vital-white text-center">
              <img
                className="img-fluid rounded-3"
                src={data.image}
                alt="Product"
                style={{ maxHeight: "25rem" }}
              />
            </div>
            <div className="col-lg-6 col-md-12">
              <h2 className="text-vital-orange fw-bold">{data.title}</h2>
              <hr className="text-vital-white" />
              <p className="d-flex flex-row col-12 text-vital-white justify-content-between">
                {data.description}
              </p>
              <span className="text-vital-orange fs-3">${data.price}</span>
              <hr className="text-vital-white" />
              <div className="mt-1 row d-flex flex-row">
                <div className="col-sm-6 col-12 mb-3 mb-sm-0">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Qty"
                  />
                </div>
                <div className="col-sm-6 col-12">
                  <button
                    type="button"
                    className="btn btn-vital-orange text-vital-white rounded-5 px-4"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
