import React, { useEffect }from "react";
import { useParams } from "react-router-dom"
import gif from "../../img/exercise.gif";
import { useFetch } from "../hooks/useFetch";
import Loading from "../component/loading/loading.js"

const ProductDetail = () => {

    const { id } = useParams()

    const { data, error, loading } = useFetch(`https://fakestoreapi.com/products/${id}`)

    console.log(loading)

    return (<>
        {
            loading ? <Loading /> : 
        <div className="container-fluid bg-vital-black d-flex flex-column p-5"> 
            <div className="row">
                <div className="col-lg-6 col-md-12 text-vital-white text-center">
                    <img
                        className="img-fluid rounded-3"
                        src={data.image}
                        alt="Product"
                        />
                    </div>
                <div className="col-lg-6 col-md-12">
                    <h2 className="text-vital-orange fw-bold">
                        {data.title}
                    </h2>
                    <hr className="text-vital-white"/>
                    <p className="d-flex flex-row col-12 text-vital-white justify-content-between">
                        {data.description}
                    </p>
                    <span className="text-vital-orange fs-3">${data.price}</span>
                    <hr className="text-vital-white"/>
                    <div className="mt-1 row d-flex flex-row">
                        <div className="col-sm-6 col-12 mb-3 mb-sm-0">
                            <input type="number" className="form-control" placeholder="Qty" />
                        </div>
                        <div className="col-sm-6 col-12">
                            <button type="button" class="btn btn-vital-orange text-vital-white rounded-5 px-4">Add to cart</button> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
        }
        </>
    )
}

export default ProductDetail;