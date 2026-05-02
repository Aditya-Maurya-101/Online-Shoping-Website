import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaBox, FaTruck, FaMapMarkerAlt } from 'react-icons/fa';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    const lastOrder = localStorage.getItem('lastOrderNumber');
    if (lastOrder) {
      setOrderNumber(lastOrder);
    } else {
      // If no order number, redirect back
      setTimeout(() => navigate('/shop'), 3000);
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Success Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center mb-6">
          <div className="flex justify-center mb-6">
            <FaCheckCircle className="text-green-500 text-6xl" />
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Order Placed Successfully!
          </h1>

          <p className="text-gray-600 mb-6 text-lg">
            Thank you for your purchase. Your order has been confirmed and is being processed.
          </p>

          {/* Order Number */}
          {orderNumber && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-1">Your Order Number</p>
              <p className="text-2xl font-bold text-blue-600">{orderNumber}</p>
              <p className="text-xs text-gray-500 mt-2">Save this number for your records</p>
            </div>
          )}

          <p className="text-gray-600">
            Order confirmation email will be sent to your registered email address shortly.
          </p>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">What happens next?</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-500 text-white">
                  <FaCheckCircle />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Order Confirmed</h3>
                <p className="mt-1 text-gray-600">Your order has been confirmed and payment has been processed</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-500 text-white">
                  <FaBox />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Processing (1-2 Days)</h3>
                <p className="mt-1 text-gray-600">Your order is being packed and prepared for shipment</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-500 text-white">
                  <FaTruck />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Shipped</h3>
                <p className="mt-1 text-gray-600">Your order is on its way. Tracking details will be sent via email</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-500 text-white">
                  <FaMapMarkerAlt />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Delivered (3-7 Days)</h3>
                <p className="mt-1 text-gray-600">Your package will be delivered to your address</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📧 Email Confirmation</h3>
            <p className="text-gray-600 text-sm">
              A detailed order confirmation with all product details and delivery address has been sent to your email. Please check your inbox and spam folder.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📞 Need Help?</h3>
            <p className="text-gray-600 text-sm">
              If you have any questions about your order, please contact our customer support team. We're here to help!
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-center text-gray-600 mb-4">What would you like to do next?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/shop"
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center font-medium"
            >
              Continue Shopping
            </Link>
            <Link
              to="/profile"
              className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors text-center font-medium"
            >
              View My Orders
            </Link>
            <Link
              to="/"
              className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors text-center font-medium"
            >
              Back to Home
            </Link>
          </div>
        </div>

        {/* Contact Support */}
        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-600">
            Need assistance? <Link to="/contact" className="text-blue-600 hover:underline font-medium">Contact our support team</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;