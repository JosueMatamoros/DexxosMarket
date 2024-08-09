import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Account from "./pages/Account";
import Locations from "./pages/Locations";
import LogIn from "./pages/LogIn";

const Ruting = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/shop" element={<Shop />} />
    <Route path="/account" element={<Account />} />
    <Route path="/locations" element={<Locations />} />
    <Route path="login" element={<LogIn />} />
  </Routes>
);

export default Ruting;
