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
import FavoriteIcon from "@mui/icons-material/Favorite";

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

const FavList = (props) => {
  const [value, setValue] = React.useState(0);
  const [myFav, setMyFav] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");

  const email = {
    email: ls.get("email"),
  };
  useEffect(() => {
    axios
      .post("/api/favourite/getBFavourite", email)
      .then((res) => {
        console.log(res.data);
        setMyFav(res.data);
      })
      .catch((err) => console.log(err));
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
      <FavoriteIcon fontSize="large" color="primary" />
      <h4>User Favourites</h4>
      <TabPanel value={value} index={0}>
        <div className="FavouritesTable">
          <Grid container>
            <Grid item xs={12}>
              <Paper>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell> Sr No.</TableCell>
                      <TableCell> Item Name</TableCell>
                      <TableCell> Vendor Id</TableCell>
                      <TableCell> Price </TableCell>
                      <TableCell> Rating </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {myFav.map((user, ind) => (
                      <TableRow key={ind}>
                        <TableCell>{ind}</TableCell>
                        <TableCell>{user.ItemName}</TableCell>
                        <TableCell>{user.VendorEmailId}</TableCell>
                        <TableCell>{user.Price}</TableCell>
                        <TableCell>{user.Rating}</TableCell>
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

export default FavList;
