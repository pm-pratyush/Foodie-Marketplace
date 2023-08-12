import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Container } from "@mui/material";
import BSignup from "./BSignUp";
import VSignUp from "./VSignUp";

export default function BasicSelect() {
  const [buyer, setBuyer] = React.useState(false);
  const [vendor, setVendor] = React.useState(false);

  const handleChange = (event) => {
    if (event.target.value == 10) {
      setBuyer(true);
      setVendor(false);
    } else if (event.target.value == 20) {
      setBuyer(false);
      setVendor(true);
    } else {
      setBuyer(false);
      setVendor(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          width: 350,
          height: 50,
          margin: "0 auto",
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">User Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={buyer ? 10 : vendor ? 20 : 0}
            label="User Type"
            onChange={handleChange}
          >
            <MenuItem value={0}>Select *</MenuItem>
            <MenuItem value={10}>Buyer</MenuItem>
            <MenuItem value={20}>Vendor</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box>
        {vendor ? <VSignUp /> : <></>}
        {buyer ? <BSignup /> : <></>}
      </Box>
    </>
  );
}
