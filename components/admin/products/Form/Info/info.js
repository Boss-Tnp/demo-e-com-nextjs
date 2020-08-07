import { MenuItem, TextField } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";
import React from "react";

const Info = (props) => {
  return (
    <>
      <Box mt={1} mb={2}>
        <TextField
          required
          id="brandId"
          name="brand"
          select
          label="แบรนด์"
          variant="outlined"
          fullWidth
          value={props.info.brand}
          helperText={
            props.info.brand.length === 0 ? "กรุณาเลือกชื่อแบรนด์" : null
          }
          error={props.info.brand.length === 0}
          onChange={(e) => props.inputChange(e.target.value, e.target.name)}
        >
          <MenuItem value="Nike">Nike</MenuItem>
          <MenuItem value="Adidas">Adidas</MenuItem>
          <MenuItem value="Jordan">Jordan</MenuItem>
          <MenuItem value="Reebok">Reebok</MenuItem>
        </TextField>
      </Box>
      <Box mt={1} mb={2}>
        <TextField
          fullWidth
          required
          id="modelId"
          name="model"
          label="รุ่น"
          variant="outlined"
          helperText={
            props.info.model.length === 0 ? "กรุณาระบุชื่อรุ่น" : null
          }
          error={props.info.model.length === 0}
          // defaultValue={props.title}
          value={props.info.model}
          onChange={(e) => props.inputChange(e.target.value, e.target.name)}
        />
      </Box>
      <Box mt={1} mb={2}>
        <TextField
          fullWidth
          id="descId"
          name="description"
          label="คำอธิบาย"
          variant="outlined"
          // defaultValue={props.desc}
          value={props.info.description}
          multiline
          rows={2}
          onChange={(e) => props.inputChange(e.target.value, e.target.name)}
        />
      </Box>

      <Box mt={1} mb={2}>
        <TextField
          fullWidth
          id="stockId"
          name="stock"
          label="จำนวนสินค้าในสต็อก"
          variant="outlined"
          type="number"
          placeholder="0"
          // defaultValue={props.discount}
          value={props.info.stock}
          onChange={(e) => props.inputChange(e.target.value, e.target.name)}
        />
      </Box>
      <Box mt={1} mb={2}>
        <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                checked={props.active}
                onChange={(e) =>
                  props.inputChange(e.target.checked, e.target.name)
                }
                name="active"
              />
            }
            label="Active"
          />
        </FormGroup>
      </Box>
    </>
  );
};

export default Info;
