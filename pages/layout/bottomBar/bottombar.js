import React from "./node_modules/react";
import { H1_COLOR } from "../../../utils/constant";

const BottomBar = () => {
  return (
    <div
      style={{
        height: "50px",
        padding: "8px",
        display: "flex",
        alignItems: "center",
        color: H1_COLOR,
      }}
    >
      Copyright © Tanapon Satusinprasert 2020.
    </div>
  );
};

export default BottomBar;
