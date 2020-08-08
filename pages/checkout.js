import Checkout from "../components/checkout/checkout";
import { useSelector, useDispatch } from "react-redux";
import useCart from "../hooks/useCart";
import LoadingPage from "../components/UI/pages/loading";
import { useState, useEffect } from "react";

const updateTotalPrice = (updatedCartItems) => {
  const updatedTotalPrice = updatedCartItems
    .map((el) => {
      return el.productId.pricing.price * el.quantity;
    })
    .reduce((prv, curr) => prv + curr, 0);

  return updatedTotalPrice;
};

const CheckoutPage = (pageProps) => {
  const dispatch = useDispatch();
  const { token, userId } = useSelector((state) => {
    return {
      token: state.authReducer.token,
      userId: state.authReducer.userId,
    };
  });
  const { data: cartItems, isLoading, mutate } = useCart(userId, token);

  // const [cartItems, setCartItems] = useState([]);
  // useEffect(() => console.log("Effect: "));
  // useEffect(() => {
  //   console.log(data);
  //   setCartItems(data);
  // }, data);

  let totalPrice = 0;

  const onUpdateCartItems = () => {
    mutate();
  };

  if (isLoading) {
    return <LoadingPage />;
  }
  totalPrice = updateTotalPrice(cartItems);

  return (
    <Checkout
      dispatch={dispatch}
      token={token}
      userId={userId}
      cartItems={cartItems}
      totalPrice={totalPrice}
      onUpdateCartItems={onUpdateCartItems}
    />
  );
};

export default CheckoutPage;
