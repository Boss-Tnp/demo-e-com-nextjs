import ProductForm from "./../components/admin/products/Form/ProductForm";
import { useSelector, useDispatch } from "react-redux";

const ProductFormPage = () => {
  const token = useSelector((state) => state.authReducer.token);
  const product = useSelector(
    (state) => state.productsReducer.adminSelectedProduct
  );
  const dispatch = useDispatch();
  return (
    <ProductForm token={token} dispatchRedux={dispatch} product={product} />
  );
};

export default ProductFormPage;
