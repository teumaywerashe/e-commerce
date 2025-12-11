import React from "react";
import {  PayPalScriptProvider,PayPalButtons } from "@paypal/react-paypal-js";
function PaypalButton({ amount, onSuccess, onError }) {
  return (
    <PayPalScriptProvider options={{ clientId: "dkjfrlkjnolkjfml" }}>
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, action) => {
          return action.order.create({
            purchase_units: [{ amount: { value: amount } }],
          });
        }}
        onApprove={(data, action) => {
          return action.order.capture().then(onSuccess);
        }}
        onError={onError}
      ></PayPalButtons>
    </PayPalScriptProvider>
  );
}

export default PaypalButton;
