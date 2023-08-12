import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import FastfoodRoundedIcon from "@mui/icons-material/FastfoodRounded";

import Add from "./Add";
import View from "./ViewItems";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function IconLabelTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      {" "}
      <Box sx={{ width: "100%" }}>
        {/* <Box sx={{ borderBottom: 1, borderColor: "divider" }}> */}
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="icon label tabs example"
          indicatorColor="white"
          centered
        >
          <Tab icon={<FastfoodRoundedIcon />} label="Menu" />
          <Tab icon={<AddCircleOutlineRoundedIcon />} label="Add" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <View />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Add />
        </TabPanel>
      </Box>
      {/* </Box> */}
    </div>
  );
}
