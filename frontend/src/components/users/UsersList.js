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
  const [buyers, setBuyers] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [sortedBuyers, setSortedBuyers] = useState([]);
  const [sortedVendors, setSortedVendors] = useState([]);

  const [sortName, setSortName] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    axios
      .get("/api/buyer")
      .then((response) => {
        setBuyers(response.data);
        setSortedBuyers(response.data);
        setSearchText("");
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("/api/vendor")
      .then((response) => {
        setVendors(response.data);
        setSortedVendors(response.data);
        setSearchText("");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const customFunction = (event) => {
    console.log(event.target.value);
    setSearchText(event.target.value);
  };

  return (
    <>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="BUYERS" />
          <Tab label="VENDORS" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div className="BuyersTable">
          <Grid container>
            <Grid item xs={12} md={3} lg={3}>
              <List component="nav" aria-label="mailbox folders">
                <ListItem text>
                  <Button variant="outlined" size="large">
                    BUYERS
                  </Button>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={9} lg={9}>
              <List component="nav" aria-label="mailbox folders">
                <TextField
                  id="standard-basic"
                  label="Search"
                  fullWidth={true}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <IconButton>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </List>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Paper>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell> Sr No.</TableCell>
                      <TableCell> First Name</TableCell>
                      <TableCell> Last Name</TableCell>
                      <TableCell> Email </TableCell>
                      <TableCell> Contact No. </TableCell>
                      <TableCell> Batch Name </TableCell>
                      <TableCell> Wallet Amount </TableCell>
                      {/* <TableCell> Password </TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {buyers.map((user, ind) => (
                      <TableRow key={ind}>
                        <TableCell>{ind}</TableCell>
                        <TableCell>{user.FirstName}</TableCell>
                        <TableCell>{user.LastName}</TableCell>
                        <TableCell>{user.Email}</TableCell>
                        <TableCell>{user.Contact}</TableCell>
                        <TableCell>{user.BatchName}</TableCell>
                        <TableCell>{user.WalletAmount}</TableCell>
                        {/* <TableCell>{user.Password}</TableCell> */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="VendorsTable">
          <Grid container>
            <Grid item xs={12} md={3} lg={3}>
              <List component="nav" aria-label="mailbox folders">
                <ListItem text>
                  <Button variant="outlined" size="large">
                    VENDORS
                  </Button>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={9} lg={9}>
              <List component="nav" aria-label="mailbox folders">
                <TextField
                  id="standard-basic"
                  label="Search"
                  fullWidth={true}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <IconButton>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  // onChange={customFunction}
                />
              </List>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Paper>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell> Sr No.</TableCell>
                      <TableCell> First Name</TableCell>
                      <TableCell> Last Name</TableCell>
                      <TableCell> Email </TableCell>
                      <TableCell> Shop Name </TableCell>
                      {/* <TableCell> Password </TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {vendors.map((user, ind) => (
                      <TableRow key={ind}>
                        <TableCell>{ind}</TableCell>
                        <TableCell>{user.FirstName}</TableCell>
                        <TableCell>{user.LastName}</TableCell>
                        <TableCell>{user.Email}</TableCell>
                        <TableCell>{user.ShopName}</TableCell>
                        {/* <TableCell>{user.Password}</TableCell> */}
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

export default UsersList;
