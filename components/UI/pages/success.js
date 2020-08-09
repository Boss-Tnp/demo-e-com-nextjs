import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import Link from "next/link";
import React from "react";
import MyButton from "./../../UI/Button/button";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#fff",
  },
  green: {
    margin: "auto",
    color: "#fff",
    backgroundColor: green[500],
  },
}));

const Success = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Grid
        container
        item
        alignItems="center"
        justify="center"
        className={classes.container}
      >
        <Typography variant="h5">ขอบคุณครับ</Typography>
        <Typography variant="body1">คุณทำรายการเสร็จเรียบร้อยแล้ว</Typography>
        <Link href="/">
          <a>
            <MyButton color="primary">กลับสู่หน้าหลัก</MyButton>
          </a>
        </Link>
        {/* <Paper className={classes.container}>
          <Box mb={2}>
            <Avatar className={classes.green}>
              <DoneOutlineSharpIcon />
            </Avatar>
          </Box>

          <Typography>ทำรายการเสร็จเรียบร้อย</Typography>
          <Link to="/">
            <MyButton color="primary">กลับสู่หน้าหลัก</MyButton>
          </Link>
        </Paper> */}
      </Grid>
    </Container>
  );
};

export default Success;
