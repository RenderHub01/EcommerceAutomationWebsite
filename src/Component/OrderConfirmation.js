import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle, FaTruck } from 'react-icons/fa';
import axios from 'axios';

const OrderStatus = ({ status }) => (
  <div className="flex items-center justify-center space-x-2 text-green-600">
    <FaTruck className="h-5 w-5" />
    <span className="font-semibold">{status}</span>
  </div>
);

const OrderDetail = ({ label, value }) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-100">
    <span className="text-gray-600">{label}</span>
    <span className="font-medium text-right">{value}</span>
  </div>
);

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const [orderState, setOrderState] = useState({
    loading: true,
    error: null,
    data: null
  });

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get('http://localhost:10000/order_details');
        if (response.data.data) {
          setOrderState({
            loading: false,
            error: null,
            data: response.data.data
          });
        } else {
          throw new Error('No order data received');
        }
      } catch (error) {
        setOrderState({
          loading: false,
          error: error.message || 'Failed to fetch order details',
          data: null
        });
      }
    };

    fetchOrderDetails();
  }, []);

  const handleBackToHome = () => navigate('/');

  if (orderState.loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
            <div className="h-4 w-48 bg-gray-200 rounded mb-3"></div>
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        {orderState.error ? (
          <div className="text-center">
            <FaTimesCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Error</h2>
            <p className="text-gray-600 mb-6">{orderState.error}</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <FaCheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
              <OrderStatus status={orderState.data.current_status} />
            </div>

            <div className="space-y-4">
              <OrderDetail label="Order ID" value={orderState.data.order_id} />
              <OrderDetail label="Product" value={orderState.data.product_title} />
              <OrderDetail label="Delivery Date" value={orderState.data.delivery_date} />
              <OrderDetail label="Email" value={orderState.data.email} />
            </div>

            <button
              onClick={handleBackToHome}
              className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 
                       transition-colors duration-200 font-medium"
            >
              Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderConfirmation;