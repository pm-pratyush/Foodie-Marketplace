import { useState, useEffect } from "react";
import * as React from "react";

import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Typography from "@mui/material/Typography";
import ls from "local-storage";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

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

const OrdersList = (props) => {
  const [value, setValue] = React.useState(0);
  const [orders, setOrders] = React.useState([]);
  const [sortedOrders, setSortedOrders] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");

  const email = {
    email: ls.get("email"),
  }

  useEffect(() => {
    axios
      .post("/api/order/getBOrder", email)
      .then((response) => {
        setOrders(response.data);
        setSortedOrders(response.data);
        setSearchText("");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const customFunction = (event) => {
    console.log(event.target.value);
    setSearchText(event.target.value);
  };

  return (
    <>
      <ShoppingCartIcon fontSize="large" color="primary" />
      <h4>User Orders</h4>
      <TabPanel value={value} index={0}>
        <div className="OrdersTable">
          <Grid container>
            <Grid item xs={12}>
              <Paper>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell> Sr No.</TableCell>
                      <TableCell> Date</TableCell>
                      <TableCell> Item Name</TableCell>
                      <TableCell> Vendor Id</TableCell>
                      <TableCell> Quantity </TableCell>
                      <TableCell> Price </TableCell>
                      <TableCell> Order Status </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.map((user, ind) => (
                      <TableRow key={ind}>
                        <TableCell>{ind}</TableCell>
                        <TableCell>{user.Date}</TableCell>
                        <TableCell>{user.ItemName}</TableCell>
                        <TableCell>{user.VendorEmailId}</TableCell>
                        <TableCell>{user.Quantity}</TableCell>
                        <TableCell>{user.Price}</TableCell>
                        <TableCell>{user.OrderStatus}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </TabPanel>
    </>
  );
};

export default OrdersList;
