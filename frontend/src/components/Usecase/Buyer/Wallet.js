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
import axios from "axios";

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

export default function Wallet(props) {
  const [walletAmount, setWalletAmount] = React.useState(
    ls.get("walletamount")
  );
  const [addAmount, setAddAmount] = React.useState(0);

  const resetInputs = () => {
    setAddAmount(0);
  };
  const onChangeAddAmount = (event) => {
    console.log(event.target.value);
    setAddAmount(event.target.value);
  };
  const handleAddMoney = (event) => {
    event.preventDefault();
    setWalletAmount(parseInt(walletAmount) + parseInt(addAmount));

    // Update the amount in the database = walletAmount
    axios
      .put("/api/wallet/addAmount", {
        Email: ls.get("email"),
        WalletAmount: parseInt(walletAmount) + parseInt(addAmount),
      })
      .then((response) => {
        console.log(response);
      });
    ls.set("walletamount", parseInt(walletAmount) + parseInt(addAmount));
    resetInputs();
  };

  return (
    <div>
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
            <AccountBalanceWalletIcon fontSize="large" color="primary" />
            <Typography component="h1" variant="h5">
              User Wallet
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid
                container
                spacing={2}
                style={{
                  fontSize: "18px",
                  padding: "10px",
                  borderRadius: "20px",
                  border: "1px solid #ccc",
                  marginTop: "10px",
                }}
              >
                Available User Balance : &#8377; {walletAmount}
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
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
            <AddCircleOutlineIcon fontSize="large" color="primary" />
            <Typography component="h1" variant="h5">
              Add Money to Wallet
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="addamount"
                    label="Enter Amount"
                    name="addamount"
                    autoComplete="addamount"
                    value={addAmount > 0 ? addAmount : ""}
                    onChange={onChangeAddAmount}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="Add the above amount to my User Wallet"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleAddMoney}
              >
                Add Money
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
