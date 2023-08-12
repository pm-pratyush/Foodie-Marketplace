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
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function BasicAlerts() {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity="success">This is a success alert — check it out!</Alert>
    </Stack>
  );
}

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

export default function VSignUp() {
  const [FirstName, setFirstName] = React.useState("");
  const [LastName, setLastName] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const [Password, setPassword] = React.useState("");
  const [ShopName, setShopName] = React.useState("");
  const [OpeningTime, setOpeningTime] = React.useState(null);
  const [ClosingTime, setClosingTime] = React.useState(null);

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
    setEmail("");
    setPassword("");
    setShopName("");
    setOpeningTime(null);
    setClosingTime(null);
  };
  const onChangeFirstName = (event) => {
    setFirstName(event.target.value);
  };
  const onChangeLastName = (event) => {
    setLastName(event.target.value);
  };
  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const onChangeShopName = (event) => {
    setShopName(event.target.value);
  };
  const onChangeOpeningTime = (event) => {
    setOpeningTime(event.target.value);
  };
  const onChangeClosingTime = (event) => {
    setClosingTime(event.target.value);
  };

  const handleSignup = (event) => {
    event.preventDefault();
    const newVendor = {
      FirstName: FirstName,
      LastName: LastName,
      Email: Email,
      Password: Password,
      ShopName: ShopName,
      OpeningTime: OpeningTime,
      ClosingTime: ClosingTime,
    };
    console.log(newVendor);
    axios
      .post("/api/vendor/signup", newVendor)
      .then((response) => {
        alert("Signup Successful");
        console.log(response.data);
      });
    resetInputs();
  };

  return (
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
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
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={Email}
                  onChange={onChangeEmail}
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
                  autoComplete="new-password"
                  value={Password}
                  onChange={onChangePassword}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Shop Name *
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={ShopName}
                    label="Shop Name"
                    onChange={onChangeShopName}
                  >
                    <MenuItem value={"JC"}>JC</MenuItem>
                    <MenuItem value={"VC"}>VC</MenuItem>
                    <MenuItem value={"BBC"}>BBC</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                  autoComplete="given-name"
                  name="openingtime"
                  required
                  fullWidth
                  id="openingtime"
                  label="Opening Time: HH:MM"
                  value={OpeningTime}
                  onChange={onChangeOpeningTime}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                  autoComplete="given-name"
                  name="closingtime"
                  required
                  fullWidth
                  id="closingtime"
                  label="Closing Time: HH:MM"
                  value={ClosingTime}
                  onChange={onChangeClosingTime}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSignup}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
