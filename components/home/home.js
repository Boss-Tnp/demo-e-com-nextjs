import React from "react";
import Advertisement from "./advertisement/advertisement";
import Promotion from "./promotion/promotion";
import Trending from "./trending/trending";
import { useSelector } from "react-redux";
import Fade from "react-reveal/Fade";

const Home = () => {
  const activeProducts = useSelector(
    (state) => state.productsReducer.activeProducts
  );
  // const [state, setState] = useState({
  //   products: [],
  //   loading: true,
  // });

  // useEffect(() => {
  //   let _isMounted = true;

  //   if (products.length === 0) {
  //     axios
  //       .post(
  //         GRAPHQLAPI_ENDPOINT,
  //         {
  //           query: `
  //         query {
  //           getProducts {
  //             _id
  //             info {
  //               brand model description stock
  //             }
  //             pricing {
  //               price discount netPrice
  //             }
  //             imageUrl {
  //               _id nameUrl
  //             }
  //             shipping {
  //               weight heels shoeTip
  //             }
  //             active
  //           }
  //         }
  //       `,
  //         },
  //         API_HEADER
  //       )
  //       .then((res) => {
  //         if (res.status === 200) {
  //           if (_isMounted) {
  //             // setState({
  //             //   loading: false,
  //             //   products: res.data.data.getProducts,
  //             // });
  //             // onSetProducts(res.data.data.getProducts);
  //             dispatch(actions.setProducts(res.data.data.getProducts));
  //           }
  //         }
  //       })
  //       .catch((err) => {
  //         alert(err);
  //       });
  //   }

  //   return () => {
  //     _isMounted = false;
  //   };
  // }, [dispatch, products.length]);

  // if (activeProducts.length === 0) {
  //   return <LoadingPage />;
  // }

  // return <p>Hello World</p>;

  return (
    <>
      <Head>
        <title>Demo E-commerce</title>
        <meta
          name="description"
          content="A Home Page For Demo E-Commerce Project with NextJS."
        />
      </Head>
      <Fade bottom>
        <Promotion></Promotion>
        <Advertisement></Advertisement>
        <Trending activeProducts={activeProducts}></Trending>
      </Fade>
    </>
  );
};

// export default connect(mapStateToProps, mapDispatchToProps)(Home);
export default Home;
