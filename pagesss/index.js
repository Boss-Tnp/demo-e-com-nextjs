import Head from "next/head";
import styles from "./../styles/Home.module.css";
import Layout from "./layout/layout";
import MyHome from "../components/home/home";
import Axios from "axios";
import { GRAPHQLAPI_ENDPOINT, API_HEADER } from "../utils/constant";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import * as actions from "../store/action/index";

export default function Home(props) {
  // console.log(props);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.setProducts(props.products));
  }, [dispatch]);
  return (
    <>
      {/* <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head> */}

      {/* <Layout> */}
      <MyHome />
      {/* </Layout> */}
    </>
  );
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
