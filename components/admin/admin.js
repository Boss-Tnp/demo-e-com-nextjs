import { Paper } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import StorefrontOutlinedIcon from "@material-ui/icons/StorefrontOutlined";
import React from "react";
import { connect } from "react-redux";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import Personal from "../user/personal/personal";
import ProductForm from "./products/Form/ProductForm";
import Products from "./products/products";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    [theme.breakpoints.up("xs")]: {
      flexDirection: "column",
    },
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
      alignItems: "stretch",
    },
    marginBottom: theme.spacing(3),
  },
  menuContainer: {
    // color: "white",
    backgroundColor: "inherit",
    minWidth: "fit-content",
    [theme.breakpoints.up("md")]: {
      // minWidth: "250px",
      // height: "fit-content",
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
    },
  },
  horizontalPaper: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  horizontalList: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "row",
      padding: 0,
    },
  },
  content: {
    flexGrow: 1,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));

const menu = [
  {
    title: "สินค้าทั้งหมด",
    path: "products",
    icon: <StorefrontOutlinedIcon />,
  },
  // {
  //   title: "ข้อมูลส่วนตัว",
  //   path: "personal",
  //   icon: <PersonOutlineOutlinedIcon />,
  // },
  // {
  //   title: "ประวัติการสั่งซื้อ",
  //   path: "ordered",
  //   icon: <PersonOutlineOutlinedIcon />,
  // },
];

const Admin = (props) => {
  const classes = useStyles();

  if (props.role !== "admin") {
    return "คุณไม่มีสิทธิ์เข้าถึงหน้านี้";
  }
  return (
    <div className={classes.root}>
      {/* <Paper className={classes.menuContainer} square elevation={0}>
        <List className={classes.horizontalList}>
          {menu.map((el, index) => (
            <Link to={`${props.match.path}/${el.path}`} key={el.title}>
              <ListItem button>
                <ListItemIcon>{el.icon}</ListItemIcon>
                <ListItemText primary={el.title} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Paper> */}
      <main className={classes.content}>
        <Switch>
          {/* <Route
            path={`${props.match.path}/dashboard`}
            render={(props) => <Dashboard {...props} />}
          /> */}
          <Route
            path={`${props.match.path}/products`}
            exact
            render={(props) => <Products {...props} />}
          />
          <Route
            path={`${props.match.path}/products/new-product`}
            exact
            render={(props) => <ProductForm {...props} />}
          />
          <Route
            path={`${props.match.path}/products/`}
            render={(props) => <ProductForm {...props} />}
          />
          <Route
            path={`${props.match.path}/personal`}
            render={(props) => <Personal {...props} />}
          />
          {/* <Route
            path={`${props.match.path}/ordered`}
            exact
            render={(props) => <Ordered {...props} />}
          /> */}
          {/* <Route
            path={`${props.match.path}/users`}
            render={(props) => <Users {...props} />}
          />
          <Route
            path={`${props.match.path}/`}
            exact
            render={(props) => <Dashboard {...props} />}
          /> */}
          <Redirect to={`${props.match.path}/products`} />
        </Switch>
      </main>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    role: state.authReducer.role,
  };
};

export default connect(mapStateToProps)(Admin);
