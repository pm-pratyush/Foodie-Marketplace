import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ls from "local-storage";
import axios from "axios";
import { Rating } from "@mui/material";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Add() {
  const [ItemName, setItemName] = React.useState("");
  const [Price, setPrice] = React.useState("");
  const [Quantity, setQuantity] = React.useState("");
  const [Type, setType] = React.useState("");
  const [AddOns, setAddOns] = React.useState("");
  const [AddOnsPrice, setAddOnsPrice] = React.useState("");
  const [Image, setImage] = React.useState("");
  const [Tags, setTags] = React.useState("");
  const [Rating, setRating] = React.useState("");

  const resetInputs = () => {
    setItemName("");
    setPrice("");
    setQuantity("");
    setType("");
    setAddOns("");
    setAddOnsPrice("");
    setImage("");
    setTags("");
    setRating("");
  };

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
  const onChangeAddOns = (event) => {
    setAddOns(event.target.value);
  };
  const onChangeAddOnsPrice = (event) => {
    setAddOnsPrice(event.target.value);
  };
  const onChangeImage = (event) => {
    setImage(event.target.value);
  };
  const onChangeTags = (event) => {
    setTags(event.target.value);
  };
  const onChangeRating = (event) => {
    setRating(event.target.value);
  };

  const handleAddItem = (event) => {
    event.preventDefault();

    const tempAddOns = {
      addons: AddOns.split(","),
      price: AddOnsPrice.split(","),
    }
    const newItem = {
      ItemName: ItemName,
      Price: Price,
      Quantity: Quantity,
      Type: Type,
      AddOns: tempAddOns,
      Image: Image,
      VendorEmailId: ls.get("email"),
      Tags: Tags.split(","),
      Rating: Rating,
    };
    console.log(newItem);

    axios
      .post("/api/vendor/addItem", newItem)
      .then((response) => {
        console.log(response);
      });
    resetInputs();
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

  return (
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
            Add Item
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
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="rating"
                  label="Rating (0-5)"
                  name="rating"
                  autoComplete="rating"
                  value={Rating}
                  onChange={onChangeRating}
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
                  value={AddOns}
                  onChange={onChangeAddOns}
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
                  value={AddOnsPrice}
                  onChange={onChangeAddOnsPrice}
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
                  onChange={onChangeTags}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleAddItem}
            >
              Add Item
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
