import { Container, Grid, TextField } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  API_HEADER,
  GRAPHQLAPI_ENDPOINT,
  updateObject,
} from "./../../../utils/constant";
import MyButton from "./../../UI/Button/button";

const useStyles = makeStyles((theme) => ({
  loginContainer: {
    // width: "200px",
    margin: "auto",
  },
  signUp: {
    textAlign: "center",
    margin: "auto",
  },
}));

const Signup = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const [signupButtonLoading, setSignupButtonLoading] = useState(false);
  const [signupForm, setSignupForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    resText: "",
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (signupForm.username.trim() === "") {
      setSignupForm({ ...signupForm, resText: "กรุณาระบุ ชื่อผู้ใช้งาน" });
    } else if (signupForm.password.trim() === "") {
      setSignupForm({ ...signupForm, resText: "กรุณาระบุ รหัสผ่าน" });
    } else if (signupForm.confirmPassword.trim() === "") {
      setSignupForm({ ...signupForm, resText: "กรุณาระบุ ยืนยันรหัสผ่าน" });
    } else if (
      signupForm.password.trim() !== signupForm.confirmPassword.trim()
    ) {
      setSignupForm({ ...signupForm, resText: "ยืนยันรหัสผ่าน ไม่ถูกต้อง" });
    } else {
      setSignupButtonLoading(true);
      Axios.post(
        GRAPHQLAPI_ENDPOINT,
        {
          query: `
            mutation {
              createUser(userInput: {username: "${signupForm.username}", password: "${signupForm.password}"})
            }
          `,
        },
        API_HEADER
      )
        .then((resData) => {
          // console.log(resData);
          setSignupButtonLoading(false);
          setSignupForm({
            ...signupForm,
            username: "",
            password: "",
            confirmPassword: "",
            resText: resData.data.message,
          });
          alert("ลงทะเบียนเสร็จเรียบร้อย");
          router.push("/login");
        })
        .catch((err) => {
          setSignupButtonLoading(false);
          // console.log(Object.assign({}, err));
          setSignupForm({
            ...signupForm,
            resText: Object.assign({}, err).response.data.errors[0].message,
          });
        });
    }
  };

  const inputChangedHandler = (value, field) => {
    setSignupForm(
      updateObject(signupForm, {
        [field]: value,
      })
    );
  };

  return (
    <Container maxWidth="xs">
      <Grid container item alignItems="center" justify="center">
        <List
          onSubmit={onSubmitHandler}
          className={classes.loginContainer}
          component="form"
          aria-label="secondary mailbox folders"
        >
          <ListItem>{signupForm.resText}</ListItem>
          <ListItem>
            <TextField
              fullWidth
              id="standard-username-input"
              label="ชื่อผู้ใช้งาน"
              type="text"
              variant="filled"
              value={signupForm.username}
              onChange={(e) => inputChangedHandler(e.target.value, "username")}
            />
          </ListItem>
          <ListItem>
            <TextField
              fullWidth
              id="standard-password-input"
              label="รหัสผ่าน"
              type="password"
              variant="filled"
              value={signupForm.password}
              onChange={(e) => inputChangedHandler(e.target.value, "password")}
            />
          </ListItem>
          <ListItem>
            <TextField
              fullWidth
              id="standard-confirm-password-input"
              label="ยืนยันรหัสผ่าน"
              type="password"
              variant="filled"
              value={signupForm.confirmPassword}
              onChange={(e) =>
                inputChangedHandler(e.target.value, "confirmPassword")
              }
            />
          </ListItem>
          <ListItem>
            <MyButton
              fullWidth
              color="primary"
              type="submit"
              loading={signupButtonLoading}
            >
              ลงทะเบียน
            </MyButton>
          </ListItem>
        </List>
      </Grid>
    </Container>
  );
};

export default Signup;
