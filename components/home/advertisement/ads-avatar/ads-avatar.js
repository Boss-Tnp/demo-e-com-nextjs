import { Avatar, Typography } from "@material-ui/core";
import { amber } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  text: {
    textAlign: "center",
    color: "white",
  },
  avatar: {
    margin: "auto",
    color: "#fff",
    backgroundColor: amber[800],
  },
}));

const Avartar = (props) => {
  const classes = useStyles();

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Avatar className={classes.avatar}>{props.children}</Avatar>
      </Grid>
      <Grid item xs={12}>
        <Typography className={classes.text} variant="subtitle1">
          {props.title}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography className={classes.text} variant="caption" display="block">
          {props.detail}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Avartar;
