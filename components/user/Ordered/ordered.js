import {
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  useTheme,
  Container,
  Grid,
  Typography,
  CircularProgress,
} from "components/user/ordered/node_modules/@material-ui/core";
import FirstPageIcon from "components/user/ordered/node_modules/@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "components/user/ordered/node_modules/@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "components/user/ordered/node_modules/@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "components/user/ordered/node_modules/@material-ui/icons/LastPage";
import Axios from "components/user/ordered/node_modules/axios";
import moment from "components/user/ordered/node_modules/moment";
import PropTypes from "components/user/ordered/node_modules/prop-types";
import React, {
  useEffect,
  useState,
} from "components/user/ordered/node_modules/react";
import NumberFormat from "react-number-format";
import { GRAPHQLAPI_ENDPOINT } from "../../../utils/constant";
import { useRouter } from "components/user/ordered/node_modules/next/router";

const useStyles = makeStyles((theme) => ({
  topContainer: {
    padding: "10px 0",
  },
  table: {
    minWidth: 650,
  },
  name: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    marginRight: "16px",
  },
  emptyOrder: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: theme.spacing(3),
  },
}));

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const Ordered = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [ordered, setOrdered] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
            getOrders(userId: "${userId}") {
              _id
              createdAt
              products {
                _id
                quantity
                product {
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

          // console.log(res);
        })
        .then((resData) => {
          setLoading(false);
          setOrdered(resData.data.getOrders);
        })
        .catch((err) => {});
    } else {
      setLoading(false);
    }

    return () => {
      _isMounted = false;
    };
  }, []);

  const onClickHandler = (e, orderId) => {
    e.preventDefault();
    // console.log(props);
    router.push(`/user/ordered/` + orderId);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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

  if (ordered.length === 0) {
    return (
      <Container>
        <Grid container>
          <Paper className={classes.emptyOrder}>
            <Typography>ไม่พบประวัติการซื้อสินค้า</Typography>
          </Paper>
        </Grid>
      </Container>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {/* <TableCell align="center">ครั้งที่</TableCell> */}
            <TableCell align="center">วันที่</TableCell>
            <TableCell align="center">ราคา</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? ordered.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : ordered
          ).map((order, index) => {
            return (
              <TableRow
                key={order._id}
                onClick={(e) => onClickHandler(e, order._id)}
              >
                {/* <TableCell component="th" scope="row" align="center">
                  {index + 1}
                </TableCell> */}
                <TableCell component="th" scope="row" align="center">
                  {/* {moment().tz("Asia/Bangkok").format()} */}
                  {moment(new Date(order.createdAt)).format("LLLL")}
                  {/* {moment(order.createdAt).format("LLLL")} */}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  <NumberFormat
                    value={order.products
                      .map((product) => {
                        return (
                          product.quantity * product.product.pricing.netPrice
                        );
                      })
                      .reduce((prv, curr) => prv + curr, 0)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix="฿"
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, { label: "All", value: -1 }]}
              // colSpan={1}
              count={ordered.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default Ordered;
