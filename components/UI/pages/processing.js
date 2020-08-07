import React from "react";
import { Dialog, CircularProgress, DialogContent } from "@material-ui/core";

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
