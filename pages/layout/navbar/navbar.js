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
import React, { useState } from "react";
import { withRouter } from "next/router";
import Link from "next/link";
import styles from "./navbar.module.scss";

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
    <div className={styles.root}>
      <AppBar
        position="static"
        elevation={0}
        style={{ backgroundColor: "inherit", color: "white" }}
      >
        <Toolbar>
          <div className={styles.sectionDesktop}>
            <Typography variant="subtitle2" className={styles.title}>
              <Link href="/">
                <a>Home</a>
              </Link>
            </Typography>
            {menus.map((el) => {
              return (
                <Typography
                  key={el.value}
                  variant="subtitle2"
                  className={styles.title}
                  onClick={(e) => onSelectBrandHandler(e, el.value)}
                >
                  {el.label}
                </Typography>
              );
            })}
          </div>
          <div className={styles.sectionMobile}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer open={drawer} onClose={toggleDrawer(false)}>
              <div className={styles.drawerRoot}>
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
          <div className={styles.spacing} />
          {props.role === "user" ? (
            <Typography className={styles.title} variant="subtitle2">
              <Link href="/user/personal">
                <a>ข้อมูลของฉัน</a>
              </Link>
            </Typography>
          ) : null}
          {/* &nbsp; */}
          {props.role === "admin" ? (
            <Typography className={styles.title} variant="subtitle2">
              <Link href="/products">
                <a>Admin</a>
              </Link>
            </Typography>
          ) : null}
          {props.token && props.role === "user" ? (
            <Link href="/checkout">
              <IconButton className={styles.cart}>
                <Badge badgeContent={props.cartNo} color="secondary">
                  <ShoppingCartOutlinedIcon />
                </Badge>
              </IconButton>
            </Link>
          ) : null}
          {props.token ? (
            <Link href="/">
              <Button
                className={styles.authenButton}
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
