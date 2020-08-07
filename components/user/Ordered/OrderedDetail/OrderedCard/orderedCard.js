import ButtonBase from "@material-ui/core/ButtonBase";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import NumberFormat from "react-number-format";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    // maxWidth: 300,
  },
  image: {
    // width: 128,
    // height: 128,
    flex: 1,
  },
  text: {
    flex: 2,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

const OrderedCard = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item className={classes.image}>
            <ButtonBase>
              <img
                className={classes.img}
                alt={props.model}
                src={props.imageUrl}
              />
            </ButtonBase>
          </Grid>
          <Grid item container className={classes.text}>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {props.brand}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {props.model}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ชิ้นละ&nbsp;
                  <NumberFormat
                    value={props.price}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix="฿"
                  />
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  จำนวน&nbsp;
                  <NumberFormat
                    value={props.quantity}
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                  &nbsp;ชิ้น
                </Typography>
                <Typography variant="subtitle1" color="secondary">
                  <NumberFormat
                    value={props.quantity * props.price}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix="฿"
                  />
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default OrderedCard;
