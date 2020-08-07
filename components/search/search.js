import {
  Box,
  Checkbox,
  Collapse,
  Container,
  Divider,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Select,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import SearchIcon from "@material-ui/icons/Search";
import Pagination from "@material-ui/lab/Pagination";
import Skeleton from "@material-ui/lab/Skeleton";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQueryState } from "react-router-use-location-state";
import Item from "./../I/Item/item";
import * as actions from "./../store/action/index";

const useStyles = makeStyles((theme) => ({
  container: {
    // backgroundColor: constant.CONTAINER_BG_COLOR,
    marginBottom: theme.spacing(2),
  },
  filterContainer: {
    // width: "100%",
    // height: "500px",
    // backgroundColor: "#0e1e2f",
  },
  resultContainer: {
    // width: "100%",
    minHeight: "500px",
    padding: "0 20px",
    // backgroundColor: "#142d46",
  },
  chipSection: {
    display: "flex",
    // justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  searchSection: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(2),
    },
  },
  resultSection: {
    padding: "20px 0",
  },
  primaryText: {
    color: "#7a7e83",
  },
  secondaryText: {
    color: "#feffff",
  },
  paginator: {
    display: "flex",
    justifyContent: "center",
    paddingBottom: theme.spacing(2),
  },
  sorting: {
    minWidth: 120,
  },
  sortingSelect: {
    width: "100%",
  },
  nestedList: {
    display: "flex",
    flexWrap: "wrap",
  },
}));

const priceRange = [
  {
    name: "<1000",
    label: "น้อยกว่า 1,000 บาท",
  },
  {
    name: "1000-3000",
    label: "1,000 - 3,000 บาท",
  },
  {
    name: "3000-5000",
    label: "3,000 - 5,000 บาท",
  },
  {
    name: "5000-7000",
    label: "5,000 - 7,000 บาท",
  },
  {
    name: ">7000",
    label: "มากกว่า 7,000 บาท",
  },
];

const isPriceInRangeArray = (arr, price) => {
  // ex. arr = ['1000-3000','5000-7000','>7000']
  // price = 1200 return true
  // price = 1000 return true
  // price = 4500 return false

  let result = false;
  for (let i = 0; i < arr.length; i++) {
    let min = 9999999;
    let max = 0;
    if (arr[i].substr(0, 1) === ">") {
      min = parseInt(arr[i].substr(1));
      max = 1000000;
    } else if (arr[i].substr(0, 1) === "<") {
      min = 0;
      max = parseInt(arr[i].substr(1));
    } else {
      min = parseInt(arr[i].substr(0, arr[i].search("-")));
      max = parseInt(arr[i].substr(arr[i].search("-") + 1));
    }

    result = price >= min && price <= max ? true : false;

    if (result === true) return true;
  }

  return result;
};

const brands = [
  {
    name: "Adidas",
    label: "Adidas",
  },
  {
    name: "Nike",
    label: "Nike",
  },
  {
    name: "Jordan",
    label: "Jordan",
  },
  {
    name: "Reebok",
    label: "Reebok",
  },
];

// const FETCH_SUCCESS = "FETCH_SUCCESS";
// const FETCH_FAILURE = "FETCH_FAILURE";
const TOGGLE_PRICE_TAB = "TOGGLE_PRICE_TAB";
const TOGGLE_BRANDS_TAB = "TOGGLE_BRANDS_TAB";
const SET_FILTERPRODUCT = "SET_FILTERPRODUCT";

const reducer = (state, action) => {
  switch (action.type) {
    // case FETCH_SUCCESS:
    //   return { ...state, loading: false, products: action.payload };
    // case FETCH_FAILURE:
    //   return { ...state, loading: false, products: [] };
    case TOGGLE_PRICE_TAB:
      return { ...state, openPrice: !state.openPrice };
    case TOGGLE_BRANDS_TAB:
      return { ...state, openBrands: !state.openBrands };
    case SET_FILTERPRODUCT:
      return { ...state, filterProducts: action.payload };
    default:
      throw new Error();
  }
};

const emptyArray = [];

