// import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useCart from "../../hooks/useCart";
import * as actions from "../../store/action/index";
import Navbar from "./navbar/navbar";

const Layout = (props) => {
  const dispatch = useDispatch();
  const { token, role } = useSelector((state) => {
    return {
      token: state.authReducer.token,
      role: state.authReducer.role,
    };
  });

  const { data: cartItems } = useCart();
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
