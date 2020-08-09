import { CircularProgress, Dialog, DialogContent } from "@material-ui/core";
import React from "react";

const Processing = (props) => {
  return (
    <Dialog open={props.open} style={{ overflow: "none", background: "none" }}>
      <DialogContent>
        <CircularProgress color="secondary" />
      </DialogContent>

      {/* <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle> */}
    </Dialog>
  );
};

export default Processing;
