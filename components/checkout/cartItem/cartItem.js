import React from "react";
import NumberFormat from "react-number-format";
import {
  makeStyles,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
} from "@material-ui/core";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@material-ui/icons/IndeterminateCheckBoxOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";

const useStyles = makeStyles((theme) => ({
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      flex: 1,
    },
  },
  sectionMobile: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  cardContainer: {
    display: "flex",
    height: "150px",
    margin: "10px 0",
    justifyContent: "flex-start",
    backgroundColor: "inherit",
  },
  cardContent: {
    display: "flex",
    flex: 1,
  },
  cardDetail: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  cardAlignCenter: {
    alignItems: "center",
  },
  cardDetailMobile: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(1),
  },
  cardName: {
    flex: 2,
  },
  cover: {
    width: 150,
  },
  itemQty: {
    display: "flex",
    alignItems: "center",
  },
  mouseHover: {
    cursor: "pointer",
  },
}));

const CartItem = (props) => {
  const classes = useStyles();
  return (
    <Card className={classes.cardContainer} elevation={0} square>
      <CardMedia
        className={classes.cover}
        component="img"
        // height="140"
        src={props.image}
        title={props.model}
      />
      <div className={classes.sectionDesktop}>
        <CardContent className={classes.cardContent}>
          <div className={[classes.cardDetail, classes.cardName].join(" ")}>
            <Typography component="span" variant="body1" color="secondary">
              {props.brand}
            </Typography>
            <Typography variant="subtitle1">{props.model}</Typography>
            <Typography variant="caption">
              {/* <NumberFormat
              style={{ textDecoration: "line-through" }}
              value={props.price}
              displayType="text"
              thousandSeparator
              prefix="฿"
            /> */}
              <NumberFormat
                //   style={{ margin: "0 10px" }}
                value={props.netPrice}
                displayType="text"
                thousandSeparator
                prefix="฿"
              />{" "}
              / ชิ้น
            </Typography>
          </div>
          <div
            className={[classes.cardDetail, classes.cardAlignCenter].join(" ")}
          >
            <Typography
              className={[classes.itemQty, classes.primaryText].join(" ")}
            >
              <IconButton aria-label="decrease" onClick={props.onDecreaseItem}>
                <IndeterminateCheckBoxOutlinedIcon />
              </IconButton>
              <NumberFormat
                style={{ margin: "0 2px" }}
                value={props.quantity}
                displayType="text"
              />
              <IconButton aria-label="increase" onClick={props.onIncreaseItem}>
                <AddBoxOutlinedIcon />
              </IconButton>
            </Typography>
          </div>
          <div
            className={[
              classes.cardDetail,
              classes.cardAlignCenter,
              classes.primaryText,
            ].join(" ")}
          >
            <NumberFormat
              style={{ margin: "0 10px" }}
              value={props.netPrice}
              displayType="text"
              prefix="฿"
              thousandSeparator
            />
          </div>
          <div
            className={[
              classes.cardDetail,
              classes.cardAlignCenter,
              classes.primaryText,
            ].join(" ")}
          >
            <Typography>
              <Typography variant="caption" onClick={props.onDeleteItem}>
                <IconButton aria-label="clear">
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
              </Typography>
            </Typography>
          </div>
        </CardContent>
      </div>
      <div className={classes.sectionMobile}>
        <CardContent className={classes.cardContent}>
          <div className={classes.cardDetail}>
            <Typography
              component="span"
              variant="h6"
              style={{ display: "flex", alignItems: "baseline" }}
            >
              <Typography color="secondary">{props.brand}</Typography>
              &nbsp;{"-"}&nbsp;
              <Typography variant="subtitle1">{props.model}</Typography>
            </Typography>
            <div className={classes.cardDetailMobile}>
              <>
                {/* <Typography variant="caption">
                  <NumberFormat
                    //   style={{ margin: "0 10px" }}
                    value={props.price}
                    displayType="text"
                    thousandSeparator
                    prefix="฿"
                  />{" "}
                  / ชิ้น
                </Typography> */}
                <NumberFormat
                  value={props.netPrice}
                  displayType="text"
                  prefix="฿"
                  thousandSeparator
                />
                {/* <Typography>
                  <Typography
                    variant="caption"
                    className={classes.mouseHover}
                    onClick={props.onDeleteItem}
                  >
                    Remove
                  </Typography>
                </Typography> */}
              </>
              <>
                <Typography className={classes.itemQty} variant="body2">
                  <IconButton
                    aria-label="decrease"
                    onClick={props.onDecreaseItem}
                  >
                    <IndeterminateCheckBoxOutlinedIcon />
                  </IconButton>
                  <NumberFormat
                    style={{ margin: "0 2px" }}
                    value={props.quantity}
                    displayType="text"
                  />
                  <IconButton
                    aria-label="increase"
                    onClick={props.onIncreaseItem}
                  >
                    <AddBoxOutlinedIcon />
                  </IconButton>
                </Typography>
              </>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default CartItem;
