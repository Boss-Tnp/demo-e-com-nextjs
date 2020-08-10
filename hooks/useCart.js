import { GraphQLClient } from "graphql-request";
import { GRAPHQLAPI_ENDPOINT } from "../utils/constant";
import useSWR from "swr";
import { useSelector } from "react-redux";

function useCart() {
  const { token, userId } = useSelector((state) => {
    return {
      token: state.authReducer.token,
      userId: state.authReducer.userId,
    };
  });

  if (userId === null) {
    return {
      data: [],
      isLoading: false,
      isError: false,
      isValidating: false,
      mutate: () => {},
    };
  }

  const client = new GraphQLClient(GRAPHQLAPI_ENDPOINT);
  client.setHeader("authorization", "Bearer " + token);

  const query = (userId) => `
        query {
            getCart(userId: "${userId}") {
                _id
                productId {
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
                quantity
            }
        }
    `;

  const fetcher = (url) => client.request(url);

  const { data, error, mutate, isValidating } = useSWR(
    query(userId),
    (query) => {
      return fetcher(query);
    }
    // { refreshInterval: 100 }
  );

  //   console.log(data);
  //   console.log(error);

  return {
    data: data ? data.getCart : [],
    isLoading: !error && !data,
    isError: error,
    isValidating,
    mutate,
  };
}

export default useCart;
