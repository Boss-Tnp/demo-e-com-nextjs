import Ordered from "../../components/user/orderedInfo/ordered";
import User from "../../components/user/user";
import { useSelector } from "react-redux";

const OrderedPage = () => {
  const { token, userId } = useSelector((state) => {
    return {
      token: state.authReducer.token,
      userId: state.authReducer.userId,
    };
  });
  return (
    <User>
      <Ordered token={token} userId={userId} />
    </User>
  );
};

export default OrderedPage;
