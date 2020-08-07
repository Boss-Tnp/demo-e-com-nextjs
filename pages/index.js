import Axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import MyHome from "../components/home/home";
import * as actions from "../store/action/index";
import { API_HEADER, GRAPHQLAPI_ENDPOINT } from "../utils/constant";

export default function Home(props) {
  // console.log(props);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.setProducts(props.products));
  }, [dispatch]);
  return <MyHome />;
}

export async function getStaticProps() {
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

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      products,
    },
  };
}
