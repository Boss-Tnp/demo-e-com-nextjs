import {
  CircularProgress,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import MyButton from "./../UI/Button/button";
import * as actions from "./../../store/action/index";
import { GRAPHQLAPI_ENDPOINT } from "./../../utils/constant";
import CartItem from "./cartItem/cartItem";
import Processing from "./../UI/pages/processing";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  cartItemsContainer: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
  },
  sumContainer: {
    display: "flex",
    flexDirection: "column",
    // height: "100%",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: "#031425",
  },
  sumDisplayText: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 0",
    // color: "#7a7e83",
  },
  sumCheckoutButton: {
    display: "block",
  },
  primaryText: {
    color: "#7a7e83",
  },
  secondaryText: {
    color: "#feffff",
  },
  emptyCart: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: theme.spacing(3),
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const Checkout = (props) => {
  const classes = useStyles();
  const router = useRouter();

  const fee = 100;
  const [loading, setLoading] = useState(true);
  const [processing, setProcess] = useState(false);
  const [checkoutButtonLoading, setCheckoutButtonLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let _isMounted = true;
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (userId) {
      Axios.post(
        GRAPHQLAPI_ENDPOINT,
        {
          query: `
          query {
            getCart(userId: "${userId}") {
              _id
              productId {
                _id
                info {
                  brand model description stock
                }
                pricing {
                  price discount netPrice
                }
                imageUrl {
                  _id nameUrl
                }  
                shipping {
                  weight heels shoeTip
                }
                active
              }
              quantity
            }
          }
      `,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.status === 200) {
            return res.data;
          }
        })
        .then((resData) => {
          if (!_isMounted) {
            return;
          }
          setLoading(false);
          const updatedCartItems = [...resData.data.getCart];

          updateTotalPrice(updatedCartItems);
          setCartItems(updatedCartItems);
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      if (_isMounted) {
        setLoading(false);
      }
    }

    return () => {
      _isMounted = false;
    };
  }, []);

  useEffect(() => {
    // console.log(cartItems);
    updateTotalPrice(cartItems);
  }, [cartItems]);

  const onDeleteItem = (e, productId, qty) => {
    e.preventDefault();

    const confirm = window.confirm("คุณต้องนำสินค้านี้ออกจากตะกร้าของคุณ?");
    if (confirm) {
      setProcess(true);
      Axios.post(
        GRAPHQLAPI_ENDPOINT,
        {
          query: `
            mutation {
              deleteFromCart(productId: "${productId}", userId: "${props.userId}") {
                _id
                productId {
                  _id
                  info {
                    brand model description stock
                  }
                  pricing {
                    price discount netPrice
                  }
                  imageUrl {
                    _id nameUrl
                  }  
                  shipping {
                    weight heels shoeTip
                  }
                  active
                }
                quantity
              }
            }
          `,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + props.token,
          },
        }
      )
        .then((res) => {
          if (res.status === 200) {
            return res.data;
          }
        })
        .then((resData) => {
          props.onSetCartNo(props.cartNo - qty);
          setProcess(false);
          setCartItems(resData.data.deleteFromCart);
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  const updateTotalPrice = (updatedCartItems) => {
    const updatedTotalPrice = updatedCartItems
      .map((el) => {
        return el.productId.pricing.price * el.quantity;
      })
      .reduce((prv, curr) => prv + curr, 0);

    setTotalPrice(updatedTotalPrice);
  };

  const onIncreaseItem = (e, productId) => {
    setProcess(true);
    Axios.post(
      GRAPHQLAPI_ENDPOINT,
      {
        query: `
            mutation {
              addToCart(productId: "${productId}", userId: "${props.userId}")
            }
          `,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.token,
        },
      }
    )
      .then((res) => {
        if (res.status === 200) {
          return res.data;
        }
      })
      .then((resData) => {
        // setOpenSnackbar(true);
        const updatedItem = cartItems.map((el) => {
          if (el.productId._id === productId) {
            el.quantity += 1;
          }

          return el;
        });
        setProcess(false);
        setCartItems(updatedItem);
        props.onIncreaseCartNo();
      })
      .catch((err) => {
        alert(err);
      });
  };

  const onDecreaseItem = (e, productId, qty) => {
    if (qty === 1) {
      onDeleteItem(e, productId, qty);
    } else {
      setProcess(true);
      Axios.post(
        GRAPHQLAPI_ENDPOINT,
        {
          query: `
              mutation {
                deleteByOneFromCart(productId: "${productId}", userId: "${props.userId}")
              }
            `,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + props.token,
          },
        }
      )
        .then((res) => {
          if (res.status === 200) {
            return res.data;
          }
        })
        .then((resData) => {
          // setOpenSnackbar(true);
          const updatedItem = cartItems.map((el) => {
            if (el.productId._id === productId) {
              el.quantity -= 1;
            }

            return el;
          });
          setCartItems(updatedItem);
          setProcess(false);
          props.onDecreaseCartNo();
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  const onClickCheckoutHandle = async (e) => {
    setCheckoutButtonLoading(true);
    try {
      const { data: clientSecret } = await Axios.post(
        GRAPHQLAPI_ENDPOINT, //*100 เพราะ stripe แปลงเป็นทศนิยม 2 ตำแหน่ง เช่น 3500 => 35.00
        {
          query: `
            query {
              getClientSecret(amount: ${(totalPrice + fee) * 100})
            }
          `,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + props.token,
          },
        }
      );

      router.push({
        pathname: "/payment",
        query: {
          csc: clientSecret.data.getClientSecret,
        },
      });
    } catch (err) {
      alert(err);
    }
  };

  if (loading) {
    // return <LoadingPage />;
    return (
      <div
        style={{
          display: "flex",
        }}
      >
        <CircularProgress
          style={{
            margin: "auto",
          }}
        />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Container>
        <Grid container>
          <Paper className={classes.emptyCart}>
            <Typography>ไม่พบสินค้าในตะกร้า</Typography>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                router.push("/search");
              }}
            >
              ซื้อเลย
            </Button>
          </Paper>
        </Grid>
      </Container>
    );
  }

  return (
    <Container>
      <Processing open={processing} />
      <Grid container>
        {/* <Box flex={2}> */}
        <Grid item xs={12} md={8}>
          <Paper className={classes.cartItemsContainer} square elevation={0}>
            <Typography className={classes.secondaryText}>
              ตะกร้าสินค้า
            </Typography>
            <Divider style={{ backgroundColor: "white" }} />
            {cartItems.map((item) => {
              return (
                <CartItem
                  key={item._id}
                  brand={item.productId.info.brand}
                  model={item.productId.info.model}
                  image={item.productId.imageUrl[0].nameUrl}
                  price={item.productId.pricing.price}
                  netPrice={item.productId.pricing.netPrice * item.quantity}
                  quantity={item.quantity}
                  onDeleteItem={(e) =>
                    onDeleteItem(e, item.productId._id, item.quantity)
                  }
                  onIncreaseItem={(e) => onIncreaseItem(e, item.productId._id)}
                  onDecreaseItem={(e) =>
                    onDecreaseItem(e, item.productId._id, item.quantity)
                  }
                />
              );
            })}
          </Paper>
        </Grid>
        {/* </Box> */}
        {/* <Box flex={1}> */}
        <Grid item xs={12} md={4}>
          <Paper className={classes.sumContainer} square elevation={0}>
            <Typography className={classes.secondaryText}>Summary</Typography>
            <Divider />
            <div className={classes.sumDisplayText}>
              <Typography>รวม</Typography>
              <Typography>
                <NumberFormat
                  value={totalPrice}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix="฿"
                />
              </Typography>
            </div>
            <div className={classes.sumDisplayText}>
              <Typography>ค่าส่ง</Typography>
              <Typography>
                <NumberFormat
                  value={fee}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix="฿"
                />
              </Typography>
            </div>
            <div className={classes.sumDisplayText}>
              <Typography>ทั้งหมด</Typography>
              <Typography>
                <NumberFormat
                  value={totalPrice + fee}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix="฿"
                />
              </Typography>
            </div>
            <div className={classes.sumCheckoutButton}>
              <MyButton
                color="secondary"
                fullWidth
                onClick={onClickCheckoutHandle}
                loading={checkoutButtonLoading}
              >
                ไปหน้าชำระเงิน
              </MyButton>
              {/* <Payment {...props} price={totalPrice + fee} /> */}
            </div>
          </Paper>
        </Grid>
        {/* </Box> */}
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.authReducer.userId,
    token: state.authReducer.token,
    cartNo: state.cartReducer.cartNo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetCartNo: (cartNo) => dispatch(actions.setCartNo(cartNo)),
    onIncreaseCartNo: () => dispatch(actions.increaseCartNo()),
    onDecreaseCartNo: () => dispatch(actions.decreaseCartNo()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
