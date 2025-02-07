import React, { useState, useEffect } from "react";
import axios from "axios";
import iPhone from "../assets/R.jpeg";
import { Link } from "react-router-dom";

const TrackOrder = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:10000/get_orders');
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <section className="bg-white py-8 antialiased text-gray-800 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="py-4">
          <Link
            to="/"
            className="inline-flex items-center text-gray-700 hover:text-orange-500"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
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
              d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
            />
          </svg>
          <h1 className="text-2xl font-bold text-orange-500">
            Track Your Order
          </h1>
        </div>

        <div className="mt-6 sm:mt-8 lg:flex lg:gap-8">
          <div className="w-full divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 dark:divide-orange-500 dark:border-orange-500 lg:max-w-xl xl:max-w-2xl">
            {/* Product Items */}
            {orders.map((order, index) => (
              <div key={index} className="space-y-4 p-6">
                <div className="flex items-center gap-6">
                  <a href="/" className="h-14 w-14 shrink-0">
                    <img
                      className="h-full w-full"
                      src={order.image}
                      alt={order.product_title}
                    />
                  </a>

                  <a
                    href="/"
                    className="min-w-0 flex-1 font-medium text-gray-900 hover:underline"
                  >
                    {order.product_title}
                  </a>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    <span className="font-medium text-orange-500">
                      Order ID:
                    </span>{" "}
                    {order.order_id}
                  </p>

                  <div className="flex items-center justify-end gap-4">
                    <p className="text-base font-normal text-gray-900">
                      Status: {order.current_status}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-500">
                  Delivery Date: {order.delivery_date}
                </p>
                <p className="text-sm text-gray-500">
                  Email: {order.email}
                </p>
              </div>
            ))}

            {/* Summary Section */}
            <div className="space-y-4 bg-gray-50 p-6">
              <div className="space-y-2">
                <dl className="flex items-center justify-between gap-4">
                  <dt className="font-normal text-gray-500 ">Original price</dt>
                  <dd className="font-medium text-gray-900">$6,592.00</dd>
                </dl>
                <dl className="flex items-center justify-between gap-4">
                  <dt className="font-normal text-gray-500">Savings</dt>
                  <dd className="text-base font-medium text-green-500">
                    -$299.00
                  </dd>
                </dl>
                <dl className="flex items-center justify-between gap-4">
                  <dt className="font-normal text-gray-500">Store Pickup</dt>
                  <dd className="font-medium text-gray-900">$99</dd>
                </dl>
                <dl className="flex items-center justify-between gap-4">
                  <dt className="font-normal text-gray-500">Tax</dt>
                  <dd className="font-medium text-gray-900">$799</dd>
                </dl>
              </div>
              <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                <dt className="text-lg font-bold text-gray-900 ">Total</dt>
                <dd className="text-lg font-bold text-gray-900">$7,191.00</dd>
              </dl>
            </div>
          </div>

          {/* Order History Section */}
          <div className="mt-6 grow sm:mt-8 lg:mt-0">
            <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-orange-500 ">
              <h3 className="text-xl font-semibold text-gray-900 ">
                Order history
              </h3>
              <ol className="relative ms-3 border-s border-gray-200 dark:border-orange-500">
                {/* Order History Items */}
                {[
                  {
                    status: "Delivered",
                    date: "March 24, 2024",
                    time: "11:32 AM",
                    description: "Package delivered to recipient address",
                    icon: (
                      <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M5 13l4 4L19 7" />
                      </svg>
                    )
                  },
                  {
                    status: "Out for Delivery",
                    date: "March 24, 2024",
                    time: "8:00 AM",
                    description: "Package is out for delivery",
                    icon: (
                      <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                      </svg>
                    )
                  },
                  {
                    status: "In Transit",
                    date: "March 23, 2024",
                    time: "2:15 PM",
                    description: "Package arrived at local facility",
                    icon: (
                      <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    )
                  },
                  {
                    status: "Shipped",
                    date: "March 22, 2024",
                    time: "9:45 AM",
                    description: "Package has left the warehouse",
                    icon: (
                      <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                    )
                  },
                  {
                    status: "Order Confirmed",
                    date: "March 21, 4",
                    time: "3:20 PM",
                    description: "Order has been confirmed",
                    icon: (
                      <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )
                  },
                ].map((item, index) => (
                  <li key={index} className="mb-6 ms-6">
                    <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 ring-8 ring-white">
                      {item.icon}
                    </span>
                    <h3 className="mb-1 flex items-center text-lg font-semibold text-gray-900">
                      {item.status}
                    </h3>
                    <time className="mb-2 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                      {item.date} at {item.time}
                    </time>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ol>

              <div class="gap-4 sm:flex sm:items-center">
                <button
                  type="button"
                  class="w-full rounded-lg  border border-gray-200 bg-white px-5  py-2.5 text-sm font-medium hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600  dark:text-black-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                >
                  Cancel the order
                </button>

                <a
                  href="/"
                  class="mt-4 flex w-full items-center justify-center rounded-lg  px-5 py-2.5 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:mt-0"
                >
                  Order details
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrackOrder;
