import Personal from "../components/user/personal/personal";
import User from "../components/user/user";
import { useSelector } from "react-redux";

const PersonalPage = () => {
  const { token, userId } = useSelector((state) => {
    return {
      token: state.authReducer.token,
      userId: state.authReducer.userId,
    };
  });

  return (
    <User>
      <Personal token={token} userId={userId} />
    </User>
  );
};

export default PersonalPage;
