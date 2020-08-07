import { TextField } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import React from "react";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const size = [
  { title: "7", value: 7 },
  { title: "7.5", value: 7.5 },
  { title: "8", value: 8 },
  { title: "8.5", value: 8.5 },
  { title: "9", value: 9 },
  { title: "9.5", value: 9.5 },
];

const Shipping = (props) => {
  return (
    <>
      <Box mt={1} mb={2} mr={2}>
        <TextField
          id="weightId"
          name="weight"
          label="น้ำหนัก (กรัม)"
          variant="outlined"
          type="number"
          placeholder="0.00"
          // defaultValue={props.price}
          value={props.shipping.weight}
          onChange={(e) => props.inputChange(e.target.value, e.target.name)}
        />
      </Box>
      <Box mt={1} mb={2} mr={2}>
        <TextField
          id="heelsId"
          name="heels"
          label="ความหนาส้นรองเท้า (มม.)"
          variant="outlined"
          type="number"
          placeholder="0.00"
          value={props.shipping.heels}
          onChange={(e) => props.inputChange(e.target.value, e.target.name)}
        />
      </Box>
      <Box mt={1} mb={2} mr={2}>
        <TextField
          id="shoeTipId"
          name="shoeTip"
          label="ความหนาปลายรองเท้า (มม.)"
          variant="outlined"
          type="number"
          placeholder="0.00"
          value={props.shipping.shoeTip}
          onChange={(e) => props.inputChange(e.target.value, e.target.name)}
        />
      </Box>

      {/* <Box mt={1} mb={2}>
        <Autocomplete
          multiple
          id="sizeId"
          name="size"
          options={size}
          disableCloseOnSelect
          getOptionLabel={(option) => option.title}
          value={props.shipping.size}
          onChange={(e, values) => props.inputChange(values, "size")}
          renderOption={(option, { selected }) => (
            <>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.title}
            </>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Size"
              placeholder="Size"
            />
          )}
        />
      </Box> */}
    </>
  );
};

export default Shipping;
