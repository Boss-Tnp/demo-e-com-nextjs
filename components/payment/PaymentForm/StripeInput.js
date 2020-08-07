import React, { useImperativeHandle, useRef } from "react";
import {
  BODY1_COLOR,
  H1_COLOR,
  SECOND_COLOR,
  SUCCESS_COLOR,
} from "./../../../utils/constant";

const iframeStyles = {
  base: {
    color: H1_COLOR,
    iconColor: H1_COLOR,
    "::placeholder": {
      color: BODY1_COLOR,
    },
  },
  invalid: {
    iconColor: SECOND_COLOR,
    color: SECOND_COLOR,
  },
  complete: {
    iconColor: SUCCESS_COLOR,
  },
};

const cardElementOpts = (props) => {
  return {
    iconStyle: "solid",
    style: iframeStyles,

    hidePostalCode: true,
  };
};

const StripeInput = ({ component: Component, inputRef, ...props }) => {
  const elementRef = useRef();
  useImperativeHandle(inputRef, () => ({
    focus: () => elementRef.current.focus,
  }));
  return (
    <Component
      options={{
        iconStyle: "solid",
        style: iframeStyles,
      }}
      onReady={(element) => (elementRef.current = element)}
      {...props}
    />
  );
};
export default StripeInput;
