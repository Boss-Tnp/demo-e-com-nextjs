import React, { useEffect } from "react";
import Navbar from "./navbar/navbar";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/action/index";
import useCart from "../../hooks/useCart";

const Layout = (props) => {
  const dispatch = useDispatch();
  const { token, userId, role } = useSelector((state) => {
    return {
      token: state.authReducer.token,
      userId: state.authReducer.userId,
      role: state.authReducer.role,
    };
  });

  const { data: cartItems, isLoading, isError } = useCart(userId, token);
  // console.log(cartItems);
  let cartNo = 0;
  if (cartItems?.length > 0) {
    cartNo = cartItems
      .map((el) => {
        return el.quantity;
      })
      .reduce((prv, curr) => prv + curr, 0);
  }

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
