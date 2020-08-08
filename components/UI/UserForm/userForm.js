import {
  Box,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  TextField,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { CardElement } from "@stripe/react-stripe-js";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import StripeInput from "./../../payment/PaymentForm/StripeInput";
import MyButton from "./../Button/button";
import { useSelector } from "react-redux";
import useUserInfo from "../../../hooks/useUserInfo";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
  horizontalList: {
    display: "flex",
    flexDirection: "row",
    padding: 0,
    alignItems: "center",
  },
  section: {
    margin: theme.spacing(1, 2),
  },
  fieldSection: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      flex: 1,
      minWidth: "150px",
    },
    // "& > *:not(:first-child):not(:last-child)": {
    //   margin: "0 20px",
    // },
  },
  creditCard: {
    maxWidth: "400px",
  },
}));

const UserForm = (props) => {
  const classes = useStyles();
  const { token, userId } = useSelector((state) => {
    return {
      token: state.authReducer.token,
      userId: state.authReducer.userId,
    };
  });
  const { user: userInfo, isLoading, isError } = useUserInfo(userId, token);
  const { register, errors, handleSubmit, reset } = useForm({
    defaultValues: userInfo,
  });

  useEffect(() => {
    reset(userInfo);
  }, [userInfo]);

  if (isLoading) {
    // return <LoadingPage />;
    return (
      <div
        style={{
          display: "flex",
        }}
      >
        <CircularProgress
          style={{
            margin: "auto",
          }}
        />
      </div>
    );
  }

  // if (isError) return <p>Error</p>;

  return (
    <form onSubmit={handleSubmit(props.onSubmitHandler)}>
      <List className={classes.horizontalList}>
        {props.cameFrom === "personal" ? (
          <>
            <ListItem>
              {/* <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar> */}
              <ListItemText
                primary="สวัสดีคุณ"
                secondary={userInfo ? userInfo.username : null}
              />
            </ListItem>
            <MyButton
              color="primary"
              type="submit"
              // disabled={props.disabledSave}
              loading={props.saveButtonLoading}
            >
              บันทึก
            </MyButton>
          </>
        ) : (
          <>
            <ListItem>
              <ListItemText primary="ข้อมูลการชำระเงิน" />
            </ListItem>
            <Link href="/personal">
              <a>
                <MyButton color="primary">แก้ไขข้อมูล</MyButton>
              </a>
            </Link>
            <MyButton
              color="secondary"
              type="submit"
              // disabled={props.disabledButton}
              loading={props.saveButtonLoading}
            >
              ชำระเงิน
            </MyButton>
          </>
        )}
      </List>
      <Paper className={classes.container} square>
        <div className={classes.section}>
          {/* <Typography gutterBottom>ข้อมูลส่วนตัว</Typography> */}
          <div className={classes.fieldSection}>
            <Box mt={1} mb={1} p={1}>
              <TextField
                id="f_nameId"
                name="f_name"
                label="ชื่อ"
                fullWidth
                helperText={errors.f_name && errors.f_name.message}
                error={!!errors.f_name}
                // error={info.f_name?.length === 0}
                // onChange={(e) =>
                //   props.inputChangeHandler(e.target.value, e.target.name)
                // }
                inputRef={register({
                  required: { value: true, message: "กรุณาระบุชื่อ" },
                })}
                InputProps={{
                  readOnly: props.readOnly,
                }}
              />
            </Box>
            <Box mt={1} mb={1} p={1}>
              <TextField
                // required
                id="l_nameId"
                name="l_name"
                label="นามสกุล"
                fullWidth
                // value={info.l_name}
                helperText={errors.l_name && errors.l_name.message}
                error={!!errors.l_name}
                inputRef={register({
                  required: { value: true, message: "กรุณาระบุนามสกุล" },
                })}
                // onChange={(e) =>
                //   props.inputChangeHandler(e.target.value, e.target.name)
                // }
                InputProps={{
                  readOnly: props.readOnly,
                }}
              />
            </Box>
            <Box mt={1} mb={1} p={1}>
              <TextField
                // required
                id="mobileId"
                name="mobile"
                label="เบอร์โทรศัพท์"
                fullWidth
                type="number"
                // value={info.mobile}
                // placeholder="+66 __ ___-____"
                helperText={errors.mobile && errors.mobile.message}
                error={!!errors.mobile}
                inputRef={register({
                  required: { value: true, message: "กรุณาระบุเบอร์โทรศัพท์" },
                  minLength: {
                    value: 10,
                    message: "กรุณาระบุเบอร์โทรศัพท์ให้ครบ 10 หลัก",
                  },
                  maxLength: {
                    value: 10,
                    message: "กรุณาระบุเบอร์โทรศัพท์ให้ครบ 10 หลัก",
                  },
                })}
                // onChange={(e) =>
                //   props.inputChangeHandler(e.target.value, e.target.name)
                // }
                InputProps={{
                  // inputComponent: NumberFormatTel,
                  readOnly: props.readOnly,
                }}
              />
            </Box>
          </div>
        </div>

        {/* <Divider variant="middle" /> */}
        <div className={classes.section}>
          {/* <Typography gutterBottom>ที่อยู่จัดส่งสินค้า</Typography> */}
          <div className={classes.fieldSection}>
            <Box mt={1} mb={1} p={1}>
              <TextField
                // required
                id="addressId"
                name="address"
                label="ที่อยู่"
                fullWidth
                multiline
                // value={info.address}
                helperText={errors.address && errors.address.message}
                error={!!errors.address}
                inputRef={register({
                  required: { value: true, message: "กรุณาระบุที่อยู่" },
                })}
                // onChange={(e) =>
                //   props.inputChangeHandler(e.target.value, e.target.name)
                // }
                InputProps={{
                  readOnly: props.readOnly,
                }}
              />
            </Box>
          </div>
        </div>
        {/* <Divider variant="middle" /> */}
        {props.cameFrom === "payment" ? (
          <>
            <div className={classes.section}>
              {/* <Typography gutterBottom>วิธีการชำระเงิน</Typography> */}
              <div
                className={[classes.fieldSection, classes.creditCard].join(" ")}
              >
                <Box mt={1} mb={1} p={1}>
                  <TextField
                    required
                    fullWidth
                    id="creditCardId"
                    name="creditCard"
                    label="Credit Card"
                    helperText={props.errorCreditCardMsg}
                    InputLabelProps={{ shrink: true }}
                    // value={info.creditCard}
                    onChange={props.handleCardDetailsChange}
                    InputProps={{
                      inputComponent: StripeInput,
                      inputProps: {
                        component: CardElement,
                      },
                      // inputComponent: NumberFormatCreditCard,
                    }}
                  />
                </Box>
              </div>
            </div>
            <div className={classes.section}>
              <Box m={3}>
                <Typography variant="body1">
                  (Success: 4242424242424242)
                </Typography>
                <Typography variant="body1">
                  (Fail: 4000000000000002)
                </Typography>
              </Box>
            </div>
          </>
        ) : null}
      </Paper>
    </form>
  );
};

export default UserForm;
