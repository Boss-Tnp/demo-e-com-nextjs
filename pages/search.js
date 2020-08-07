import Search from "./../omponents/search/search";
import Axios from "axios";
import { GRAPHQLAPI_ENDPOINT, API_HEADER } from "./../utils/constant";
import { useDispatch } from "react-redux";
import * as actions from "./../store/action/index";
import { useEffect } from "react";

const SearchPage = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.setProducts(props.products));
  }, [dispatch]);

  return <Search {...props} />;
};

export default SearchPage;

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
    revalidate: 1,
  };
}
