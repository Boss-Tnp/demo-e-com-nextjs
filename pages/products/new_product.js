import NewProduct from "./../../components/admin/products/Form/ProductForm";
import { useSelector, useDispatch } from "react-redux";

const NewProductPage = () => {
  const token = useSelector((state) => state.authReducer.token);
  const dispatch = useDispatch();
  return <NewProduct token={token} dispatchRedux={dispatch} />;
};

export default NewProductPage;
