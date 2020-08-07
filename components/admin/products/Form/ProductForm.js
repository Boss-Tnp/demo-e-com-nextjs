import {
  Box,
  CircularProgress,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import PropTypes from "prop-types";
import React, {
  useEffect,
  useState,
  useCallback,
  useReducer,
  useMemo,
} from "react";
import { connect } from "react-redux";
import { StringParam, useQueryParam } from "use-query-params";
import {
  API_HEADER,
  GRAPHQLAPI_ENDPOINT,
  RESTAPI_ENDPOINT,
  H1_COLOR,
} from "../../../../Utils/constant";
import MyButton from "../../../UI/Button/button";
import Image from "./Image/image";
import Info from "./Info/info";
import Pricing from "./Pricing/pricing";
import Shipping from "./Shipping/shipping";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import * as actions from "../../../../Store/Action/index";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  horizontalList: {
    display: "flex",
    flexDirection: "row",
    padding: 0,
    alignItems: "center",
  },
  breadcrumb: {
    display: "flex",
    color: H1_COLOR,
    cursor: "pointer",
    width: "fit-content",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  productsContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(3),
  },
  content: {
    flexGrow: 1,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

const generateBase64FromImage = (imageFile) => {
  const reader = new FileReader();
  const promise = new Promise((resolve, reject) => {
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (err) => reject(err);
  });

  reader.readAsDataURL(imageFile);
  return promise;
};

const getUpdatedImagePreview = (product) => {
  let updatedImagePreview;
  updatedImagePreview = [...defaultImagePreview];
  if (product.imageUrl.length > 0) {
    for (let i = 0; i < product.imageUrl.length; i++) {
      updatedImagePreview[i] = {
        ...updatedImagePreview[i],
        img: product.imageUrl[i].nameUrl,
      };
    }
  }

  return updatedImagePreview;
};

const imgPlaceHolderUrl =
  "https://firebasestorage.googleapis.com/v0/b/e-commerce-24970.appspot.com/o/placeholder-image.png?alt=media&token=e2a3df68-c6d0-47b5-a8c1-0c9600c8dbd3";

const defaultImagePreview = [
  {
    img: imgPlaceHolderUrl,
    alt: "img-1",
    cols: 3,
    rows: 2,
  },
  {
    img: imgPlaceHolderUrl,
    alt: "img-2",
    cols: 1,
    rows: 1,
  },
  {
    img: imgPlaceHolderUrl,
    alt: "img-3",
    cols: 1,
    rows: 1,
  },
  {
    img: imgPlaceHolderUrl,
    alt: "img-4",
    cols: 1,
    rows: 1,
  },
];

const _actions = {
  SET_STATE: "SET_STATE",
  SET_INFO: "SET_INFO",
  SET_PRICING: "SET_PRICING",
  SET_IMAGE: "SET_IMAGE",
  SET_SHIPPING: "SET_SHIPPING",
  SET_ACTIVE: "SET_ACTIVE",
  SET_LOADING: "SET_LOADING",
};

const initialState = {
  loading: true,
  avatar: {},
  info: {
    brand: "",
    model: "",
    description: "",
    stock: 0,
  },
  pricing: {
    price: "",
    discount: 0,
    netPrice: "",
  },
  imageUrl: [
    { nameUrl: imgPlaceHolderUrl },
    { nameUrl: imgPlaceHolderUrl },
    { nameUrl: imgPlaceHolderUrl },
    { nameUrl: imgPlaceHolderUrl },
  ],
  imageData: {},
  imagePreview: defaultImagePreview,
  shipping: {
    weight: 0,
    heels: 0,
    shoeTip: 0,
    size: [],
  },
  active: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case _actions.SET_STATE:
      const product = action.payload;
      const imagePreview = action.imagePreview;
      return {
        ...state,
        loading: false,
        avatar: {
          img: product.imageUrl[0].nameUrl,
          brand: product.info.brand,
          model: product.info.model,
        },
        info: product.info,
        pricing: product.pricing,
        imageUrl: product.imageUrl,
        imagePreview: imagePreview,
        shipping: product.shipping,
        active: product.active,
      };
    case _actions.SET_ACTIVE:
      return {
        ...state,
        active: action.active,
      };
    case _actions.SET_INFO:
      return {
        ...state,
        info: {
          ...state.info,
          [action.field]: action.value,
        },
      };
    case _actions.SET_PRICING:
      return {
        ...state,
        pricing: {
          ...state.pricing,
          [action.field]: action.value,
          netPrice: action.netPrice,
        },
      };
    case _actions.SET_IMAGE:
      const { imageUrl, imageData } = action;
      return {
        ...state,
        imageUrl: imageUrl,
        imageData: imageData,
        imagePreview: action.imagePreview,
      };
    case _actions.SET_SHIPPING:
      return {
        ...state,
        shipping: {
          ...state.shipping,
          [action.field]: action.value,
        },
      };
    case _actions.SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
};

const ProductForm = ({ product, dispatchRedux, token }) => {
  const classes = useStyles();
  const router = useRouter();

  const [tabIndex, setTabIndex] = useState(0);
  const [disabledSave, setDisabledSave] = useState(true);
  const [updateButtonLoading, setUpdateButtonLoading] = useState(false);
  const [deleteButtonLoading, setDeleteButtonLoading] = useState(false);
  const productId = router.query.product;
  // const [productId] = useQueryParam("prd", StringParam);
  const [state, dispatch] = useReducer(reducer, initialState);

  // useEffect(() => console.log("Mounted"), []);
  // useEffect(() => console.log("effect"));

  useEffect(() => {
    let _isMounted = true;
    if (product) {
      dispatch({
        type: _actions.SET_STATE,
        payload: product,
        imagePreview: getUpdatedImagePreview(product),
      });
    } else {
      if (_isMounted) {
        // setLoading(false);
        dispatch({ type: _actions.SET_LOADING, loading: false });
      }
    }

    return () => {
      _isMounted = false;
    };
  }, [product]);

  useEffect(() => {
    if (state.loading) return;
    if (
      state.info.model.trim().length > 0 &&
      state.info.brand.trim().length > 0 &&
      Number(state.pricing.price) > 0
    ) {
      setDisabledSave(false);
    } else {
      setDisabledSave(true);
    }
  }, [state.info.brand, state.info.model, state.loading, state.pricing.price]);

  const handleChangeTab = (event, newValue) => {
    setTabIndex(newValue);
  };

  const inputInfoChangeHandler = (value, field) => {
    if (field === "active") {
      dispatch({ type: _actions.SET_ACTIVE, active: value });
    } else {
      dispatch({ type: _actions.SET_INFO, field: field, value: value });
    }
  };

  const inputPricingChangeHandler = (value, field) => {
    if (field === "discount" && (value > 100 || value < 0)) {
      return;
    }
    const updatedNetPrice =
      field === "price"
        ? value * (1 - state.pricing.discount / 100).toFixed(2)
        : state.pricing.price * (1 - value / 100).toFixed(2);

    dispatch({
      type: _actions.SET_PRICING,
      field: field,
      value: value,
      netPrice: updatedNetPrice,
    });
  };

  const inputShippingChangeHandler = (value, field) => {
    // console.log(field);
    dispatch({ type: _actions.SET_SHIPPING, field: field, value: value });
  };

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    if (e.target.files.length > 4) {
      alert("อัพโหลดได้ไม่เกินทีละ 4 รูป");
      return;
    }
    // generateBase64FromImage(e.target.files[0])
    //   .then((b64) => {
    //     // console.log(b64);
    //     // setImage64(b64);
    //     //   setSelectedFile(e.target.files[0]);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });

    let updatedImagePreview = state.imagePreview.slice();
    updatedImagePreview = [
      {
        ...updatedImagePreview[0],
        img: imgPlaceHolderUrl,
      },
      {
        ...updatedImagePreview[1],
        img: imgPlaceHolderUrl,
      },
      {
        ...updatedImagePreview[2],
        img: imgPlaceHolderUrl,
      },
      {
        ...updatedImagePreview[3],
        img: imgPlaceHolderUrl,
      },
    ];
    const updatedImageUrl = [];
    // console.log(e.target.files);
    // console.log(URL.createObjectURL(e.target.files[0]));

    for (let i = 0; i < e.target.files.length; i++) {
      // console.log(e.target.files[i]);

      updatedImageUrl.push({ nameUrl: e.target.files[i].name });

      updatedImagePreview[i] = {
        ...updatedImagePreview[i],
        img: URL.createObjectURL(e.target.files[i]),
      };
    }

    dispatch({
      type: _actions.SET_IMAGE,
      imageUrl: updatedImageUrl,
      imageData: e.target.files,
      imagePreview: updatedImagePreview,
    });

    // setFormState({
    //   ...formState,
    //   imageUrl: updatedImageUrl,
    //   imageData: e.target.files,
    //   imagePreview: updatedImagePreview,
    // });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(e);
    const { info, pricing, imageUrl, imageData, shipping, active } = state;

    const productData = {
      info: {
        brand: info.brand,
        model: info.model,
        description: info.description,
        stock: info.stock,
      },
      pricing: {
        price: pricing.price,
        discount: pricing.discount,
        netPrice: pricing.netPrice,
      },
      imageUrl: imageUrl,
      imageData: imageData,
      shipping: {
        weight: shipping.weight,
        heels: shipping.heels,
        shoeTip: shipping.shoeTip,
        size: shipping.size,
      },
      active: active,
    };

    const formData = new FormData();
    formData.append("info", JSON.stringify(productData.info));
    formData.append("pricing", JSON.stringify(productData.pricing));
    formData.append("imageUrl", JSON.stringify(productData.imageUrl));
    formData.append("shipping", JSON.stringify(productData.shipping));
    formData.append("active", JSON.stringify(productData.active));

    for (let i = 0; i < productData.imageData.length; i++) {
      formData.append("upload-file", productData.imageData[i]);
    }

    // setUpdateButtonLoading(true);
    // Update
    if (productId) {
      formData.append("productId", JSON.stringify(productId));
      // console.log("Update: ", productData);
      Axios.post(RESTAPI_ENDPOINT + "/admin/update-product", formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          dispatchRedux(actions.setProduct(res.data));
          setUpdateButtonLoading(false);
          alert("ทำรายการเสร็จเรียบร้อย");
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      // Insert

      Axios.post(RESTAPI_ENDPOINT + "/admin/add-product", formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          // console(res.data);
          dispatchRedux(actions.addProduct(res.data));
          setUpdateButtonLoading(false);
          alert("ทำรายการเสร็จเรียบร้อย");
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  const onDeleteProduct = () => {
    const confirm = window.confirm("ต้องการลบสินค้าชิ้นนี้ใช่ไหม");
    if (confirm) {
      setDeleteButtonLoading(true);
      Axios.post(
        RESTAPI_ENDPOINT + "/admin/delete-product",
        {
          productId: productId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
        .then((res) => {
          dispatchRedux(actions.deleteProduct(productId));
          setDeleteButtonLoading(false);
          alert("ทำรายการเสร็จเรียบร้อย");
          router.back();
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  const backPage = () => {
    router.back();
  };

  if (state.loading) {
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

  return (
    <div className={classes.productFormContainer}>
      <div className={classes.content}>
        <div className={classes.breadcrumb} onClick={backPage}>
          <KeyboardBackspaceIcon />
          <Typography>สินค้าทั้งหมด</Typography>
        </div>
        <form
          onSubmit={onSubmit}
          noValidate
          autoComplete="off"
          method="POST"
          encType="multipart/form-data"
        >
          <>
            <List className={classes.horizontalList}>
              <ListItem>
                {productId ? (
                  <>
                    <ListItemAvatar>
                      <Avatar src={state.avatar.img}></Avatar>
                    </ListItemAvatar>

                    <ListItemText
                      primary={state.avatar.brand}
                      secondary={state.avatar.model}
                    />
                  </>
                ) : null}
              </ListItem>
              <ListItem>
                <MyButton
                  color="primary"
                  type="submit"
                  disabled={disabledSave}
                  loading={updateButtonLoading}
                >
                  บันทึก
                </MyButton>
                {productId ? (
                  <MyButton
                    color="secondary"
                    onClick={onDeleteProduct}
                    loading={deleteButtonLoading}
                    disabled={deleteButtonLoading}
                  >
                    ลบ
                  </MyButton>
                ) : null}
              </ListItem>
            </List>
            <Paper square>
              <Tabs
                value={tabIndex}
                indicatorColor="secondary"
                onChange={handleChangeTab}
              >
                <Tab label="ข้อมูลสินค้า" {...a11yProps(0)} />
                <Tab label="ราคา" {...a11yProps(1)} />
                <Tab label="รูปภาพ" {...a11yProps(2)} />
                <Tab label="การขนส่ง" {...a11yProps(3)} />
              </Tabs>
              <TabPanel value={tabIndex} index={0}>
                <Info
                  info={state.info}
                  active={state.active}
                  inputChange={inputInfoChangeHandler}
                />
              </TabPanel>

              <TabPanel value={tabIndex} index={1}>
                <Pricing
                  pricing={state.pricing}
                  inputChange={inputPricingChangeHandler}
                />
              </TabPanel>
              <TabPanel value={tabIndex} index={2}>
                <Image
                  imagePreview={state.imagePreview}
                  onSelectFile={onSelectFile}
                />
              </TabPanel>
              <TabPanel value={tabIndex} index={3}>
                <Shipping
                  shipping={state.shipping}
                  inputChange={inputShippingChangeHandler}
                />
              </TabPanel>
            </Paper>
          </>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetProduct: (product) => dispatch(actions.setProduct(product)),
    onDeletetProduct: (productId) => dispatch(actions.deleteProduct(productId)),
    onAddProduct: (product) => dispatch(actions.addProduct(product)),
  };
};

export default ProductForm;
