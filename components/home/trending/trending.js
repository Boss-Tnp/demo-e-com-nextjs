import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "next/router";
import React from "react";
import Item from "./../../UI/Item/item";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "16px",
    color: "white",
  },
  title: {
    padding: theme.spacing(1),
    textAlign: "center",
  },
  menusContainer: {
    margin: "16px 0",
  },
  menus: {
    padding: "16px",
  },
  activeMenu: {
    fontWeight: "bold",
  },
  itemsContainer: {
    // [theme.breakpoints.up("xs")]: {
    //   margin: "0 15vw",
    // },
    // [theme.breakpoints.up("sm")]: {
    //   margin: "0 10vw",
    // },
    // [theme.breakpoints.up("md")]: {
    //   margin: "0 5vw",
    // },
    // [theme.breakpoints.up("lg")]: {
    //   margin: "0 15vw",
    // },
  },
}));

function Shuffle(activeProducts) {
  const arr = [...activeProducts];
  for (
    var j, x, i = arr.length;
    i;
    j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x
  );
  return arr;
}

const Trending = (props) => {
  const classes = useStyles();
  const activeProducts = Shuffle(props.activeProducts);

  // useEffect(() => console.log("Effect from Trending.js"));

  if (props.activeProducts.length === 0) {
    return <></>;
    // return (
    //   <div
    //     style={{
    //       display: "flex",
    //     }}
    //   >
    //     <CircularProgress
    //       style={{
    //         margin: "auto",
    //       }}
    //     />
    //   </div>
    // );
  }

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Typography className={classes.title} variant="h5">
          สินค้าแนะนำ
        </Typography>
      </Grid>

      {/* <Grid item xs={12}>
        <Grid container justify="center" className={classes.menusContainer}>
          <Grid item>
            <Typography className={classes.menus} variant="body1">
              Best Seller
            </Typography>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item>
            <Typography
              className={[classes.menus, classes.activeMenu].join(" ")}
              variant="body1"
            >
              New
            </Typography>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item>
            <Typography className={classes.menus} variant="body1">
              Feature
            </Typography>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item>
            <Typography className={classes.menus} variant="body1">
              Special
            </Typography>
          </Grid>
        </Grid>
      </Grid> */}

      <Grid item xs={12} className={classes.itemsContainer}>
        <Grid container alignItems="center">
          {activeProducts.slice(0, 8).map((prd) => {
            return (
              <Grid key={prd._id} item lg={4} md={4} sm={6} xs={12}>
                <Item
                  {...props}
                  id={prd._id}
                  brand={prd.info.brand}
                  model={prd.info.model}
                  desc={prd.info.description}
                  price={prd.pricing.price}
                  discount={prd.pricing.discount}
                  netPrice={prd.pricing.netPrice}
                  imageUrl={prd.imageUrl}
                  comeFrom="home"
                  role={props.role}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withRouter(Trending);
