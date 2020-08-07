import Ordered from "./../../components/user/ordered/ordered";
import User from "./../../components/user/user";
import { useRouter } from "next/router";

const OrderedPage = () => {
  return (
    <User>
      <Ordered />
    </User>
  );
};

export default OrderedPage;
