import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";

import axios from "axios";
import { useState, useEffect } from "react";
import ls from "local-storage";

import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import Deposits from "../../Dashboard/VDB/Deposits";
import Orders from "../../Dashboard/VDB/Orders";

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

const drawerWidth = 240;

const mdTheme = createTheme();

function DashboardContent() {
  const [items, Setitems] = useState([]);
  const [stats, Setstats] = useState({
    total: "",
    accepted: "",
    rejected: "",
  });

  useEffect(() => {
    const data = {
      id: ls.get("email"),
    };
    console.log(data);
    axios.post("/api/order/top", data).then((response) => {
      Setitems(response.data.slice(0, 5));
    });
    axios.post("/api/order/stat", data).then((response) => {
      Setstats(response.data);
    });
    console.log(items);
  }, []);

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div style={{ alignItems: "center" }}>
      <SignalCellularAltIcon fontSize="large" color="primary" />
      <h4>Order Statistics</h4>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: "flex" }}>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              overflow: "auto",
            }}
          >
            <Container maxWidth="" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                {/* Recent Orders */}
                <Grid item xs={12} style={{ marginBottom: "75px" }}>
                  <Paper
                    sx={{ p: 2, display: "flex", flexDirection: "column" }}
                  >
                    {/* <Orders /> */}
                    <Grid container>
                      <Grid item xs={12}>
                        <Paper>
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell> SR NO.</TableCell>
                                <TableCell> TOP.</TableCell>
                                <TableCell> ITEM NAME</TableCell>
                                <TableCell> NO. OF ORDERS</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {items.map((item, index) => (
                                <TableRow key={index}>
                                  <TableCell>{index}</TableCell>
                                  <TableCell>
                                    <Button variant="contained" color="success">
                                      {index + 1}
                                    </Button>
                                  </TableCell>
                                  <TableCell>{item[0]}</TableCell>
                                  <TableCell>{item[1]}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </Paper>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={4}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 240,
                    }}
                  >
                    <h5>ORDERS PLACED</h5>
                    <div
                      style={{
                        fontSize: "80px",
                        color: "green",
                        marginTop: "10px",
                        border: "3px dashed #0d6efd",
                      }}
                    >
                      {stats.total}
                    </div>
                  </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={4}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 240,
                    }}
                  >
                    <h5>PENDING ORDERS</h5>
                    <div
                      style={{
                        fontSize: "80px",
                        color: "green",
                        marginTop: "10px",
                        border: "3px dashed #0d6efd",
                      }}
                    >
                      {stats.total - stats.completed - stats.rejected}
                    </div>
                  </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={4}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 240,
                    }}
                  >
                    <h5>ORDERS COMPLETED</h5>
                    <div
                      style={{
                        fontSize: "80px",
                        color: "green",
                        marginTop: "10px",
                        border: "3px dashed #0d6efd",
                      }}
                    >
                      {stats.completed}
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}

// import * as React from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import CssBaseline from "@mui/material/CssBaseline";
// import TableCell from "@mui/material/TableCell";
// import Button from "@mui/material/Button";
// import Grid from "@mui/material/Grid";
// import TableContainer from "@mui/material/TableContainer";
// import Typography from "@mui/material/Typography";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import Container from "@mui/material/Container";
// import Box from "@mui/material/Box";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import ls from "local-storage";

// const theme = createTheme();

// const VendorStats = (props) => {
//   const [items, Setitems] = useState([]);
//   const [stats, Setstats] = useState({
//     total: "",
//     accepted: "",
//     rejected: "",
//   });

//   useEffect(() => {
//     const data = {
//       id: ls.get("email"),
//     };
//     console.log(data);
//     axios.post("/api/order/top", data).then((response) => {
//       Setitems(response.data.slice(0, 5));
//     });
//     axios.post("/api/order/stat", data).then((response) => {
//       Setstats(response.data);
//     });
//   }, []);

//   return (
//     <ThemeProvider theme={theme}>
//       <Container maxWidth="xs">
//         <CssBaseline />
//         <Typography
//           component="h1"
//           variant="h5"
//           align="center"
//           margin-bottom="10px"
//         >
//           Top 5 Items
//         </Typography>
//         <TableContainer component={Paper} maxWidth="10px">
//           <Table sx={{ maxWidth: 650 }} aria-label="simple table" align="left">
//             <TableHead>
//               <TableRow>
//                 <TableCell align="center">Item</TableCell>
//                 <TableCell align="center">Orders</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {items.map((item, index) => (
//                 <TableRow
//                   key={item[0]}
//                   sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                 >
//                   <TableCell align="center">{item[0]}</TableCell>
//                   <TableCell align="center">{item[1]}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <br></br>
//         <hr></hr>
//         <br></br>
//         <TableContainer component={Paper} maxWidth="10px">
//           <Table sx={{ maxWidth: 650 }} aria-label="simple table" align="left">
//             <TableHead>
//               <TableRow>
//                 <TableCell align="center">Status</TableCell>
//                 <TableCell align="center">Orders</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               <TableRow
//                 sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//               >
//                 <TableCell align="center">PLACED</TableCell>
//                 <TableCell align="center">{stats.total}</TableCell>
//               </TableRow>
//               <TableRow
//                 sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//               >
//                 <TableCell align="center">PENDING</TableCell>
//                 <TableCell align="center">
//                   {stats.total - stats.completed - stats.rejected}
//                 </TableCell>
//               </TableRow>
//               <TableRow
//                 sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//               >
//                 <TableCell align="center">COMPLETED</TableCell>
//                 <TableCell align="center">{stats.completed}</TableCell>
//               </TableRow>
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Container>
//     </ThemeProvider>
//   );
// };

// export default VendorStats;
