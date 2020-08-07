import { CircularProgress } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { green } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
// import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  button: {
    // margin: theme.spacing(1),
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
    // width: "100%",
    // flex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

// const StyledButton = styled(Button)``;

const MyButton = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Button
        // {...props}
        variant="contained"
        fullWidth={props.fullWidth}
        type={props.type}
        color={props.color}
        className={classes.button}
        startIcon={props.icon}
        onClick={props.onClick}
        disabled={props.disabled || props.loading}
      >
        {props.children}
      </Button>
      {props.loading ? (
        <CircularProgress size={24} className={classes.buttonProgress} />
      ) : null}
    </div>
  );
};

export default MyButton;
