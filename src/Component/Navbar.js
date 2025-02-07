import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import CartSidebar from "./CartSidebar";
import OrderCheckout from "./OrderConfirmation";
import { Link } from "react-router-dom";
import { BsBoxSeam } from "react-icons/bs";

const Navbar = ({ onCartClick, cartItems = [] }) => {  // Initialize cartItems as an empty array
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  // Handler for back to home
  const handleBackToHome = () => {
    setShowCheckout(false); // This will hide the OrderCheckout component
    setIsCartOpen(false); // Ensure cart is closed
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between h-24 px-4">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img
              className="h-12 md:h-16"
              src="https://i.ibb.co/6Yxs70d/2021-10-26-23h27-03.png"
              alt="Logo"
            />
            <span className="ml-2 md:ml-4 uppercase font-black text-sm md:text-base text-white">
              Ecom
              <br />
              Stop
            </span>
          </a>

          {/* Navigation Menu - Hidden on Mobile */}
          <nav className="hidden md:contents font-semibold text-base lg:text-lg">
            <ul className="mx-auto flex items-center">
              <li className="p-5 xl:p-8">
                <a
                  href="/"
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <span>Home</span>
                </a>
              </li>
              <li className="p-5 xl:p-8">
                <a
                  href="#about"
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <span>About Us</span>
                </a>
              </li>

              <li className="p-5 xl:p-8">
                <Link
                  to="/track-order"
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <span>Track Order</span>
                </Link>
              </li>
              <li className="p-5 xl:p-8">
                <a
                  href="/confirmation"
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <span>Order confirmation</span>
                </a>
              </li>
              <li className="p-5 xl:p-8">
                <a
                  href="/sales-page"
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <span>Sales page</span>
                </a>
              </li>
            </ul>
          </nav>

          {/* Login, Sign Up, and Cart */}
          <div className="flex items-center space-x-2 md:space-x-4">

            <Link
              to="/inventory"
              className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
            >
              <BsBoxSeam className="text-2xl" />
              <span className="hidden md:inline">Inventory</span>
            </Link>
            {/* Cart Icon with Counter */}
            <div className="relative">
              <button
                className="p-2 text-white hover:text-gray-300 transition-colors"
                onClick={() => setIsCartOpen(true)}
              >
                <FaShoppingCart className="text-2xl" />
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems?.length || 0} {/* Safely access cartItems length */}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => {
          setIsCartOpen(false); // Close cart
          setShowCheckout(true); // Show checkout
        }}
      />

      {/* Order Checkout */}
      {showCheckout && (
        <OrderCheckout
          isVisible={showCheckout}
          onClose={() => setShowCheckout(false)}
          onBackToHome={handleBackToHome}
        />
      )}
    </>
  );
};

export default Navbar;
