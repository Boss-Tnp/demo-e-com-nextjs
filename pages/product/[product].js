import { useRouter } from "next/router";
import Axios from "axios";
import { GRAPHQLAPI_ENDPOINT, API_HEADER } from "./../utils/constant";
import LoadingPage from "./../components/UI/pages/loading";
import Product from "./../components/product/product";
import { useSelector } from "react-redux";

const ProductPage = (props) => {
  const router = useRouter();
  const { token, userId, role } = useSelector((state) => {
    return {
      token: state.authReducer.token,
      userId: state.authReducer.userId,
      role: state.authReducer.role,
    };
  });

  if (router.isFallback) {
    return <LoadingPage />;
  }

  return (
    <Product
      product={props.product}
      token={token}
      userId={userId}
      role={role}
    />
  );
};

export default ProductPage;

export async function getStaticPaths() {
  return {
    paths: [
      { params: { product: "5edde5a4ea8dfc0e343a69aa" } },
      { params: { product: "5edde71fea8dfc0e343a69b6" } },
    ],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const productId = params.product;
  const res = await Axios.post(
    GRAPHQLAPI_ENDPOINT,
    {
      query: `
            query {
              getProduct(id: "${productId}") {
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
  const product = res.data.data.getProduct;

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      product,
    },
  };
}
