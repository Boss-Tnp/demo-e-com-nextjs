import React, { useEffect } from "react";
import Navbar from "./navbar/navbar";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "./../../store/action/index";

const Layout = (props) => {
  const { token, cartNo, role } = useSelector((state) => {
    return {
      token: state.authReducer.token,
      cartNo: state.cartReducer.cartNo,
      role: state.authReducer.role,
    };
  });

  const dispatch = useDispatch();

  const onLogoutHandler = () => {
    dispatch(actions.removeToken());
    dispatch(actions.setCartNo(0));
  };

  return (
    <>
      <Navbar
        cartNo={cartNo}
        token={token}
        role={role}
        onLogout={onLogoutHandler}
      />
      {props.children}
      {/* <BottomBar /> */}
    </>
  );
};

export default Layout;
