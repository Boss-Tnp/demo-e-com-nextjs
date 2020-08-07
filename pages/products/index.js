import Products from "./../components/admin/products/products";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import { GRAPHQLAPI_ENDPOINT, API_HEADER } from "./../utils/constant";

const ProductsPage = (pageProps) => {
  // const products = useSelector((state) => state.productsReducer.products);
  const products = pageProps.products;

  return <Products products={products} />;
};

export default ProductsPage;

export async function getServerSideProps() {
  // console.log("getStaticProps");
  const res = await Axios.post(
    GRAPHQLAPI_ENDPOINT,
    {
      query: `
          query {
            getProducts {
              _id
              info {
                brand model description stock
              }
              pricing {
                price discount netPrice
              }
              imageUrl {
                _id nameUrl
              }
              shipping {
                weight heels shoeTip
              }
              active
            }
          }
        `,
    },
    API_HEADER
  );
  const products = res.data.data.getProducts;
  // console.log(products);

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      products,
    },
  };
}
