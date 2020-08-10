import Axios from "axios";
import React, { useState } from "react";
import { GRAPHQLAPI_ENDPOINT } from "../../../utils/constant";
import UserForm from "../../UI/UserForm/userForm";

const Personal = ({ userId, token }) => {
  const [saveButtonLoading, setSaveButtonLoading] = useState(false);

  const onSubmitHandler = (data) => {
    const { f_name, l_name, mobile, address } = data;
    setSaveButtonLoading(true);

    Axios.post(
      GRAPHQLAPI_ENDPOINT,
      {
        query: `
          mutation {
            updateUser(id: "${userId}", userData: {
              f_name: "${f_name}"
              l_name: "${l_name}"
              mobile: "${mobile}"
              address: "${address}"
            })
          }
        `,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => {
        setSaveButtonLoading(false);
        if (res.status === 200) {
          return res.data;
        }
      })
      .then((resData) => {
        alert(resData.data.updateUser);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <UserForm
      cameFrom="personal"
      onSubmitHandler={onSubmitHandler}
      saveButtonLoading={saveButtonLoading}
    />
  );
};

export default Personal;
