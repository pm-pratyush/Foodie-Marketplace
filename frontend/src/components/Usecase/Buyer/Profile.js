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
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Edit from "@mui/icons-material/Edit";

import "./Profile.css";

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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const theme = createTheme();

export default function Profile(props) {
  const [FirstName, setFirstName] = React.useState("");
  const [LastName, setLastName] = React.useState("");
  const [Password, setPassword] = React.useState("");
  const [Contact, setContact] = React.useState("");
  const [Age, setAge] = React.useState("");
  const [BatchName, setBatchName] = React.useState("");
  const [WalletAmount, setWalletAmount] = React.useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const resetInputs = () => {
    setFirstName("");
    setLastName("");
    setPassword("");
    setContact("");
    setAge("");
    setBatchName("");
  };
  const onChangeFirstName = (event) => {
    setFirstName(event.target.value);
  };
  const onChangeLastName = (event) => {
    setLastName(event.target.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const onChangeContact = (event) => {
    setContact(event.target.value);
  };
  const onChangeAge = (event) => {
    setAge(event.target.value);
  };
  const onChangeBatchName = (event) => {
    setBatchName(event.target.value);
  };

  const handleEditProfile = (event) => {
    event.preventDefault();

    if (FirstName !== "") {
      ls.set("firstname", FirstName);
    }
    if (LastName !== "") {
      ls.set("lastname", LastName);
    }
    if (Password !== "") {
      ls.set("password", Password);
    }
    if (Contact !== "") {
      ls.set("contact", Contact);
    }
    if (Age !== "") {
      ls.set("age", Age);
    }
    if (BatchName !== "") {
      ls.set("batchname", BatchName);
    }
    axios
      .put("/api/buyer/editProfile", {
        Email: ls.get("email"),
        FirstName: ls.get("firstname"),
        LastName: ls.get("lastname"),
        Password: ls.get("password"),
        Contact: ls.get("contact"),
        Age: ls.get("age"),
        BatchName: ls.get("batchname"),
      })
      .then((response) => {
        console.log(response.data);
      });
    resetInputs();
  };

  return (
    <div class="float-container">
      <div class="float-child">
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "white" }}>
                <AccountBoxIcon fontSize="large" color="primary" />
              </Avatar>
              <Typography component="h1" variant="h5">
                User Profile
              </Typography>
              <Box
                component="form"
                noValidate
                sx={{ mt: 3, fontSize: "23px", textAlign: "left" }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    Name:
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {ls.get("firstname")} {ls.get("lastname")}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    Email:
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {ls.get("email")}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    Password:
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {ls.get("password")}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    Contact Number:
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {ls.get("contact")}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    Age:
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {ls.get("age")}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    Batch Name:
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {ls.get("batchname")}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    Wallet Amount:
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    &#x20B9; {ls.get("walletamount")}
                  </Grid>
                </Grid>
                <Grid container justifyContent="flex-end">
                  <Grid item></Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
      <div class="float-child">
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="sm">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "white" }}>
                <EditIcon fontSize="large" color="primary" />
              </Avatar>
              <Typography component="h1" variant="h5">
                Edit Profile
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      value={FirstName}
                      autoFocus
                      onChange={onChangeFirstName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      value={LastName}
                      onChange={onChangeLastName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      value={Password}
                      autoComplete="new-password"
                      onChange={onChangePassword}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="contact"
                      label="Contact Number"
                      type="contact"
                      id="contact"
                      value={Contact}
                      autoComplete="new-contact"
                      onChange={onChangeContact}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="age"
                      label="Age"
                      type="age"
                      id="age"
                      value={Age}
                      autoComplete="new-age"
                      onChange={onChangeAge}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="batchname"
                      label="Batch Name"
                      type="batchname"
                      id="batchname"
                      value={BatchName}
                      autoComplete="new-batchname"
                      onChange={onChangeBatchName}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleEditProfile}
                >
                  Save Changes
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item></Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
    </div>
  );
}
