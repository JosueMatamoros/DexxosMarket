import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Account from "./pages/Account";
import Locations from "./pages/Locations";

const Ruting = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/shop" element={<Shop />} />
    <Route path="/account" element={<Account />} />
    <Route path="/locations" element={<Locations />} />
  </Routes>
);

export default Ruting;
