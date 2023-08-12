import * as React from "react";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";

import Profile from "../../Usecase/Vendor/Profile";
import OrderStatistics from "../../Usecase/Vendor/OrderStatistics";
import FoodMenu from "../../Usecase/Vendor/FoodMenu";
import ViewOrders from "../../Usecase/Vendor/ViewOrders"

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
export default function CenteredTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab
            style={{ paddingLeft: "50px", paddingRight: "50px" }}
            label="Profile"
          />
          <Tab
            style={{ paddingLeft: "50px", paddingRight: "50px" }}
            label="Food Menu"
          />
          <Tab
            style={{ paddingLeft: "50px", paddingRight: "50px" }}
            label="View Orders"
          />
          <Tab
            style={{ paddingLeft: "50px", paddingRight: "50px" }}
            label="Order Statistics"
          />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Profile />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <FoodMenu />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ViewOrders />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <OrderStatistics />
        </TabPanel>
      </Box>
    </>
  );
}
