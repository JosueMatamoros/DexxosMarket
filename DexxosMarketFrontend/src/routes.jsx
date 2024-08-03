import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Account from "./pages/Account";
import Locales from "./pages/Locales";

const Ruting = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/shop" element={<Shop />} />
    <Route path="/account" element={<Account />} />
    <Route path="/locales" element={<Locales />} />
  </Routes>
);

export default Ruting;
