import {
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import {
  API_HEADER,
  GRAPHQLAPI_ENDPOINT,
  updateObject,
} from "./../../../utils/constant";
import MyButton from "./../../UI/Button/button";
import * as actions from "./../../../store/action/index";
import Link from "next/link";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  loginContainer: {
    // width: "200px",
    margin: "auto",
  },
  input: {
    background: "rgba(255,255,255,0.16)",
    "&:hover": {
      background: "rgba(255,255,255,0.24)",
    },
    "&$focused": {
      background: "rgba(255,255,255,0.24)",
    },
  },
  inputInput: {
    color: "#ffffff",
  },
  underline: {
    "&:after": {
      borderColor: theme.palette.primary.light,
    },
  },
  focused: {},
  signUp: {
    textAlign: "center",
    margin: "auto",
  },
  forgetPassword: {
    textAlign: "center",
    margin: "auto",
    // [theme.breakpoints.only("xs")]: {
    //   position: "absolute",
    //   bottom: 32,
    //   marginTop: 40,
    //   left: "50%",
    //   transform: "translateX(-50%)",
    // },
    // [theme.breakpoints.up("sm")]: {
    //   marginTop: 40,
    // },
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const [loginButtonLoading, setLoginButtonLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
    resText: "",
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (loginForm.username.trim() === "") {
      setLoginForm({ ...loginForm, resText: "กรุณาระบุ Username" });
    } else if (loginForm.password.trim() === "") {
      setLoginForm({ ...loginForm, resText: "กรุณาระบุ Password" });
    } else {
      setLoginButtonLoading(true);

      try {
        const res = await Axios.post(
          GRAPHQLAPI_ENDPOINT,
          {
            query: `
            query {
              login(userInput: {username:"${loginForm.username}", password:"${loginForm.password}"}) {
                token userId role
              }
            }
          `,
          },
          API_HEADER
        );

        const resCart = await Axios.post(
          GRAPHQLAPI_ENDPOINT,
          {
            query: `
          query {
            getCart(userId: "${res.data.data.login.userId}") {
              _id
              productId {
                _id
                info {
                  brand model description stock
                }
                pricing {
                  price discount netPrice
                }
                imageUrl {
                  _id nameUrl
                }
                shipping {
                  weight heels shoeTip
                }
                active
              }
              quantity
            }
          }
      `,
          },
          {
            headers: {
              Authorization: "Bearer " + res.data.data.login.token,
              "Content-Type": "application/json",
            },
          }
        );

        const cartNo = resCart.data.data.getCart
          .map((el) => {
            return el.quantity;
          })
          .reduce((prv, curr) => prv + curr, 0);

        setLoginButtonLoading(false);
        dispatch(
          actions.setToken(
            res.data.data.login.token,
            res.data.data.login.userId
          )
        );
        dispatch(actions.setCartNo(cartNo));

        if (res.data.data.login.role === "admin") {
          router.push("/products");
        } else {
          router.push("/user/personal");
        }
      } catch (err) {
        setLoginButtonLoading(false);
        // console.log("err: ", err);
        setLoginForm({
          ...loginForm,
          resText: Object.assign({}, err).response.data.errors[0].message,
        });
      }
    }
  };

  const inputChangedHandler = (value, field) => {
    setLoginForm(
      updateObject(loginForm, {
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
          <ListItem>{loginForm.resText}</ListItem>
          <ListItem>
            <TextField
              fullWidth
              id="standard-username-input"
              label="ชื่อผู้ใช้งาน"
              type="text"
              variant="filled"
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
              onChange={(e) => inputChangedHandler(e.target.value, "password")}
            />
          </ListItem>
          <ListItem>
            <MyButton
              fullWidth
              color="primary"
              type="submit"
              loading={loginButtonLoading}
            >
              เข้าสู่ระบบ
            </MyButton>
          </ListItem>
          <ListItem>
            <div className={classes.signUp}>
              <Typography>
                ยังไม่ได้เป็นสมาชิก ? &nbsp;
                <Link href="/signup">
                  <a
                    style={{
                      color: "red",
                    }}
                  >
                    ลงทะเบียนเลย
                  </a>
                </Link>
              </Typography>
            </div>
          </ListItem>
          <Divider />
          <ListItem>
            <Typography>
              Admin: (ชื่อผู้ใช้งาน: admin, รหัสผ่าน: admin)
            </Typography>
          </ListItem>
          <ListItem>
            <Typography>User: (ชื่อผู้ใช้งาน: user, รหัสผ่าน: user)</Typography>
          </ListItem>
          {/* <ListItem>
            <div className={classes.forgetPassword}>
              <Typography color={"inherit"}>
                <Link to="/forget">Forget your password ?</Link>
              </Typography>
            </div>
          </ListItem>
          <Divider />
          <ListItem>
            <LoginFirebase />
          </ListItem> */}
        </List>
      </Grid>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetToken: (token, userId) => dispatch(actions.setToken(token, userId)),
  };
};

export default connect(null, mapDispatchToProps)(Login);
