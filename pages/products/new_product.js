import NewProduct from "../../components/admin/products/Form/ProductForm";
import { useSelector, useDispatch } from "react-redux";
import useUserInfo from "../../hooks/useUserInfo";
import { useRouter } from "next/router";

const NewProductPage = () => {
  const token = useSelector((state) => state.authReducer.token);
  const dispatch = useDispatch();
  const { role } = useUserInfo();

  if (role !== "admin") {
    const router = useRouter();
    router.replace("/personal");
    return;
  }

  return <NewProduct token={token} dispatchRedux={dispatch} />;
};

export default NewProductPage;
