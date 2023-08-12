import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import ls from "local-storage";

import UsersList from "./components/users/UsersList";
import Navbar from "./components/templates/Navbar";
import Profile from "./components/Usecase/Buyer/Profile";

import SignIn from "./components/registration/SignIn";
import SignUp from "./components/registration/SignUp";
import Wallet from "./components/Usecase/Buyer/Wallet";
import Landingpage from "./components/layout/Landingpage";

import BDashboard from "./components/Dashboard/BDB/Dashboard";
import VDashboard from "./components/Dashboard/VDB/Dashboard";

const Layout = () => {
  ls.set("auth", "false");
  return (
    <>
      <Navbar />
      <div
        style={{
          textAlign: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <div style={{ margin: "20px" }}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {ls.get("auth") === "true" ? (
            ls.get("usertype") === "Buyer" ? (
              <Route path="/" element={<BDashboard />} />
            ) : (
              <Route path="/" element={<VDashboard />} />
            )
          ) : (
            <Route path="/" element={<Landingpage />} />
          )}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wallet" element={<Wallet />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
