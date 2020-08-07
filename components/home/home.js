import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_HEADER, GRAPHQLAPI_ENDPOINT } from "../../utils/constant";
import Advertisement from "./advertisement/advertisement";
import Promotion from "./promotion/promotion";
import Trending from "./trending/trending";
import * as actions from "./../../store/action/index";
import { useSelector } from "react-redux";
import Fade from "react-reveal/Fade";

const Home = (props) => {
  const products = useSelector((state) => state.productsReducer.products);
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
    <Fade bottom>
      <Promotion></Promotion>
      <Advertisement></Advertisement>
      <Trending activeProducts={activeProducts}></Trending>
    </Fade>
  );
};

// export default connect(mapStateToProps, mapDispatchToProps)(Home);
export default Home;
