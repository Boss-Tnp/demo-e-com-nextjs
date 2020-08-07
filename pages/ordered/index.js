import Ordered from "../../components/user/ordered/ordered";
import User from "../../components/user/user";
import { useSelector } from "react-redux";

const OrderedPage = () => {
  // const { token, userId } = useSelector((state) => {
  //   return {
  //     token: state.authReducer.token,
  //     userId: state.authReducer.userId,
  //   };
  // });
  // return (
  //   <User>
  //     <Ordered token={token} userId={userId} />
  //   </User>
  // );

  return <p>Ordered</p>;
};

export default OrderedPage;
