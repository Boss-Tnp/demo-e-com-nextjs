import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import PaymentOutlinedIcon from "@material-ui/icons/PaymentOutlined";
import PublicOutlinedIcon from "@material-ui/icons/PublicOutlined";
import WatchLaterOutlinedIcon from "@material-ui/icons/WatchLaterOutlined";
import React from "react";
import MyAvatar from "./ads-avatar/ads-avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  title: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: "white",
  },
}));

const Advertisement = () => {
  const classes = useStyles();

  return (
    <Grid className={classes.root} container>
      {/* <div style={{ height: "150px", overflow: "hidden" }}>
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          style={{ height: "100%", width: "100%" }}
        >
          <path
            d="M-9.37,113.78 C139.61,172.00 271.49,-49.99 557.22,193.71 L500.00,0.00 L0.00,0.00 Z"
            style={{ stroke: "none", fill: "#08f" }}
          ></path>
        </svg>
      </div> */}
      <Grid item xs={12}>
        <Typography className={classes.title} variant="h5">
          Lorem Ipsum
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography className={classes.title} variant="subtitle1">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly
          believable.There are many variations of passages of Lorem Ipsum
          available, but the majority have suffered alteration in some form, by
          injected humour, or on't look even slightly believable.
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <MyAvatar title="Free Shipping" detail="Free Shipping On All Order">
          <PublicOutlinedIcon />
        </MyAvatar>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <MyAvatar title="Support 24/7" detail="We Support 24 Hours A Day">
          <WatchLaterOutlinedIcon />
        </MyAvatar>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <MyAvatar title="Payment 100% Secure" detail="Payment 100% Secure">
          <CheckCircleOutlineOutlinedIcon />
        </MyAvatar>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <MyAvatar
          avatar={PaymentOutlinedIcon}
          title="Payment Method"
          detail="Secure Payment"
        ></MyAvatar>
      </Grid>
    </Grid>
  );
};

export default Advertisement;
