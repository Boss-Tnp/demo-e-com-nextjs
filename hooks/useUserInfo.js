import { GraphQLClient } from "graphql-request";
import { GRAPHQLAPI_ENDPOINT } from "../utils/constant";
import useSWR from "swr";
import { useSelector } from "react-redux";

function useUserInfo() {
  const { token, userId, role } = useSelector((state) => {
    return {
      token: state.authReducer.token,
      userId: state.authReducer.userId,
      role: state.authReducer.role,
    };
  });

  const client = new GraphQLClient(GRAPHQLAPI_ENDPOINT);
  client.setHeader("authorization", "Bearer " + token);

  const query = (userId) => `
  query {
               getUser(id: "${userId}") {
                 _id
                 username
                 f_name
                 l_name
                 mobile
                 address
                 creditCard
               }
             }
`;

  const { data, error } = useSWR(
    [query(userId), userId],
    (query) => {
      return client.request(query);
    }
    // { refreshInterval: 1000 }
  );

  //   console.log(data);
  //   console.log(error);

  return {
    user: data ? data.getUser : undefined,
    role: role,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useUserInfo;
