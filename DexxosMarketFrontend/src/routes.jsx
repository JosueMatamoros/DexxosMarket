import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Account from "./pages/Account";

const Ruting = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/account" element={<Account />} />
            
        </Routes>
    </Router>
);

export default Ruting;