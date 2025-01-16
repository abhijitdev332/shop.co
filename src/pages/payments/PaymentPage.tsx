import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { PaymentForm } from "../page";
import { PrivateAxios } from "../../services/api/api";

const stripe = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const StripePayment = () => {
  const [clientSecret, setClientSecret] = useState<string | any>(null);
  const options = {
    clientSecret: clientSecret,
    theme: "stripe",
  };
  useEffect(() => {
    PrivateAxios.post("/payment", {
      items: [{ id: 1, name: "momos", amount: 40.0 }],
    })
      .then((resp) => {
        console.log(resp.data);
        setClientSecret(resp.data?.data?.client_secret);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="payment">
        {clientSecret && (
          <Elements stripe={stripe} options={options}>
            <PaymentForm />
          </Elements>
        )}
      </div>
    </>
  );
};

export default StripePayment;
