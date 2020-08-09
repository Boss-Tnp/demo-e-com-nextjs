import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Link from "next/link";
import { withRouter } from "next/router";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "10vh",
    // marginBottom: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "block",
    margin: "0 24px",
    position: "relative",
    cursor: "pointer",
  },
  spacing: {
    flexGrow: 3,
  },
  cart: {
    margin: "0 24px",
    cursor: "pointer",
    color: "white",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  drawerRoot: {
    width: "100%",
    minWidth: 300,
    // backgroundColor: theme.palette.background.paper,
  },
}));

const menus = [
  {
    label: "Nike",
    value: "Nike",
  },
  {
    label: "Adidas",
    value: "Adidas",
  },
  {
    label: "Jordan",
    value: "Jordan",
  },
  {
    label: "Reebok",
    value: "Reebok",
  },
];

const Navbar = (props) => {
  const classes = useStyles();
  const { router } = props;
  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawer(open);
  };

  const onSelectBrandHandler = (e, brand) => {
    router.push("/search");
    // router.push("/search?brands=" + brand);
    // props.history.push({
    //   pathname: `/search`,
    //   search: "?brands=" + brand,
    // });
  };

  const onSelectBrandDrawerHandler = (e, brand) => {
    setDrawer(false);
    onSelectBrandHandler(e, brand);
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        elevation={0}
        style={{ backgroundColor: "inherit", color: "white" }}
      >
        <Toolbar>
          <div className={classes.sectionDesktop}>
            <Typography variant="subtitle2" className={classes.title}>
              <Link href="/">
                <a>Home</a>
              </Link>
            </Typography>
            {menus.map((el) => {
              return (
                <Typography
                  key={el.value}
                  variant="subtitle2"
                  className={classes.title}
                  onClick={(e) => onSelectBrandHandler(e, el.value)}
                >
                  {el.label}
                </Typography>
              );
            })}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer open={drawer} onClose={toggleDrawer(false)}>
              <div className={classes.drawerRoot}>
                <List component="nav" aria-label="secondary mailbox folders">
                  <Link href="/">
                    <ListItem button onClick={toggleDrawer(false)}>
                      <ListItemText inset primary="Home" />
                    </ListItem>
                  </Link>
                  {/* {["Adidas", "Nike", "Jordan", "Reebok"].map( */}
                  {menus.map((el, index) => (
                    <ListItem
                      button
                      key={el.value}
                      onClick={(e) => onSelectBrandDrawerHandler(e, el.value)}
                    >
                      <ListItemText inset primary={el.label} />
                    </ListItem>
                  ))}
                </List>
              </div>
            </Drawer>
          </div>
          <div className={classes.spacing} />
          {props.role === "user" ? (
            <Typography className={classes.title} variant="subtitle2">
              <Link href="/personal">
                <a>ข้อมูลของฉัน</a>
              </Link>
            </Typography>
          ) : null}
          {/* &nbsp; */}
          {props.role === "admin" ? (
            <Typography className={classes.title} variant="subtitle2">
              <Link href="/products">
                <a>Admin</a>
              </Link>
            </Typography>
          ) : null}
          {props.token && props.role === "user" ? (
            <Link href="/checkout">
              <IconButton className={classes.cart}>
                <Badge badgeContent={props.cartNo} color="secondary">
                  <ShoppingCartOutlinedIcon />
                </Badge>
              </IconButton>
            </Link>
          ) : null}
          {props.token ? (
            <Link href="/">
              <Button
                className={classes.authenButton}
                variant="outlined"
                color="inherit"
                onClick={props.onLogout}
              >
                ออกจากระบบ
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button variant="outlined" color="inherit">
                เข้าสู่ระบบ
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(Navbar);
