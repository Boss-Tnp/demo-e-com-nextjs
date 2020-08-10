import { useSelector } from "react-redux";
import PersonalApp from "../components/user/personalInfo/personal";
import User from "../components/user/user";
import withProtectRoute from "../hoc/withProtectRoute";
import { useRouter } from "next/router";
import useUserInfo from "../hooks/useUserInfo";

const PersonalPage = () => {
  const { token, userId } = useSelector((state) => {
    return {
      token: state.authReducer.token,
      userId: state.authReducer.userId,
    };
  });
  const { role } = useUserInfo();

  if (role !== "user") {
    const router = useRouter();
    router.replace("/products");
    return;
  }

  return (
    <User>
      <PersonalApp token={token} userId={userId} />
    </User>
  );
};

export default withProtectRoute(PersonalPage);
