import { CssBaseline, ThemeProvider } from "@material-ui/core";
import Head from "next/head";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import theme from "../src/theme";
import "../styles/globals.css";
import { useStore } from "./../store/store";
import Layout from "./layout/layout";

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Demo E-commerce</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
          description="A Home Page For Demo E-Commerce Project with NextJS."
        />
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={store.__PERSISTOR}>
          <ThemeProvider theme={theme}>
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
