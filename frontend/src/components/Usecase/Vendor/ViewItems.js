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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";

import ls from "local-storage";

import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";

const theme = createTheme();

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

const ViewItems = (props) => {
  const [items, setItems] = useState([]);
  const [sortedItems, setSortedItems] = useState([]);

  const [sortName, setSortName] = useState(true);
  const [searchText, setSearchText] = useState("");

  const [refresh, setRefresh] = useState(false);

  const [ItemName, setItemName] = React.useState("");
  const [Price, setPrice] = React.useState("");
  const [Quantity, setQuantity] = React.useState("");
  const [Type, setType] = React.useState("");
  const [TempAddOns, setTempAddOns] = React.useState("");
  const [TempAddOnsPrice, setTempAddOnsPrice] = React.useState("");
  const [Image, setImage] = React.useState("");
  const [Tags, setTags] = React.useState("");

  const onChangeItemName = (event) => {
    setItemName(event.target.value);
  };
  const onChangePrice = (event) => {
    setPrice(event.target.value);
  };
  const onChangeQuantity = (event) => {
    setQuantity(event.target.value);
  };
  const onChangeType = (event) => {
    setType(event.target.value);
  };
  const onChangeTempAddOns = (event) => {
    setTempAddOns(event.target.value);
  };
  const onChangeTempAddOnsPrice = (event) => {
    setTempAddOnsPrice(event.target.value);
  };
  const onChangeImage = (event) => {
    setImage(event.target.value);
  };
  const onChangeTags = (event) => {
    setTags(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const email = {
    email: ls.get("email"),
  };
  useEffect(() => {
    axios
      .post("/api/vendor/getItems", email)
      .then((response) => {
        setItems(response.data);
        setSortedItems(response.data);
        setSearchText("");
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refresh]);

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const customFunction = (event) => {
    console.log(event.target.value);
    setSearchText(event.target.value);
  };

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setRefresh(!refresh);
  };

  const handleEditItem = (item) => {
    ls.set("toEditItem", item);

    setItemName(item.ItemName);
    setPrice(item.Price);
    setQuantity(item.Quantity);
    setType(item.Type);
    setTempAddOns(item.AddOns.addons);
    setTempAddOnsPrice(item.AddOns.price);
    setImage(item.Image);
    setTags(item.Tags);

    setOpen(true);
  };

  const handleSaveChanges = (event) => {
    const tempAddOns = {
      addons: TempAddOns,
      price: TempAddOnsPrice,
    };
    axios
      .put("/api/vendor/editItem", {
        ItemId: ls.get("toEditItem")._id,
        ItemName: ItemName,
        Price: Price,
        Quantity: Quantity,
        Type: Type,
        AddOns: tempAddOns,
        Image: Image,
        Tags: Tags,
      })
      .then((response) => {
        console.log(response.data);
      });

    setOpen(false);
    setRefresh(!refresh);
  };

  const handleDeleteItem = (item) => {
    console.log(item);

    axios
      .delete("/api/vendor/deleteItem", {
        data: {
          id: item._id,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setRefresh(!refresh);
  };
  console.log(items);

  return (
    <>
      <TabPanel value={value} index={0}>
        <div className="MenuTable">
          <Grid container>
            <Grid item xs={12}>
              <Paper>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell> SR. NO.</TableCell>
                      <TableCell> ITEM NAME</TableCell>
                      <TableCell> ITEM PHOTO</TableCell>
                      <TableCell> PRICE</TableCell>
                      <TableCell> QUANTITY</TableCell>
                      <TableCell> TYPE</TableCell>
                      <TableCell> ADD ONS</TableCell>
                      <TableCell> ADD ONS PRICE</TableCell>
                      <TableCell> TAGS</TableCell>
                      <TableCell> EDIT ITEM</TableCell>
                      <TableCell> DELETE ITEM</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {items.map((user, ind) => (
                      <TableRow key={ind}>
                        <TableCell>{ind}</TableCell>
                        <TableCell>{user.ItemName}</TableCell>
                        <TableCell>
                          <img
                            src={user.Image}
                            alt="Item Pic"
                            style={{ height: "100px", width: "150px" }}
                          />
                        </TableCell>
                        <TableCell>{user.Price}</TableCell>
                        <TableCell>{user.Quantity}</TableCell>
                        <TableCell>{user.Type}</TableCell>
                        <TableCell>
                          {user.AddOns.addons.map((name) => (
                            <li>{name}</li>
                          ))}
                        </TableCell>
                        <TableCell>
                          {user.AddOns.price.map((name) => (
                            <li>{name}</li>
                          ))}
                        </TableCell>
                        <TableCell>
                          {user.Tags.map((name) => (
                            <li>{name}</li>
                          ))}
                        </TableCell>
                        <TableCell>
                          <Button
                            value={user._id}
                            variant="contained"
                            color="success"
                            onClick={() => handleEditItem(user)}
                          >
                            EDIT ITEM
                            <EditIcon />
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            value={user._id}
                            variant="contained"
                            color="error"
                            style={{ marginLeft: "10px" }}
                            onClick={() => handleDeleteItem(user)}
                          >
                            DELETE
                            <CancelIcon />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Dialog open={open} onClose={handleClose}>
                  <DialogContent>
                    <ThemeProvider theme={theme}>
                      <Container component="main" maxWidth="xs">
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Typography component="h1" variant="h5">
                            Edit Item
                          </Typography>
                          <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{ mt: 3 }}
                          >
                            <Grid container spacing={2}>
                              <Grid item xs={12}>
                                <TextField
                                  autoFocus
                                  required
                                  fullWidth
                                  id="itemname"
                                  label="Item Name"
                                  name="itemname"
                                  autoComplete="itemname"
                                  value={ItemName}
                                  onChange={onChangeItemName}
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  autoComplete="given-name"
                                  name="quantity"
                                  required
                                  fullWidth
                                  id="quantity"
                                  label="Quantity"
                                  value={Quantity}
                                  onChange={onChangeQuantity}
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  required
                                  fullWidth
                                  id="price"
                                  label="Price"
                                  name="price"
                                  autoComplete="family-name"
                                  value={Price}
                                  onChange={onChangePrice}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  required
                                  fullWidth
                                  id="image"
                                  label="Image URL"
                                  name="image"
                                  autoComplete="image"
                                  value={Image}
                                  onChange={onChangeImage}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  required
                                  fullWidth
                                  id="type"
                                  label="Type: Veg / Non-Veg"
                                  name="type"
                                  autoComplete="type"
                                  value={Type}
                                  onChange={onChangeType}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  required
                                  fullWidth
                                  name="addons"
                                  label="Add-Ons"
                                  type="addons"
                                  id="addons"
                                  autoComplete="new-addons"
                                  value={TempAddOns}
                                  // onChange={onChangeTempAddOns}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  required
                                  fullWidth
                                  name="addonsprice"
                                  label="Add-Ons-Price"
                                  type="addonsprice"
                                  id="addonsprice"
                                  autoComplete="new-addonsprice"
                                  value={TempAddOnsPrice}
                                  // onChange={onChangeTempAddOnsPrice}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  required
                                  fullWidth
                                  name="tags"
                                  label="Tags"
                                  type="tags"
                                  id="tags"
                                  autoComplete="new-tags"
                                  value={Tags}
                                  // onChange={onChangeTags}
                                />
                              </Grid>
                            </Grid>
                          </Box>
                        </Box>
                      </Container>
                    </ThemeProvider>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      type="submit"
                      color="error"
                      variant="contained"
                      onClick={handleClose}
                    >
                      CANCEL
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="success"
                      onClick={handleSaveChanges}
                    >
                      SAVE CHANGES
                    </Button>
                  </DialogActions>
                </Dialog>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </TabPanel>
    </>
  );
};

export default ViewItems;
