import { ThemeProvider, CssBaseline } from "@material-ui/core";
import "../styles/globals.css";
import Head from "next/head";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { useStore } from "../store/store";
import theme from "../src/theme";
import { QueryParamProvider } from "use-query-params";
import { Route, BrowserRouter } from "react-router-dom";
import { GRAPHQLAPI_ENDPOINT, API_HEADER } from "../utils/constant";
import Layout from "./layout/layout";
import { PersistGate } from "redux-persist/integration/react";
import persistor from "../store/reducer/index";
// import * as actions from "./../store/action/index";

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  // if (!pageProps.products) return <div>Loading</div>;

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={store.__PERSISTOR}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </React.Fragment>
  );
}

export default MyApp;

// export async function getStaticProps() {
//   // console.log("getStaticProps");
//   const res = await Axios.post(
//     GRAPHQLAPI_ENDPOINT,
//     {
//       query: `
//           query {
//             getProducts {
//               _id
//               info {
//                 brand model description stock
//               }
//               pricing {
//                 price discount netPrice
//               }
//               imageUrl {
//                 _id nameUrl
//               }
//               shipping {
//                 weight heels shoeTip
//               }
//               active
//             }
//           }
//         `,
//     },
//     API_HEADER
//   );
//   const products = res.data.data.getProducts;
//   // console.log(products);

//   // By returning { props: posts }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       products,
//     },
//   };
// }
