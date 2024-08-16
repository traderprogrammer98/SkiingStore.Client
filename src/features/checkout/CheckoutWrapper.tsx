import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from "./CheckoutPage";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51Po7DoP07yfnp5tNBVwP7SXB5vIC7HXzZGEuL4J0dAgv6qistjTWKaluhAL78vD9umRWuoQrS3SPX9xnlBI2OvHc00pFNOmRML"
);

const CheckoutWrapper = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutPage />
    </Elements>
  );
};

export default CheckoutWrapper;
