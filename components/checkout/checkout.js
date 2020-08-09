import {
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import NumberFormat from "react-number-format";
import { GRAPHQLAPI_ENDPOINT } from "./../../utils/constant";
import MyButton from "./../UI/Button/button";
import Processing from "./../UI/pages/processing";
import CartItem from "./cartItem/cartItem";

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

const Checkout = ({
  token,
  userId,
  cartItems,
  totalPrice,
  onUpdateCartItems,
}) => {
  const classes = useStyles();
  const router = useRouter();

  const fee = 100;
  const [processing, setProcess] = useState(false);
  const [checkoutButtonLoading, setCheckoutButtonLoading] = useState(false);

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
              deleteFromCart(productId: "${productId}", userId: "${userId}") {
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
            Authorization: "Bearer " + token,
          },
        }
      )
        .then((res) => {
          if (res.status === 200) {
            return res.data;
          }
        })
        .then((resData) => {
          // onSetCartNo(props.cartNo - qty);
          setProcess(false);
          onUpdateCartItems();
          // setCartItems(resData.data.deleteFromCart);
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  const onIncreaseItem = (e, productId) => {
    setProcess(true);
    Axios.post(
      GRAPHQLAPI_ENDPOINT,
      {
        query: `
            mutation {
              addToCart(productId: "${productId}", userId: "${userId}")
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
          return res.data;
        }
      })
      .then((resData) => {
        // const updatedCartItems = cartItems.map((el) => {
        //   if (el.productId._id === productId) {
        //     el.quantity += 1;
        //   }

        //   return el;
        // });
        onUpdateCartItems();
        setProcess(false);
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
                deleteByOneFromCart(productId: "${productId}", userId: "${userId}")
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
            return res.data;
          }
        })
        .then((resData) => {
          // setOpenSnackbar(true);
          // const updatedCartItems = cartItems.map((el) => {
          //   if (el.productId._id === productId) {
          //     el.quantity -= 1;
          //   }

          //   return el;
          // });
          onUpdateCartItems();
          setProcess(false);
          // props.onDecreaseCartNo();
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
            Authorization: "Bearer " + token,
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

export default Checkout;
