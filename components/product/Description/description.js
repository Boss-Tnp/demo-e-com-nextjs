import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import NumberFormat from "react-number-format";
import MyButton from "./../../UI/Button/button";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: "1",
    flexWrap: "wrap",
    marginLeft: 30,
    padding: theme.spacing(2),

    // "& > *": {
    //   margin: theme.spacing(1),
    //   width: theme.spacing(16),
    //   height: theme.spacing(16),
    // },
  },
  inputNumber: {
    width: "100px",
  },
  primaryText: {
    color: "#7a7e83",
  },
  secondaryText: {
    color: "#feffff",
  },
}));

const Description = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid container item xs={12}>
          <Typography variant="h5" className={classes.primaryText}>
            {props.product.info.brand} &nbsp;-&nbsp; {props.product.info.model}
          </Typography>
        </Grid>
        <Grid container item xs={12}>
          <Typography
            variant="body1"
            component="span"
            className={classes.primaryText}
          >
            คำอธิบาย : &nbsp;
            <Typography
              variant="body1"
              component="span"
              className={classes.secondaryText}
            >
              {props.product.info.description}
            </Typography>
          </Typography>
        </Grid>
        <Grid container item xs={12}>
          <Typography
            variant="body1"
            component="span"
            className={classes.primaryText}
          >
            ความหนาของส้นรองเท้า (มม.) :{" "}
            <Typography
              variant="body1"
              component="span"
              className={classes.secondaryText}
            >
              {props.product.shipping.heels}
            </Typography>
          </Typography>
        </Grid>

        <Grid container item xs={12}>
          <Typography
            variant="body1"
            component="span"
            className={classes.primaryText}
          >
            ความหนาของปลายรองเท้า (มม.) :{" "}
            <Typography
              variant="body1"
              component="span"
              className={classes.secondaryText}
            >
              {props.product.shipping.shoeTip}
            </Typography>
          </Typography>
        </Grid>
        <Grid container item xs={12}>
          <Typography
            variant="body1"
            component="span"
            className={classes.primaryText}
          >
            น้ำหนัก (กรัม) :{" "}
            <Typography
              variant="body1"
              component="span"
              className={classes.secondaryText}
            >
              {props.product.shipping.weight}
            </Typography>
          </Typography>
        </Grid>
        {/* <Grid container item xs={12}>
          <Typography
            variant="body1"
            component="span"
            className={classes.primaryText}
          >
            สต๊อก :{" "}
            <Typography
              variant="body1"
              component="span"
              className={classes.secondaryText}
            >
              {props.product.info.stock > 0 ? "มีสินค้า" : "สินค้าหมด"}
            </Typography>
          </Typography>
        </Grid> */}
        <Grid container item xs={12}>
          <Typography variant="body1" className={classes.primaryText}>
            ราคา :{" "}
            <NumberFormat
              className={classes.secondaryText}
              value={props.product.pricing.netPrice}
              displayType={"text"}
              thousandSeparator={true}
              prefix="฿"
            />
          </Typography>
        </Grid>
        {/* <Grid container item xs={12}>
          <Grid item xs={2}>
            <Typography variant="subtitle1">จำนวน :</Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              className={classes.inputNumber}
              inputProps={{ min: 1, style: { textAlign: "center" } }}
              id="standard-basic"
              size="small"
              type="number"
              defaultValue={1}
              variant="outlined"
              onKeyDown={(e) => {
                return e.keyCode !== 69;
              }}
            />
          </Grid>
        </Grid> */}
        <Grid
          container
          item
          xs={12}
          spacing={3}
          direction="column"
          justify="center"
          alignItems="stretch"
        >
          <Grid item>
            <MyButton
              color="secondary"
              fullWidth
              disabled={props.role === "admin"}
              onClick={props.onAddProductToCart}
              loading={props.addButtonLoading}
            >
              หยิบใส่ตะกร้า
            </MyButton>
          </Grid>
          {/* <Grid item>
            <Button
              variant="contained"
              color="secondary"
              // onClick={props.onAddProductToCart}
            >
              ชำระเงินทันที
            </Button>
          </Grid> */}
        </Grid>
      </Grid>
      {/* <Typography variant="h5">Nike Air - 270</Typography>
      <br />
      
      <Typography>
        <Typography variant="h6" component="label">
          สต๊อก : &nbsp;
        </Typography>
        <Typography variant="subtitle2" component="label" gutterBottom>
          มีสินค้า
        </Typography>
      </Typography>
      <Typography>
        <Typography variant="h6" component="label">
          ราคา : &nbsp;
        </Typography>
        <Typography variant="h4" component="label" gutterBottom>
          3,200.00 บาท
        </Typography>
      </Typography> */}
    </div>
  );
};

export default Description;
