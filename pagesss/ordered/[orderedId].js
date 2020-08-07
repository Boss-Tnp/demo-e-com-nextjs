import OrderDetails from "../../components/user/ordered/ordereddetail/ordereddetail";
import { useSelector } from "react-redux";

const OrderedDetailsPage = () => {
  const { token, userId } = useSelector((state) => {
    return {
      token: state.authReducer.token,
      userId: state.authReducer.userId,
    };
  });

  return <OrderDetails token={token} userId={userId} />;
};

export default OrderedDetailsPage;
