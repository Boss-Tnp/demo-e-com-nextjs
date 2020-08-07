import React from "react";
import { CircularProgress, Dialog } from "@material-ui/core";

const LoadingPage = () => {
  return (
    <Dialog fullScreen open>
      <CircularProgress color="secondary" style={{ margin: "auto" }} />
    </Dialog>
  );
};

export default LoadingPage;
