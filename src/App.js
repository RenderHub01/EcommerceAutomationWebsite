import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Home from "./Component/Home";
import OrderConfirmation from "./Component/OrderConfirmation";
import TrackOrder from "./Component/TrackOrder";
import ReturnOrder from "./Component/ReturnOrder";
import SalesPage from "./Component/SalesPage";
import InventoryManagement from "./Component/InventoryManagement";
import { CartProvider } from "./Component/CartContext";  // Adjust the path accordingly

const App = () => {
  const location = useLocation();
  // You can control when to show the Navbar; for example, only on the home page:
  const showNavbar = location.pathname === "/";
  return (
    <CartProvider>
      {showNavbar && (
        <>
          <Navbar onCartClick={() => { }} />
        </>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/confirmation" element={<OrderConfirmation />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/inventory" element={<InventoryManagement />} />
        <Route path="/sales-page" element={<SalesPage />} />
        <Route path="/return" element={<ReturnOrder />} />
        {/* <Route path="/return" element={<ReturnOrder />} /> */}
      </Routes>
    </CartProvider>
  );
};

export default App;
