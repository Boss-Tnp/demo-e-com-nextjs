import { CircularProgress, Dialog } from "@material-ui/core";
import React from "react";

const LoadingPage = () => {
  return (
    <Dialog fullScreen open>
      <CircularProgress color="secondary" style={{ margin: "auto" }} />
    </Dialog>
  );
};

export default LoadingPage;
