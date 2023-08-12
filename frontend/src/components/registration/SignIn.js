import * as React from "react";
import { useState, useEffect } from "react";
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

import axios from "axios";
import ls from "local-storage";

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

export default function SignIn() {
  const [Email, setEmail] = React.useState("");
  const [Password, setPassword] = React.useState("");

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
    setEmail("");
    setPassword("");
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignin = (event) => {
    event.preventDefault();
    const newData = {
      email: Email,
      password: Password,
    };

    axios
      .post("/api/buyer/signin", newData)
      .then((response) => {
        console.log(response);
        // Check for correct password
        if (response.data.user.Email === Email) {
          if (response.data.user.Password === Password) {
            // alert("Login Successful");
            console.log("Successful login");
            ls.set("auth", "true");
            ls.set("usertype", response.data.user.UserType);
            ls.set("firstname", response.data.user.FirstName);
            ls.set("lastname", response.data.user.LastName);
            ls.set("email", response.data.user.Email);
            ls.set("password", response.data.user.Password);
            ls.set("contact", response.data.user.Contact);
            ls.set("age", response.data.user.Age);
            ls.set("batchname", response.data.user.BatchName);
            ls.set("walletamount", response.data.user.WalletAmount);
            window.location = "/";
          } else {
            // Id doesn't belong to a Buyer
            alert("Incorrect email or password");
            console.log("Id doesn't belong to a Buyer");
          }
        }
      })
      .catch((error) => {
        axios
          .post("/api/vendor/signin", newData)
          .then((response) => {
            console.log(response);
            // Check for correct password
            if (response.data.user.Email === Email) {
              if (response.data.user.Password === Password) {
                // alert("Login Successful");
                console.log("Successful login");
                ls.set("auth", "true");
                ls.set("usertype", response.data.user.UserType);
                ls.set("firstname", response.data.user.FirstName);
                ls.set("lastname", response.data.user.LastName);
                ls.set("email", response.data.user.Email);
                ls.set("password", response.data.user.Password);
                ls.set("shopname", response.data.user.ShopName);
                ls.set("openingtime", response.data.user.OpeningTime);
                ls.set("closingtime", response.data.user.ClosingTime);
                window.location = "/";
              } else {
                // Incorrect email
                alert("Incorrect email or password");
                console.log("Incorrect email/password");
              }
            }
          })
          .catch((error) => {
            alert("Email Id doesnot exists");
            console.log("Incorrect email/password");
          });
      });
    // NOT WORKING
    resetInputs();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            zmarginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={Email}
              autoFocus
              onChange={handleEmailChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={Password}
              autoComplete="current-password"
              onChange={handlePasswordChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSignin}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
