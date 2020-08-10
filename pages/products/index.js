import Axios from "axios";
import Products from "../../components/admin/products/products";
import { API_HEADER, GRAPHQLAPI_ENDPOINT } from "../../utils/constant";
import withProtectRoute from "../../hoc/withProtectRoute";
import useUserInfo from "../../hooks/useUserInfo";
import { useRouter } from "next/router";

const ProductsPage = (pageProps) => {
  const { role } = useUserInfo();

  if (role !== "admin") {
    const router = useRouter();
    router.replace("/personal");
    return;
  }

  return <Products products={pageProps.products} />;
};

export default withProtectRoute(ProductsPage);

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
