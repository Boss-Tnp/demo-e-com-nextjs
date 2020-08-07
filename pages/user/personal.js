import Personal from "../../components/user/personal/personal";
import User from "../../components/user/user";
import { useRouter } from "next/router";

const PersonalPage = () => {
  return (
    <User>
      <Personal />
    </User>
  );
};

export default PersonalPage;
