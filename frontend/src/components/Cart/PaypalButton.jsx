import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function PaypalButton({ amount, onSuccess, onError }) {
  
  const value = parseFloat(amount || 0).toFixed(2);

  const clientId =
    import.meta.env.VITE_PAYPAL_LIVE_CLIENT_ID
     ;



  return (
    <PayPalScriptProvider options={{ "client-id": clientId, currency: "USD" }}>
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{ amount: { value } }],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(onSuccess);
        }}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
}

export default PaypalButton;