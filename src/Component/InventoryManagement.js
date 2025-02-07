import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import iPhone from "../assets/R.jpeg";

const InventoryManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSellForm, setShowSellForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sellFormData, setSellFormData] = useState({
    order_id: '',
    selling_price: '',
    buyer_name: '',
    buyer_contact: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:10000/get_products');
      setProducts(response.data.products);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:10000/delete_product/${productId}`);
      fetchProducts(); // Refresh products list
      setActiveDropdown(null);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleDeleteAllProducts = async () => {
    try {
      await axios.delete('http://localhost:10000/delete_all_products');
      fetchProducts();
    } catch (error) {
      console.error('Error deleting all products:', error);
    }
  };

  const handleSellProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:10000/sell_product', {
        ...sellFormData,
        product_id: selectedProduct._id
      });

      // Handle successful sale
      console.log('Product sold:', response.data);
      setShowSellForm(false);
      setSellFormData({
        order_id: '',
        selling_price: '',
        buyer_name: '',
        buyer_contact: ''
      });
      fetchProducts(); // Refresh products list
    } catch (error) {
      console.error('Error selling product:', error);
    }
  };

  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedItems(selectAll ? [] : products.map((product) => product.id));
  };

  const handleSelectItem = (productId) => {
    setSelectedItems((prevSelected) => {
      if (prevSelected.includes(productId)) {
        return prevSelected.filter((id) => id !== productId);
      } else {
        return [...prevSelected, productId];
      }
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleDropdownClick = (productId) => {
    setActiveDropdown(activeDropdown === productId ? null : productId);
  };

  const handleStatusChange = (productId, newStatus) => {
    // Add your status change logic here
    console.log(`Changing status of product ${productId} to ${newStatus}`);
    setActiveDropdown(null);
  };

  // Update the filtering logic to match API data structure
  const filteredProducts = products.filter((product) => {
    if (!product) return false;

    const searchLower = searchTerm.toLowerCase();
    return (
      (product.title?.toLowerCase() || '').includes(searchLower) ||
      (product._id?.toLowerCase() || '').includes(searchLower) ||
      (product.price?.toLowerCase() || '').includes(searchLower)
    );
  });

  // Pagination logic
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Add Sell Form Modal
  const SellFormModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Sell Product</h3>
          <button
            onClick={() => setShowSellForm(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSellProduct}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Order ID</label>
              <input
                type="text"
                value={sellFormData.order_id}
                onChange={(e) => setSellFormData({ ...sellFormData, order_id: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Selling Price</label>
              <input
                type="number"
                value={sellFormData.selling_price}
                onChange={(e) => setSellFormData({ ...sellFormData, selling_price: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Buyer Name</label>
              <input
                type="text"
                value={sellFormData.buyer_name}
                onChange={(e) => setSellFormData({ ...sellFormData, buyer_name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Buyer Contact</label>
              <input
                type="text"
                value={sellFormData.buyer_contact}
                onChange={(e) => setSellFormData({ ...sellFormData, buyer_contact: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowSellForm(false)}
                className="px-4 py-2 text-sm border rounded-md text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm text-white bg-orange-500 rounded-md hover:bg-orange-600"
              >
                Sell Product
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );

  // Modify the dropdown menu in the table to include Sell option
  const renderDropdownContent = (product) => (
    <div className="py-1" role="menu" aria-orientation="vertical">
      <button
        onClick={() => {
          setSelectedProduct(product);
          setShowSellForm(true);
          setActiveDropdown(null);
        }}
        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
      >
        <span className="inline-block w-full px-4 py-1 rounded-full text-center text-sm font-semibold bg-green-100 text-green-600">
          Sell Product
        </span>
      </button>
      <button
        onClick={() => handleDeleteProduct(product._id)}
        className="w-full px-4 py-2 text-sm text-center text-red-600 hover:bg-red-50 font-medium"
      >
        Delete
      </button>
    </div>
  );

  // Update the product rendering function to match API data structure
  const renderProduct = (product) => {
    if (!product) return null;

    return (
      <tr key={product._id} className="bg-white border-b hover:bg-gray-50">
        <td className="w-4 p-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={selectedItems.includes(product._id)}
              onChange={() => handleSelectItem(product._id)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="h-10 w-10">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={product.main_image || 'https://via.placeholder.com/40'}
              alt={product.title}
            />
          </div>
        </td>
        <td className="px-6 py-4 font-medium text-gray-900 text-center">
          {product.title || 'N/A'}
        </td>
        <td className="px-6 py-4 text-center">
          <a href={product.link} target="_blank" rel="noopener noreferrer"
            className="text-blue-600 hover:underline">
            View on Amazon
          </a>
        </td>
        <td className="px-6 py-4 text-center">{product._id || 'N/A'}</td>
        <td className="px-6 py-4 text-center">
          {product.price_history?.length || 0} variants
        </td>
        <td className="px-6 py-4 text-center">₹{product.price || 'N/A'}</td>
        <td className="px-6 py-4 text-center">
          <span className={`inline-block w-[120px] text-center px-4 py-1 rounded-full text-sm font-semibold 
            ${product.numerical_price > 1000 ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
            {product.numerical_price > 1000 ? 'High Value' : 'Low Value'}
          </span>
        </td>
        <td className="px-6 py-4 relative text-center">
          <div ref={dropdownRef}>
            <button
              onClick={() => handleDropdownClick(product._id)}
              className="font-medium text-blue-600 hover:underline"
            >
              Actions
            </button>
            {activeDropdown === product._id && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                {renderDropdownContent(product)}
              </div>
            )}
          </div>
        </td>
      </tr>
    );
  };

  // Update the table body to use the new renderProduct function
  return (
    <div className="p-4">
      {/* Back to Home Button */}
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-gray-700 hover:text-orange-500">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Home
        </Link>
      </div>

      {/* Heading with Icon */}
      <div className="flex items-center mb-6">
        <svg
          className="w-8 h-8 mr-2 text-orange-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"
          />
        </svg>
        <h1 className="text-2xl font-bold text-orange-500">Inventory</h1>
      </div>

      {/* Search and Actions Row */}
      <div className="flex justify-between items-center mb-4">
        {/* Search Bar */}
        <div className="w-1/3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search products..."
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">
            Export
          </button>
          <button className="bg-orange-500 hover:bg-white hover:text-orange-500 border hover:border-orange-500 text-white px-4 py-2 rounded-lg">
            New Product
          </button>
        </div>
      </div>

      {/* Add Delete All button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleDeleteAllProducts}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Delete All Products
        </button>
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-white uppercase bg-orange-500">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>
              </th>
              <th scope="col" className="px-6 py-3">Image</th>
              <th scope="col" className="px-6 py-3 text-center">Product Title</th>
              <th scope="col" className="px-6 py-3 text-center">Link</th>
              <th scope="col" className="px-6 py-3 text-center">Product ID</th>
              <th scope="col" className="px-6 py-3 text-center">Variants</th>
              <th scope="col" className="px-6 py-3 text-center">Price</th>
              <th scope="col" className="px-6 py-3 text-center">Status</th>
              <th scope="col" className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((product) => renderProduct(product))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4">
        <span className="text-sm font-normal text-gray-500 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Showing <span className="font-semibold text-gray-900">
            {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredProducts.length)}
          </span> of <span className="font-semibold text-gray-900">{filteredProducts.length}</span>
        </span>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
                }`}
            >
              Previous
            </button>
          </li>
          {[...Array(totalPages)].map((_, index) => (
            <li key={index}>
              <button
                onClick={() => handlePageChange(index + 1)}
                className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 ${currentPage === index + 1
                  ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700'
                  : 'text-gray-500 bg-white hover:bg-gray-100'
                  }`}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''
                }`}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>

      {/* Sell Form Modal */}
      {showSellForm && <SellFormModal />}
    </div>
  );
};

export default InventoryManagement;