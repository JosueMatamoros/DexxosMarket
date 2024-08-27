import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Account from "./pages/Account";
import Locations from "./pages/Locations";
import LogIn from "./pages/LogIn";
import IntermediatePage from "./components/logIn/Intermediate";
import Thanks from "./components/products/Thanks";

const Ruting = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/shop" element={<Shop />} />
    <Route path="/account" element={<Account />} />
    <Route path="/locations" element={<Locations />} />
    <Route path="login" element={<LogIn />} />
    <Route path="/intermediate" element={<IntermediatePage />} />
    <Route path="/thanks" element={<Thanks />} />
  </Routes>
);

export default Ruting;
