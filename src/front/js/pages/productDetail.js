import React from "react";
import { useParams } from "react-router-dom"
import gif from "../../img/exercise.gif";


const ProductDetail = () => {

    const params = useParams()

    return (
        <div className="container-fluid bg-vital-black d-flex flex-column p-5"> 
            <div className="row">
                <div className="col-6 text-vital-white">
                    <img
                        className="img-fluid rounded-3"
                        src={gif}
                        alt="Product"
                        />
                    </div>
                <div className="col-6">
                    <h2 className="text-vital-orange fw-bold">
                        Product name
                    </h2>
                    <hr className="text-vital-white"/>
                    <p className="d-flex flex-row col-12 text-vital-white justify-content-between">
                        Quisque placerat metus risus, a suscipit tortor pulvinar id.
                        Etiam sed tellus mauris. Duis quis risus placerat, ornare
                        ligula ut, fermentum augue. Phasellus faucibus eros vel lacus
                        dapibus, nec imperdiet ligula lacinia.
                    </p>
                    <span className="text-vital-orange fs-3">$100.00</span>
                    <hr className="text-vital-white"/>
                    <div className="mt-1 row d-flex flex-row">
                        <div className="col-6">
                            <input type="number" className="form-control" placeholder="Qty" />
                        </div>
                        <div className="col-6">
                            <button type="button" class="btn btn-vital-orange text-vital-white rounded-5 px-4">Add to cart</button> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail;