import { makeStyles } from "@material-ui/core";
import Axios from "axios";
import PropTypes from "prop-types";
import React, { useState } from "react";
import NumberFormat from "react-number-format";
import { GRAPHQLAPI_ENDPOINT } from "../../../utils/constant";
import UserForm from "../../UI/UserForm/userForm";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
  section: {
    margin: theme.spacing(1, 2),
  },
}));

function NumberFormatCreditCard(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      format="#### #### #### ####"
      mask="_"
    />
  );
}

NumberFormatCreditCard.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

function NumberFormatTel(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      format="+66 ## ###-####"
      mask="_"
      type="tel"
    />
  );
}

NumberFormatTel.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const Personal = ({ userId, token }) => {
  const classes = useStyles();

  const [saveButtonLoading, setSaveButtonLoading] = useState(false);
  // const [formState, setFormState] = useState({
  //   username: "",
  //   f_name: "",
  //   l_name: "",
  //   mobile: "",
  //   address: "",
  //   creditCard: "",
  // });

  const onSubmitHandler = (data) => {
    // console.log(data);
    // e.preventDefault();
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
      // info={user}
      saveButtonLoading={saveButtonLoading}
    />
  );
};

export default Personal;
