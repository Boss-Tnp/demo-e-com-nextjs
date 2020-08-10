import { useDispatch, useSelector } from "react-redux";
import Checkout from "../components/checkout/checkout";
import LoadingPage from "../components/UI/pages/loading";
import useCart from "../hooks/useCart";

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
  const { data: cartItems, isLoading, mutate } = useCart();
  const { token, userId } = useSelector((state) => {
    return {
      token: state.authReducer.token,
      userId: state.authReducer.userId,
    };
  });

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
