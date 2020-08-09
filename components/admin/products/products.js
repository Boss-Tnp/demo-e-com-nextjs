import {
  Avatar,
  CircularProgress,
  Grid,
  IconButton,
  ListItemText,
  TableFooter,
  TablePagination,
  Typography,
  useTheme,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AddIcon from "@material-ui/icons/Add";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { useState } from "react";
import NumberFormat from "react-number-format";
import { useDispatch } from "react-redux";
import * as actions from "./../../../store/action/index";
import { ACTIVE_COLOR, INACTIVE_COLOR } from "./../../../utils/constant";
import MyButton from "./../../UI/Button/button";

const useStyles = makeStyles((theme) => ({
  productsContainer: {
    display: "flex",
    flexDirection: "column",
    // [theme.breakpoints.up("xs")]: {
    //   flexDirection: "column",
    // },
    // [theme.breakpoints.up("md")]: {
    //   flexDirection: "row",
    //   alignItems: "stretch",
    // },
    marginBottom: theme.spacing(3),
  },
  content: {
    flexGrow: 1,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  topContainer: {
    padding: "10px 0",
  },
  tableContainer: {
    backgroundColor: "#131931",
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
  primaryText: {
    color: "#7a7e83",
  },
  secondaryText: {
    color: "#feffff",
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

function StatusDot({ status }) {
  return status === "active" ? (
    <FiberManualRecordIcon style={{ color: ACTIVE_COLOR, fontSize: "1rem" }} />
  ) : (
    <FiberManualRecordIcon
      style={{ color: INACTIVE_COLOR, fontSize: "1rem" }}
    />
  );
}

const Products = ({ products }) => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const [tableState, setTableState] = useState({
    page: 0,
    rowsPerPage: 5,
  });

  const handleChangePage = (event, newPage) => {
    setTableState({
      ...tableState,
      page: newPage,
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setTableState({
      ...tableState,
      page: 0,
      rowsPerPage: parseInt(event.target.value, 10),
    });
  };

  // useEffect(() => {
  //   console.log(products);
  // }, [products]);

  const onSelectProductHandler = (event, product) => {
    // console.log(product);
    // sessionStorage.setItem("prd", JSON.stringify(product));
    dispatch(actions.setAdminSelectedProduct(product));
    router.push(router.pathname + "/" + product._id);
    // props.history.push({
    //   pathname: props.match.path + "/product",
    //   search: "?prd=" + product._id,
    //   product: product,
    // });
  };

  const onClickAddProductHandler = () => {
    router.push(router.pathname + "/new_product");
    // props.history.push({
    //   pathname: props.match.path + "/new-product",
    // });
  };

  if (products.length === 0) {
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

  return (
    <div className={classes.productsContainer}>
      <div className={classes.content}>
        <Grid
          container
          justify="space-between"
          className={classes.topContainer}
        >
          {/* <MySearchField></MySearchField> */}
          <MyButton
            color="secondary"
            icon={<AddIcon />}
            onClick={onClickAddProductHandler}
          >
            เพิ่มสินค้า
          </MyButton>
        </Grid>

        <TableContainer
          component={Paper}
          square
          className={classes.tableContainer}
        >
          <Table className={classes.table}>
            <colgroup>
              <col style={{ width: "30%" }} />
              <col style={{ width: "30%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "5%" }} />
              <col style={{ width: "5%" }} />
            </colgroup>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Discount&nbsp;(%)</TableCell>
                <TableCell align="right">Net&nbsp;Price</TableCell>
                <TableCell align="center">Stock</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(tableState.rowsPerPage > 0
                ? products.slice(
                    tableState.page * tableState.rowsPerPage,
                    tableState.page * tableState.rowsPerPage +
                      tableState.rowsPerPage
                  )
                : products
              ).map((row) => (
                <TableRow
                  key={row._id}
                  hover
                  onClick={(e) => onSelectProductHandler(e, row)}
                >
                  <TableCell>
                    <div className={classes.name}>
                      <div className={classes.avatar}>
                        {row.imageUrl[0] ? (
                          <Avatar src={row.imageUrl[0]?.nameUrl} alt="img" />
                        ) : (
                          <Avatar>-</Avatar>
                        )}
                      </div>

                      {/* <Typography component="p">{row.info.brand}</Typography> */}
                      <ListItemText
                        primary={
                          <Typography color="secondary">
                            {row.info.brand}
                          </Typography>
                        }
                        secondary={<Typography>{row.info.model}</Typography>}
                      />
                    </div>
                  </TableCell>
                  <TableCell
                    scope="row"
                    style={{
                      maxWidth: 100,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {row.info.description}
                  </TableCell>
                  <TableCell align="right">
                    <NumberFormat
                      value={row.pricing.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix="฿"
                    />
                  </TableCell>
                  <TableCell align="right">{row.pricing.discount}</TableCell>
                  <TableCell align="right">
                    <NumberFormat
                      value={row.pricing.netPrice}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix="฿"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <NumberFormat
                      value={row.info.stock}
                      displayType={"text"}
                      thousandSeparator={true}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {row.active ? <StatusDot status="active" /> : <StatusDot />}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, { label: "All", value: -1 }]}
                  // colSpan={1}
                  count={products.length}
                  rowsPerPage={tableState.rowsPerPage}
                  page={tableState.page}
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
      </div>
    </div>
  );
};

export default Products;