export const Search = (props) => {
  const router = useRouter();
  const { query } = router;

  const classes = useStyles();
  const activeProducts = useSelector(
    (state) => state.productsReducer.activeProducts
  );

  const [state, dispatch] = useReducer(reducer, {
    productsPerPage: 6,
    openPrice: false,
    openBrands: true,
    filterProducts: [],
  });
  // const [products, setProducts] = useState([]);
  // const [sortProducts, setSortProducts] = useQueryState("sort", 1);

  //https://github.com/facebook/react/issues/18123
  // ถ้า pass [] brands: withDefault(ArrayParam, [])
  // ไปตรงๆมันจะไม่ได้ คิดว่าน่าจะเป็นเพราะ js มันจะสร้าง empty array มาใหม่ทุกรอบ
  // ทำให้ React มองว่ามันไม่เหมือนเดิม useEffect เลยรันทุกรอบ
  // const emptyArray = useMemo(() => {
  //   return [];
  // }, []);

  // const [queryParams, setQueryParams] = useQueryParams({
  //   txt: withDefault(StringParam, ""),
  //   brands: withDefault(ArrayParam, emptyArray),
  //   page: withDefault(NumberParam, 1),
  //   price: withDefault(DelimitedArrayParam, emptyArray),
  // });

  // console.log(query);

  const [queryParams, setQueryParams] = useState({
    txt: "",
    brands: [],
    page: 1,
    price: [],
    sort: 1,
  });

  // useEffect(() => {
  //   console.log(query);
  //   console.log(queryParams);
  //   // setQueryParams({
  //   //   txt: query.txt || "",
  //   //   brands: [query.brands],
  //   //   page: Number(query.page) || 1,
  //   //   price: query.price || [],
  //   //   sort: Number(query.sort) || 1,
  //   // });
  // }, [query]);

  // console.log(props);

  // useEffect(() => {
  //   console.log(queryParams);
  // }, [queryParams]);

  const filterPrds = useCallback(() => {
    const originalProducts = [...activeProducts];

    return originalProducts.filter((el) => {
      let result = false;
      if (queryParams.brands.length === 0) {
        if (
          el.info.brand.toLowerCase().includes(queryParams.txt) ||
          el.info.model.toLowerCase().includes(queryParams.txt)
        ) {
          result = true;
        }
      } else {
        if (
          (el.info.brand.toLowerCase().includes(queryParams.txt) ||
            el.info.model.toLowerCase().includes(queryParams.txt)) &&
          queryParams.brands.indexOf(el.info.brand) > -1
        ) {
          result = true;
        }
      }

      if (result === true && queryParams.price.length > 0) {
        result = isPriceInRangeArray(queryParams.price, el.pricing.netPrice);
      }

      return result;
    });
  }, [queryParams.brands, queryParams.price, queryParams.txt, activeProducts]);

  // useEffect(() => console.log("Effect from Search.js: "));
  // useEffect(() => console.log(state), [state]);

  useEffect(() => {
    if (activeProducts.length > 0) {
      const filteredProduct = filterPrds();
      dispatch({ type: SET_FILTERPRODUCT, payload: filteredProduct });
    }
  }, [filterPrds, activeProducts.length]);

  // // useEffect(() => {
  // //   const filteredProduct = filterPrds();
  // //   setFilterProducts(filteredProduct);
  // // }, [JSON.stringify(queryParams)]);
  // // be careful, queryParams must be small inputs https://github.com/facebook/react/issues/14476#issuecomment-471199055

  const onSearchChangeHandler = (e) => {
    router.push(
      {
        pathname: "/search",
        query: {
          ...router.query,
          page: 1,
          txt: e.target.value.toLowerCase(),
        },
      },
      undefined,
      { shallow: true }
    );

    setQueryParams({
      ...queryParams,
      txt: e.target.value.toLowerCase(),
      page: 1,
    });
  };

  const onCheckBrandsHandler = (brand) => {
    // router.push(
    //   {
    //     pathname: "/search",
    //     query: {
    //       ...router.query,
    //       page: 1,
    //       brands: queryParams.brands.includes(brand)
    //         ? queryParams.brands.filter((t) => t !== brand)
    //         : [...queryParams.brands, brand],
    //     },
    //   },
    //   undefined,
    //   { shallow: true }
    // );

    setQueryParams({
      ...queryParams,
      page: 1,
      brands: queryParams.brands.includes(brand)
        ? queryParams.brands.filter((t) => t !== brand)
        : [...queryParams.brands, brand],
    });
  };

  const onCheckPriceHandler = (price) => {
    // router.push(
    //   {
    //     pathname: "/search",
    //     query: {
    //       ...router.query,
    //       page: 1,
    //       price: queryParams.price.includes(price)
    //         ? queryParams.price.filter((t) => t !== price)
    //         : [...queryParams.price, price],
    //     },
    //   },
    //   undefined,
    //   { shallow: true }
    // );

    setQueryParams({
      ...queryParams,
      page: 1,
      price: queryParams.price.includes(price)
        ? queryParams.price.filter((t) => t !== price)
        : [...queryParams.price, price],
    });
  };

  const onChangePage = (ev, page) => {
    // router.push(
    //   {
    //     pathname: "/search",
    //     query: {
    //       ...router.query,
    //       page: page,
    //     },
    //   },
    //   undefined,
    //   { shallow: true }
    // );

    setQueryParams({ ...queryParams, page: page });
  };

  const onSortProducts = (value) => {
    // router.push(
    //   {
    //     pathname: "/search",
    //     query: {
    //       ...router.query,
    //       sort: value,
    //     },
    //   },
    //   undefined,
    //   { shallow: true }
    // );

    setQueryParams({
      ...queryParams,
      sort: value,
    });
  };

  // return (
  //   <Layout>
  //     <p>lkdsfjlkj</p>
  //   </Layout>
  // );

  return (
    <Container maxWidth={false} className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={3}>
          <Paper className={classes.filterContainer} square>
            <List>
              {/* <ListItem alignItems="flex-start">
                <ListItemText
                  primary="On Sale"
                  secondary={
                    <FormControlLabel
                      control={<Checkbox name="checkedA" />}
                      label="On Sale"
                    />
                  }
                ></ListItemText>
              </ListItem>
              <Divider variant="middle" /> */}
              <ListItem
                alignItems="flex-start"
                button
                onClick={(e) => dispatch({ type: TOGGLE_PRICE_TAB })}
              >
                <ListItemText className={classes.primaryText} primary="Price" />
                {state.openPrice ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={state.openPrice} timeout="auto" unmountOnExit>
                <List disablePadding className={classes.nestedList}>
                  {priceRange.map((el, index) => {
                    const labelId = `checkbox-list-label-${el.label}`;
                    return (
                      <ListItem
                        key={el.name}
                        // role={undefined}
                        button
                        onClick={(e) => onCheckPriceHandler(el.name)}
                      >
                        <ListItemIcon>
                          <Checkbox
                            className={classes.secondaryText}
                            edge="start"
                            name={el.name}
                            checked={queryParams.price.includes(el.name)}
                            // onChange={(e) => onCheckPriceHandler(e.target.name)}
                            disableRipple
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={el.label} />
                      </ListItem>
                    );
                  })}
                </List>
              </Collapse>
              <Divider variant="middle" />
              <ListItem
                alignItems="flex-start"
                button
                onClick={(e) => dispatch({ type: TOGGLE_BRANDS_TAB })}
              >
                <ListItemText
                  className={classes.primaryText}
                  primary="Brands"
                />
                {state.openBrands ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={state.openBrands} timeout="auto" unmountOnExit>
                <List disablePadding className={classes.nestedList}>
                  {brands.map((el, index) => {
                    const labelId = `checkbox-list-label-${el.label}`;
                    return (
                      <ListItem
                        key={el.name}
                        // role={undefined}
                        name={"list-brands-" + el.name}
                        button
                        onClick={(e) => onCheckBrandsHandler(el.name)}
                      >
                        <ListItemIcon>
                          <Checkbox
                            className={classes.secondaryText}
                            edge="start"
                            name={el.name}
                            // checked={query.brands.includes(el.name)}
                            checked={queryParams.brands.includes(el.name)}
                            disableRipple
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={el.label} />
                      </ListItem>
                    );
                  })}
                </List>
              </Collapse>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={9}>
          <Paper className={classes.resultContainer} square>
            <div className={classes.searchSection}>
              <form className={classes.searchTxt} noValidate autoComplete="off">
                <Input
                  id="searchTxt"
                  type="text"
                  placeholder="ค้นหา"
                  value={queryParams.txt}
                  className={classes.secondaryText}
                  onChange={onSearchChangeHandler}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton className={classes.secondaryText}>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </form>
              <div className={classes.sorting}>
                {/* <InputLabel id="sorting-label">เรียงตาม</InputLabel> */}
                <Select
                  className={classes.sortingSelect}
                  labelId="sorting-label"
                  id="select-id"
                  value={queryParams.sort}
                  onChange={(e) => onSortProducts(e.target.value)}
                >
                  <MenuItem value={1}>ขายดีที่สุด</MenuItem>
                  <MenuItem value={2}>ลดเยอะที่สุด</MenuItem>
                  <MenuItem value={3}>ราคาสูงสุด</MenuItem>
                  <MenuItem value={4}>ราคาต่ำสุด</MenuItem>
                </Select>
              </div>
            </div>
            <Grid
              className={classes.resultSection}
              container
              item
              alignItems="center"
            >
              {state.filterProducts.length === 0
                ? activeProducts.length === 0
                  ? [0, 1, 2, 4, 5, 6].map((el) => {
                      return (
                        <Grid key={el} item lg={4} md={4} sm={6} xs={12}>
                          <Box m={1}>
                            <Skeleton variant="rect" height={118} />
                            <Box pt={0.5}>
                              <Skeleton />
                              <Skeleton />
                              <Skeleton />
                            </Box>
                          </Box>
                        </Grid>
                      );
                    })
                  : "ไม่พบสินค้าที่ค้นหา"
                : state.filterProducts
                    .sort((a, b) => {
                      switch (queryParams.sort) {
                        case 1: {
                          if (a.sold < b.sold) return 1;
                          if (a.sold > b.sold) return -1;

                          return 0;
                        }
                        case 2: {
                          if (a.pricing.discount < b.pricing.discount) return 1;
                          if (a.pricing.discount > b.pricing.discount)
                            return -1;

                          return 0;
                        }
                        case 3: {
                          if (a.pricing.netPrice < b.pricing.netPrice) return 1;
                          if (a.pricing.netPrice > b.pricing.netPrice)
                            return -1;

                          return 0;
                        }
                        case 4: {
                          if (a.pricing.netPrice > b.pricing.netPrice) return 1;
                          if (a.pricing.netPrice < b.pricing.netPrice)
                            return -1;

                          return 0;
                        }
                        default: {
                          if (a.pricing.netPrice < b.pricing.netPrice) return 1;
                          if (a.pricing.netPrice > b.pricing.netPrice)
                            return -1;

                          return 0;
                        }
                      }
                    })
                    .slice(
                      (queryParams.page - 1) * state.productsPerPage,
                      (queryParams.page - 1) * state.productsPerPage +
                        state.productsPerPage
                    )
                    .map((prd) => {
                      return (
                        <Grid key={prd._id} item lg={4} md={4} sm={6} xs={12}>
                          <Item
                            {...props}
                            id={prd._id}
                            brand={prd.info.brand}
                            model={prd.info.model}
                            desc={prd.info.description}
                            price={prd.pricing.price}
                            netPrice={prd.pricing.netPrice}
                            imageUrl={prd.imageUrl}
                            discount={prd.pricing.discount}
                          />
                        </Grid>
                      );
                    })}
            </Grid>
            <div className={classes.paginator}>
              <Pagination
                count={
                  state.filterProducts.length % state.productsPerPage === 0
                    ? parseInt(
                        state.filterProducts.length / state.productsPerPage,
                        10
                      )
                    : parseInt(
                        state.filterProducts.length / state.productsPerPage,
                        10
                      ) + 1
                }
                color="primary"
                variant="outlined"
                shape="rounded"
                page={queryParams.page}
                onChange={(e, page) => {
                  onChangePage(e, page);
                }}
              />
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

// export default connect(mapStateToProps, mapDispatchToProps)(Search);
export default Search;
