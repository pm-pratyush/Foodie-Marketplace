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

import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import CancelIcon from "@mui/icons-material/Cancel";

import { send } from "emailjs-com";

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

const UsersList = (props) => {
  const [orders, setOrders] = useState([]);
  const [sortedOrders, setSortedOrders] = useState([]);

  const [sortName, setSortName] = useState(true);
  const [searchText, setSearchText] = useState("");

  const [refresh, setRefresh] = useState(false);
  const [disNext, setDisNext] = useState(false);

  const email = {
    email: ls.get("email"),
  };
  useEffect(() => {
    console.log("refresh");
    axios
      .post("/api/order/getVOrder", email)
      .then((response) => {
        setOrders(response.data);
        setSortedOrders(response.data);
        setSearchText("");
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(refresh);
  }, [refresh]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const customFunction = (event) => {
    console.log(event.target.value);
    setSearchText(event.target.value);
  };

  const handleNextStage = (event) => {
    // Order status can have at-max 10 orders at ACCEPTED and COOKING stage combined
    if (orders.length > 10) {
      var count = 0;
      for (var i = 0; i < orders.length; i++) {
        if (orders[i].status === "ACCEPTED" || orders[i].status === "COOKING") {
          count++;
        }
      }
      if (count > 10) {
        alert(
          "You can't have more than 10 orders at ACCEPTED and COOKING stage combined"
        );
        return;
      }
    }

    console.log(event.target.value);
    var id = {
      OrderId: event.target.value,
    };

    axios
      .post("/api/order/getStatus", id)
      .then((response) => {
        var status = response.data[0].OrderStatus;
        var buyer = response.data[0].BuyerEmailId;
        var vendor = response.data[0].VendorEmailId;
        if (status == "Placed") {
          send(
            "service_1iiyiuo",
            "template_ya552ps",
            {
              from_name: buyer,
              to_name: vendor,
              order_status: "Order Accepted",
            },
            "user_njfDhOUELqvnnkYzuB7UP"
          )
            .then((response) => {
              console.log("SUCCESS!", response.status, response.text);
            })
            .catch((err) => {
              console.log("FAILED...", err);
            });

          axios
            .put("/api/order/updateStatus", {
              OrderId: event.target.value,
              OrderStatus: "Accepted",
            })
            .then((response) => {
              console.log(response);
            });
        } else if (status == "Accepted") {
          axios
            .put("/api/order/updateStatus", {
              OrderId: event.target.value,
              OrderStatus: "Cooking",
            })
            .then((response) => {
              console.log(response);
            });
        } else if (status == "Cooking") {
          axios
            .put("/api/order/updateStatus", {
              OrderId: event.target.value,
              OrderStatus: "Ready for pickup",
            })
            .then((response) => {
              console.log(response);
            });
        } else if (status == "Ready for pickup") {
          axios
            .put("/api/order/updateStatus", {
              OrderId: event.target.value,
              OrderStatus: "Completed",
            })
            .then((response) => {
              console.log(response);
            });
        } else if (status == "Rejected") {
          console.log("Rejected");
        } else if (status == "Completed") {
          console.log("Completed");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setRefresh(!refresh);
  };
  const handleReject = (event) => {
    // console.log(event.target.value);
    var id = {
      OrderId: event.target.value,
    };
    axios
      .post("/api/order/getStatus", id)
      .then((response) => {
        var status = response.data[0].OrderStatus;
        var buyer = response.data[0].BuyerEmailId;
        var vendor = response.data[0].VendorEmailId;

        if (status == "Completed") {
          console.log("WILL RETURN");
        } else {
          send(
            "service_1iiyiuo",
            "template_ya552ps",
            {
              from_name: buyer,
              to_name: vendor,
              order_status: "Rejected",
            },
            "user_njfDhOUELqvnnkYzuB7UP"
          )
            .then((response) => {
              console.log("SUCCESS!", response.status, response.text);
            })
            .catch((err) => {
              console.log("FAILED...", err);
            });
          axios
            .put("/api/order/updateStatus", {
              OrderId: event.target.value,
              OrderStatus: "Rejected",
            })
            .then((response) => {
              console.log(response);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setRefresh(!refresh);
    setDisNext(true);
  };

  return (
    <>
      <div style={{ alignItems: "center" }}>
        <FormatListNumberedIcon fontSize="large" color="primary" />
        <h4>View Orders</h4>
        <TabPanel value={value} index={0}>
          <div className="OrderTable">
            <Grid container>
              <Grid item xs={12}>
                <Paper>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell> SR NO.</TableCell>
                        <TableCell> ORDER ID</TableCell>
                        <TableCell> DATE</TableCell>
                        <TableCell> ITEM NAME</TableCell>
                        <TableCell> PRICE</TableCell>
                        <TableCell> QUANTITY</TableCell>
                        <TableCell> BUYER ID</TableCell>
                        <TableCell> STATUS</TableCell>
                        <TableCell> PROCEED TO NEXT STAGE </TableCell>
                        <TableCell> REJECT </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orders.map((user, ind) => (
                        <TableRow key={ind}>
                          <TableCell>{ind}</TableCell>
                          <TableCell>{user._id}</TableCell>
                          <TableCell>{user.Date}</TableCell>
                          <TableCell>{user.ItemName}</TableCell>
                          <TableCell>{user.Price}</TableCell>
                          <TableCell>{user.Quantity}</TableCell>
                          <TableCell>{user.BuyerEmailId}</TableCell>
                          <TableCell>{user.OrderStatus}</TableCell>
                          <TableCell>
                            <Button
                              value={user._id}
                              variant="contained"
                              color="success"
                              onClick={handleNextStage}
                            >
                              NEXT STAGE
                              <SkipNextIcon />
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button
                              value={user._id}
                              variant="contained"
                              color="error"
                              style={{ marginLeft: "10px" }}
                              onClick={handleReject}
                            >
                              REJECT
                              <CancelIcon />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </TabPanel>
      </div>
    </>
  );
};

export default UsersList;
