import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Paper,
} from "@material-ui/core";
import ListIcon from "@material-ui/icons/List";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { ACTIVE_LINK } from "../../utils/constant";

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
  paperContainer: {
    backgroundColor: "inherit",
    minWidth: "fit-content",
    [theme.breakpoints.up("md")]: {
      // minWidth: "250px",
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
  activeLink: {
    backgroundColor: ACTIVE_LINK,
  },
}));

const menu = [
  {
    title: "ข้อมูลส่วนตัว",
    path: "personal",
    icon: <PersonOutlineOutlinedIcon />,
  },
  {
    title: "ประวัติการสั่งซื้อ",
    path: "ordered",
    icon: <ListIcon />,
  },
];

const User = (props) => {
  const classes = useStyles();
  const router = useRouter();
  // console.log(router.pathname.split("/"));
  // if (props.role !== "user") {
  //   return "คุณไม่มีสิทธิ์เข้าถึงหน้านี้";
  // }

  // return <p>User</p>;

  return (
    <div className={classes.root}>
      <Paper className={classes.paperContainer} elevation={0}>
        <List className={classes.horizontalList}>
          {menu.map((el, index) => (
            <Link href={`${el.path}`} key={el.title}>
              {/* <a activeClassName={classes.activeLink}> */}
              <a
                className={
                  router.pathname.split("/")[2] === el.path
                    ? classes.activeLink
                    : null
                }
              >
                <ListItem button>
                  <ListItemIcon>{el.icon}</ListItemIcon>
                  <ListItemText primary={el.title} />
                </ListItem>
              </a>
            </Link>
          ))}
        </List>
      </Paper>
      <main className={classes.content}>
        {props.children}
        {/* <Switch>
          <Route
            path={`${router.pathname}/personal`}
            render={(props) => <Personal {...props} />}
          />
          <Route
            path={`${router.pathname}/ordered`}
            exact
            render={(props) => <Ordered {...props} />}
          />
          <Route
            path={`${router.pathname}/ordered-detail`}
            render={(props) => <OrderedDetail {...props} />}
          />
          <Redirect to={`${router.pathname}/personal`} />
        </Switch> */}
      </main>
    </div>
  );
};

export default User;
