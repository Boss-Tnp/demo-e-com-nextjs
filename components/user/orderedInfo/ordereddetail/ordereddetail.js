import { Box } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import Axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { GRAPHQLAPI_ENDPOINT } from "../../../../utils/constant";
import OrderedCard from "./orderedcard/orderedcard";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
}));

const OrderedDetail = ({ token, userId }) => {
  const classes = useStyles();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let _isMounted = true;
    const orderId = router.query.orderedId;

    if (userId) {
      Axios.post(
        GRAPHQLAPI_ENDPOINT,
        {
          query: `
            query {
                getOrder(userId: "${userId}",orderId: "${orderId}") {
                    _id
                    products {
                        _id
                        quantity
                        product {
                            info{
                                brand model description
                            }
                            imageUrl {
                                nameUrl
                            }
                            pricing {
                                netPrice
                            }
                        }
                    }
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
          if (!_isMounted) {
            return;
          }

          if (res.status === 200) {
            return res.data;
          }
        })
        .then((resData) => {
          setLoading(false);
          setProducts(resData.data.getOrder.products);
        })
        .catch((err) => {});
    } else {
      setLoading(false);
    }

    return () => {
      _isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <Grid container>
        {[0, 1, 2, 4, 5, 6].map((el) => {
          return (
            <Grid key={el} item lg={4} md={4} sm={6} xs={12}>
              <Box m={1}>
                <Skeleton variant="rect" height={100} />
                <Box pt={0.5}>
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    );
  }

  return (
    // <div className={classes.root}>
    <Grid container>
      {products.map((el) => {
        return (
          <Grid item xs={12} sm={6} md={6} lg={4} key={el._id}>
            <OrderedCard
              brand={el.product.info.brand}
              model={el.product.info.model}
              imageUrl={el.product.imageUrl[0].nameUrl}
              price={el.product.pricing.netPrice}
              quantity={el.quantity}
            ></OrderedCard>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default OrderedDetail;
