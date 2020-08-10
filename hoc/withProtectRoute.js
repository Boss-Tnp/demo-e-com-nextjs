import { useRouter } from "next/router";
import useAuth from "../hooks/useAuth";

const withProtectRoute = (Component) => (pageProps) => {
  // return () => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // useEffect(() => console.log("isAuthenticated: ", isAuthenticated));
  // useEffect(() => console.log("isLoading: ", isLoading));
  // useEffect(() => console.log(loading));

  // useEffect(() => {
  //   if (!isAuthenticated) router.push("/login");
  //   console.log("redirect to login: ", isLoading);
  // }, [isLoading]);

  if (isLoading) {
    return;
  }

  if (!isAuthenticated) {
    router.push("/login");
    return;
  }

  return <Component {...pageProps} />;
  // };
};

export default withProtectRoute;
