import { TextField } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import React from "react";
import { NumberFormatNormal } from "./../../../UI/Number/number";

const Pricing = (props) => {
  return (
    <>
      <Box mt={1} mb={2}>
        <TextField
          fullWidth
          required
          id="priceId"
          name="price"
          label="ราคา"
          variant="outlined"
          type="number"
          placeholder="0.00"
          helperText={
            Number(props.pricing.price) <= 0 ? "กรุณาระบุราคาให้ถูกต้อง" : null
          }
          error={Number(props.pricing.price) <= 0}
          value={props.pricing.price}
          onChange={(e) => props.inputChange(e.target.value, e.target.name)}
        />
      </Box>
      <Box mt={1} mb={2}>
        <TextField
          fullWidth
          id="discountId"
          name="discount"
          label="ส่วนลด (%)"
          variant="outlined"
          type="number"
          placeholder="0.00"
          value={props.pricing.discount}
          onChange={(e) => props.inputChange(e.target.value, e.target.name)}
        />
      </Box>
      <Box mt={1} mb={2}>
        <TextField
          fullWidth
          disabled
          id="netPriceId"
          name="netPrice"
          label="ราคาขายสุทธิ"
          variant="outlined"
          // type="number"
          // placeholder="0.00"
          value={props.pricing.netPrice}
          InputProps={{
            inputComponent: NumberFormatNormal,
          }}
          // onChange={(e) => props.inputChange(e.target.value, e.target.name)}
        />
      </Box>
    </>
  );
};

export default Pricing;
