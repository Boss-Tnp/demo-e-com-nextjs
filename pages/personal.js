import { useSelector } from "react-redux";
import PersonalApp from "../components/user/personalInfo/personal";
import User from "../components/user/user";

const PersonalPage = () => {
  const { token, userId } = useSelector((state) => {
    return {
      token: state.authReducer.token,
      userId: state.authReducer.userId,
    };
  });

  return (
    <User>
      <PersonalApp token={token} userId={userId} />
    </User>
  );
};

export default PersonalPage;
