import Payment from "../components/payment/payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51GzfmBGzypmRI1TRI0d0u28Mc9PgztXwDI5IY60rdjmaZFBrryQzNk4mEcRFmYGnCoCF5Zk32A4J27NGOhND337x00VBviu691"
);

const PaymentPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <Payment />
    </Elements>
  );
};

export default PaymentPage;
