import React from "react";
import Loading from "../component/loading/loading";
import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

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

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

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
      stripePaymentMethodHandler(result.paymentMethod.id);
      console.log('[PaymentMethod]', result.paymentMethod.id);
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
      body: JSON.stringify({ payment_method_id: result.paymentMethod.id, amount: 1000 })
    });
    const paymentResponse = await response.json();
    handleServerResponse(paymentResponse);

  }

  const handleServerResponse = async (response) => {
    if (response.error) {
      // Show error from server on payment form
      console.log(response.error);
    } else if (response.requires_action) {
      // Use Stripe.js to handle the required card action
      const { error: errorAction, paymentIntent } =
        await stripe.handleCardAction(response.payment_intent_client_secret);
  
      if (errorAction) {
        // Show error from Stripe.js in payment form
        console.log(errorAction);
      } else {
        // The card action has been handled
        // The PaymentIntent can be confirmed again on the server
        const serverResponse = await fetch('/pay', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ payment_intent_id: paymentIntent.id })
        });
        handleServerResponse(await serverResponse.json());
      }
    } else {
      console.log('Success!');

    }
  }

  return (
    <form className="mt-5 mb-5" onSubmit={handleSubmit}>
      <div className="bg-vital-black p-4 rounded shadow-sm w-25">
      <CardElement className="border bg-vital-white"/>
      <button>Submit</button>
      </div>
    </form>
  );
};

