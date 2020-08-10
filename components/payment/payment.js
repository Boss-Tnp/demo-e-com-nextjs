import { Container, makeStyles } from "@material-ui/core";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import Axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./../../store/action/index";
import { GRAPHQLAPI_ENDPOINT } from "./../../utils/constant";
import UserForm from "./../UI/UserForm/userForm";
import useCart from "../../hooks/useCart";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
  horizontalList: {
    display: "flex",
    flexDirection: "row",
    padding: 0,
  },
  section: {
    margin: theme.spacing(1, 2),
  },
  fieldSection: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      flex: 1,
      minWidth: "150px",
    },
    // "& > *:not(:first-child):not(:last-child)": {
    //   margin: "0 20px",
    // },
  },
  creditCard: {
    maxWidth: "400px",
  },
}));

const Payment = () => {
  const elements = useElements();
  const stripe = useStripe();
  const router = useRouter();
  const dispatch = useDispatch();

  const [saveButtonLoading, setSaveButtonLoading] = useState(false);
  const [errorCreditCardMsg, setErrorCreditCardMsg] = useState(null);
  const { token, userId } = useSelector((state) => {
    return {
      token: state.authReducer.token,
      userId: state.authReducer.userId,
    };
  });

  const { mutate } = useCart();

  const onSubmitHandler = async (data) => {
    // e.preventDefault();
    const { f_name, l_name, mobile, address } = data;

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    setSaveButtonLoading(true);

    const billingDetails = {
      name: f_name + " " + l_name,
      // email: "test@test.com",
      phone: mobile,
      address: {
        line1: address,
      },
    };

    const cardElement = elements.getElement("card");
    let paymentIntentId;
    try {
      const paymentMethodReq = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: billingDetails,
      });

      if (paymentMethodReq.error) {
        setErrorCreditCardMsg(paymentMethodReq.error.message);
        setSaveButtonLoading(false);
        return;
      }

      const clientSecret = router.query.csc;
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: paymentMethodReq.paymentMethod.id,
        }
      );

      if (error) {
        setErrorCreditCardMsg(error.message);
        setSaveButtonLoading(false);
        return;
      }

      paymentIntentId = paymentIntent.id;
      // console.log("success: ", paymentIntent.id);
    } catch (err) {
      // console.log(err);
      alert(err);
      return;
    }

    // return;

    Axios.post(
      GRAPHQLAPI_ENDPOINT,
      {
        query: `
          mutation {
            postOrder(userId: "${userId}", paymentIntentId: "${paymentIntentId}")
          }
        `,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => {
        if (res.status === 200) {
          return res.data;
        }
      })
      .then((resData) => {
        setSaveButtonLoading(false);
        mutate();
        router.push("/success");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleCardDetailsChange = (e) => {
    if (e.complete === true) {
      setErrorCreditCardMsg(null);
    }
  };

  return (
    <Container>
      <UserForm
        readOnly
        cameFrom="payment"
        handleCardDetailsChange={handleCardDetailsChange}
        errorCreditCardMsg={errorCreditCardMsg}
        onSubmitHandler={onSubmitHandler}
        saveButtonLoading={saveButtonLoading}
      />
    </Container>
  );
};

export default Payment;
