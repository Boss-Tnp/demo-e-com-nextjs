import { GraphQLClient, gql, setHeader } from "graphql-request";
import { GRAPHQLAPI_ENDPOINT } from "../utils/constant";
import useSWR from "swr";

// const fetchUserInfo = () => {
//   return Axios.post(
//     GRAPHQLAPI_ENDPOINT,
//     {
//       query: `
//             query {
//               getUser(id: "${userId}") {
//                 _id
//                 username
//                 f_name
//                 l_name
//                 mobile
//                 address
//                 creditCard
//               }
//             }
//           `,
//     },
//     {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + token,
//       },
//     }
//   );
// };

function useUserInfo(id, token) {
  const client = new GraphQLClient(GRAPHQLAPI_ENDPOINT);
  client.setHeader("authorization", "Bearer " + token);

  const query = (id) => `
  query {
               getUser(id: "${id}") {
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
    [query(id), id],
    (query) => {
      return client.request(query);
    }
    // { refreshInterval: 1000 }
  );

  //   console.log(data);
  //   console.log(error);

  return {
    user: data ? data.getUser : undefined,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useUserInfo;
