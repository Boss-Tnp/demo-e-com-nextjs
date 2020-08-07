import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // backgroundColor: "#FADACD",
  },
  paperContainer: {
    display: "flex",
    height: "90vh",
    alignItems: "center",
    flexWrap: "wrap",
    // backgroundColor: "#191a5b",
  },
  text: {
    color: "white",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
  },
  imgContainer: {
    flex: 1,
    display: "flex",
    padding: theme.spacing(2),
  },
  img: {
    height: "100%",
    width: "100%",
    minWidth: "250px",
    transform: "translate(-20px, 0) rotate(-25deg)",
  },
}));

const Promotion = () => {
  const classes = useStyles();

  return (
    <Container>
      {/* <Grid container>
        <Grid item xs={12}> */}
      <div className={classes.paperContainer}>
        <div className={classes.text}>
          <Typography variant="h2">Demo Project</Typography>
          <Typography variant="subtitle1">
            Praesent tincidunt fringilla metus, id pharetra ipsum volutpat quis.
            Curabitur libero lectus, imperdiet a luctus at, faucibus nec tortor.
            Vivamus vel ultricies enim.
          </Typography>
          {/* <MyButton color="secondary">Check out</MyButton> */}
        </div>

        <div className={classes.imgContainer}>
          <Typography
            variant="h6"
            component="img"
            className={classes.img}
            src="https://firebasestorage.googleapis.com/v0/b/e-commerce-24970.appspot.com/o/banner-img.png?alt=media&token=f9a798c3-165d-4ebf-814c-3b9108790fb6"
          ></Typography>
        </div>
      </div>
      {/* <img
            src="https://firebasestorage.googleapis.com/v0/b/e-commerce-24970.appspot.com/o/New-Collection.png?alt=media&token=492d9e70-eece-40a7-82cd-13ece4752ec3"
            alt="promotion"
            style={{ width: "100%" }}
          ></img> */}
      {/* </Grid>
      </Grid> */}
    </Container>
  );
};

export default Promotion;