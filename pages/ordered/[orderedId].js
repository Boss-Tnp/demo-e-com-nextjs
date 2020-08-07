// import OrderDetails from "../../components/user/ordered/orderedDetail/orderedDetail";
import { useSelector } from "react-redux";

const OrderedDetailsPage = () => {
  const { token, userId } = useSelector((state) => {
    return {
      token: state.authReducer.token,
      userId: state.authReducer.userId,
    };
  });

  return <p>OrderedDetail</p>;
  return <OrderDetails token={token} userId={userId} />;
};

export default OrderedDetailsPage;
