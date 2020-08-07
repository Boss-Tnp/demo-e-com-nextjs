// import React from "react";

// const Item = () => {
//   return <></>;
// };

// export default Item;

import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import NumberFormat from "react-number-format";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      // width: 250,
      height: 250,
      // margin: `${theme.spacing(2)}px auto`,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundColor: "#f5f5f5",
      "&:hover": {
        cursor: "pointer",
        // transform: "scale(1.04)",
        // boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
      },
    },
    media: {
      height: "200px",
      // width: "200px",
      // margin: "-30px 0",
      // paddingTop: "100%", // 16:9
      // paddingTop: "56.25%", // 16:9
    },
    content: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      alignItems: "center",
      color: "#050b25",
      position: "relative",
    },
    lazyImage: {
      position: "absolute",
      height: "100%",
    },
    text: {
      position: "absolute",
      zIndex: 1,
      left: theme.spacing(3),
    },
  })
);

export default function Item(props) {
  const classes = useStyles();
  const router = useRouter();

  const onSelectProductHandler = () => {
    router.push({
      pathname: "/product/" + props.id,
    });
    // props.history.push({
    //   pathname: "/product",
    //   search: "?prd=" + props.id,
    // });
  };
  // ``
  // <Link to={{ pathname: "/product?prd=" + props.id }}>
  return (
    <Card
      className={classes.root}
      // style={{ backgroundImage: `url(${props.imageUrl[0].nameUrl})` }}
      elevation={0}
      square
    >
      {/* <CardHeader
        // action={
        //   <IconButton aria-label="add to favorites" color="secondary">
        //     <FavoriteBorderIcon />
        //   </IconButton>
        // }
        title={props.brand}
      /> */}
      {/* <CardMedia
        className={classes.media}
        image={props.imageUrl[0] ? props.imageUrl[0].nameUrl : ""}
        onClick={onSelectProductHandler}
        // title="Paella dish"
      /> */}
      <CardContent className={classes.content} onClick={onSelectProductHandler}>
        <LazyLoadImage
          className={classes.lazyImage}
          alt={props.imageUrl[0].nameUrl}
          // effect="blur"
          src={props.imageUrl[0].nameUrl}
        ></LazyLoadImage>
        <div className={classes.text}>
          <Typography variant="caption" color="secondary">
            {props.brand}
          </Typography>
          <Typography variant="subtitle1" component="h6">
            {props.model}
          </Typography>
          {props.discount > 0 ? (
            <Typography
              variant="caption"
              style={{ textDecoration: "line-through" }}
            >
              <NumberFormat
                value={props.price}
                displayType={"text"}
                thousandSeparator={true}
                prefix="฿"
              />
            </Typography>
          ) : null}
          <Typography variant="body1" color="secondary">
            <NumberFormat
              value={props.netPrice}
              displayType={"text"}
              thousandSeparator={true}
              prefix="฿"
            />
          </Typography>
        </div>
      </CardContent>
      {/* {props.comeFrom === "home" && props.role === "user" ? (
        <CardActions>
          <Button variant="contained" color="secondary" fullWidth>
            add to cart
          </Button>
        </CardActions>
      ) : null} */}
    </Card>
    // </Link>
  );
}
