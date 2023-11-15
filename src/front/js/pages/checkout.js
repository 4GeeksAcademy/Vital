import React, { useContext, useRef, useState } from "react";
import Loading from "../component/loading/loading";
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { motion } from "framer-motion"

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51Nv9PcKpc9PSomxGWIhFobEWIeTxcP3NX9NVj43luYP4jqgikaVm49z6jcu40LfsDwFJxym3XgEKnxZcaoVAkWjG00HkYTxOsQ');

const Checkout = () => { 

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

export default Checkout;

const CheckoutForm = () => {
  const { store, actions } = useContext(Context);
  const closeRef = useRef();
  const navigate = useNavigate();
  const [cardInformation, setCardInformation] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    country: "",
    phone: "",
  })
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (store.totalShoppingCart == 0 || store.totalShoppingCart == null || cardInformation.name == "" || cardInformation.address == "" || cardInformation.city == "" || cardInformation.state == "" || cardInformation.country == "" || cardInformation.phone == "") {
      alert("Please add products to the shopping cart")
      return
    }
    if (!stripe || !elements) {
      console.log("Stripe.js hasn't yet loaded.");
      console.log("Make sure to disable form submission until Stripe.js has loaded.");
      return;
    }

    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        "address": {
          "city": "test",
          "country": "US",
          "line1": null,
          "line2": null,
          "postal_code": "12345",
          "state": "FL"
        },
        "email": "test@vital.com",
        "name": null,
        "phone": null
      },
    });
    stripePaymentMethodHandler(result);
    console.log('[PaymentMethod]', result);
  };


  const stripePaymentMethodHandler = async (result) => {
    if (result.error) {
      console.log(result.error.message);
      return
    }
    
    const response = await fetch(process.env.BACKEND_URL + "api/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ payment_method_id: result.paymentMethod.id, amount: store.totalShoppingCart * 100, order: 8547625 })
    });
    const paymentResponse = await response.json();
    handleServerResponse(paymentResponse);

  }

  const handleServerResponse = async (response) => {
    console.log(response);
    if (response.error) {
      // Show error from server on payment form
      toast.error('Login Failed!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      console.log(response.error);
    } else if (response.requires_action) {
      // Use Stripe.js to handle the required card action
      const { error: errorAction, paymentIntent } =
        await stripe.handleCardAction(response.payment_intent_client_secret);

      if (errorAction) {
        // Show error from Stripe.js in payment form
        toast.error('Payment Failed!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
        console.log(errorAction);
      } else {
        // The card action has been handled
        // The PaymentIntent can be confirmed again on the server
        const serverResponse = await fetch(process.env.BACKEND_URL + "api/payment", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ payment_intent_id: paymentIntent.id })
        });
        handleServerResponse(await serverResponse.json());
      }
    } else {
      toast.success('Thanks for you purchase', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      closeRef.current.click();
      actions.clearCart();
      setCardInformation({
        name: "",
        address: "",
        city: "",
        state: "",
        country: "",
        phone: "",
      })
      navigate("/store")
    }
  }

  return (

    <div className="modal-dialog">
      <div className="modal-content bg-black">
        <div className="modal-header border-bottom border-vital-orange">
          <h1 className="modal-title fs-5 text-vital-orange" id="exampleModalLabel">Confirm</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body bg-vital-black">
          <form className="mt-5 mb-5">
            <div className="mb-3">
              <label htmlFor="recipient-name" className="col-form-label text-vital-white">Card Information</label>
              <CardElement className="form-control" />
            </div>
            <div className="mb-3">
              <label htmlFor="recipient-name" className="col-form-label text-vital-white">Name</label>
              <input type="text" className="form-control" onChange={(e)=> {
                setCardInformation({...cardInformation, name: e.target.value})
              }}/>
            </div>
            <div className="mb-3">
              <label htmlFor="recipient-name" className="col-form-label text-vital-white">Address</label>
              <input type="text" className="form-control" onChange={
                (e) => setCardInformation({ ...cardInformation, address: e.target.value })
              }/>
            </div>
            <div className="d-flex justify-content-between">            
            <div className="mb-3">
              <label htmlFor="message-text" className="col-form-label text-vital-white col-3">City</label>
              <input type="text" className="form-control w-75" onChange={
                (e) => setCardInformation({ ...cardInformation, city: e.target.value })
              }/>
            </div>
            <div className="mb-3">
              <label htmlFor="message-text" className="col-form-label text-vital-white col-3">State</label>
              <input type="text" className="form-control w-75" onChange={
                (e) => setCardInformation({ ...cardInformation, state: e.target.value })
              }/>
             
            </div>
            <div className="mb-3">
              <label htmlFor="message-text" className="col-form-label text-vital-white col-3">Country</label>
              <input type="text" className="form-control w-75" onChange={
                (e) => setCardInformation({ ...cardInformation, country: e.target.value })
              }/>
              
            </div>
            </div>
            <div className="mb-3">
              <label htmlFor="message-text" className="col-form-label text-vital-white">Phone</label>
              <input type="text" className="form-control" onChange={
                (e) => setCardInformation({ ...cardInformation, phone: e.target.value })
              }/>
            </div>
          </form>
          <div className="d-flex justify-content-end">
            <span className="fw-bold text-vital-white">Total: {store.totalShoppingCart}</span>
          </div>
        </div>
        <div className="modal-footer border-top border-vital-orange">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeRef}>Close</button>
          <button type="button" className="btn btn-vital-orange text-vital-white" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
      <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={true}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
    </div>

  );
};



