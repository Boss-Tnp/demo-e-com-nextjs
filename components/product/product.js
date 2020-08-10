import { Grid, Paper, Snackbar } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import Axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import useCart from "../../hooks/useCart";
import * as actions from "./../../store/action/index";
import { GRAPHQLAPI_ENDPOINT } from "./../../utils/constant";
import Description from "./Description/description";
import ImageGrid from "./ImageGrid/imageGrid";

const useStyles = makeStyles((theme) => ({
  paperContainer: {
    minWidth: "100%",
    display: "flex",
    flexWrap: "wrap",
    marginBottom: theme.spacing(2),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Product = ({ product, token, role, userId }) => {
  const router = useRouter();
  const classes = useStyles();
  const dispatch = useDispatch();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [addButtonLoading, setAddButtonLoading] = useState(false);
  const { mutate } = useCart();

  const onAddProductToCart = () => {
    if (token) {
      setAddButtonLoading(true);
      Axios.post(
        GRAPHQLAPI_ENDPOINT,
        {
          query: `
            mutation {
              addToCart(productId: "${product._id}", userId: "${userId}")
            }
          `,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
        .then((res) => {
          if (res.status === 200) {
            setOpenSnackbar(true);
            setAddButtonLoading(false);
            mutate();
          } else {
            alert("เกิดข้อผิดพลาด");
          }
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      router.push("/login");
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <Container>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          เพิ่มลงในตะกร้าเรียบร้อยแล้ว
        </Alert>
      </Snackbar>
      <Paper className={classes.paperContainer} square elevation={3}>
        <Grid container>
          <Grid item sm={6} xs={12} style={{ backgroundColor: "#0e1e2f" }}>
            <ImageGrid imageUrl={product.imageUrl} />
          </Grid>
          <Grid item sm={6} xs={12} style={{ backgroundColor: "#031425" }}>
            <Description
              onAddProductToCart={onAddProductToCart}
              product={product}
              role={role}
              addButtonLoading={addButtonLoading}
            />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.authReducer.userId,
    token: state.authReducer.token,
    role: state.authReducer.role,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIncreaseCartNo: () => dispatch(actions.increaseCartNo()),
  };
};

// export default connect(mapStateToProps, mapDispatchToProps)(Product);
export default Product;
