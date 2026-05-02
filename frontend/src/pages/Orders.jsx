import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBox, FaTruck, FaCheckCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Breadcrumbs from '../components/pageProps/Breadcrumbs';

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('onlineShoppingUser');

      if (!user) {
        setError('Please login to view your orders');
        setLoading(false);
        return;
      }

      const userData = JSON.parse(user);
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      if (!token) {
        headers['x-guest-email'] = userData.email;
      }

      // Try to fetch from backend
      try {
        const response = await fetch('https://online-shoping-website.onrender.com/api/orders/my-orders', {
          headers
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data.orders || []);
        } else {
          // Fallback: Load from localStorage
          loadOrdersFromLocalStorage();
        }
      } catch (err) {
        // Fallback: Load from localStorage
        loadOrdersFromLocalStorage();
      }

      setError('');
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders');
      loadOrdersFromLocalStorage();
    } finally {
      setLoading(false);
    }
  };

  const loadOrdersFromLocalStorage = () => {
    // Try to load dummy orders from localStorage if backend is not available
    const lastOrderNumber = localStorage.getItem('lastOrderNumber');
    if (lastOrderNumber) {
      const dummyOrder = {
        orderNumber: lastOrderNumber,
        createdAt: new Date().toISOString(),
        totalAmount: parseFloat(localStorage.getItem('lastOrderAmount') || '0'),
        paymentMethod: localStorage.getItem('lastPaymentMethod') || 'card',
        orderStatus: 'processing',
        paymentStatus: 'paid',
        products: [],
        shippingAddress: {
          street: 'Your Address',
          city: 'City',
          state: 'State',
          zip: '12345',
          country: 'India'
        },
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        trackingUpdates: [
          {
            status: 'placed',
            message: 'Order placed successfully',
            timestamp: new Date().toISOString()
          }
        ]
      };
      setOrders([dummyOrder]);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'placed':
        return <FaBox className="text-yellow-500" />;
      case 'processing':
        return <FaBox className="text-blue-500" />;
      case 'shipped':
      case 'out_for_delivery':
        return <FaTruck className="text-orange-500" />;
      case 'delivered':
        return <FaCheckCircle className="text-green-500" />;
      default:
        return <FaBox className="text-gray-500" />;
    }
  };

  const getStatusLabel = (status) => {
    const labels = {
      'placed': 'Order Placed',
      'processing': 'Processing',
      'shipped': 'Shipped',
      'out_for_delivery': 'Out for Delivery',
      'delivered': 'Delivered',
      'cancelled': 'Cancelled'
    };
    return labels[status] || status;
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'N/A';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <Breadcrumbs title="My Orders" />
          <div className="text-center py-12">
            <p className="text-gray-600">Loading your orders...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 pb-24">
      <div className="max-w-6xl mx-auto px-4">
        <Breadcrumbs title="My Orders" />

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <FaBox className="text-6xl text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">No Orders Yet</h2>
            <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
            <button
              onClick={() => navigate('/shop')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id || order.orderNumber} className="bg-white rounded-lg shadow">
                {/* Order Header */}
                <div
                  className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(order.orderStatus)}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Order {order.orderNumber}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Placed on {formatDate(order.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">
                        ₹{order.totalAmount?.toFixed(2) || '0.00'}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center justify-end mt-1">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          order.orderStatus === 'delivered' ? 'bg-green-100 text-green-800' :
                          order.orderStatus === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {getStatusLabel(order.orderStatus)}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Quick Status Bar */}
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <div className="flex space-x-4">
                      <span className={order.orderStatus !== 'placed' ? 'text-green-600 font-medium' : 'text-gray-500'}>
                        ✓ Confirmed
                      </span>
                      <span className={['shipped', 'out_for_delivery', 'delivered'].includes(order.orderStatus) ? 'text-green-600 font-medium' : 'text-gray-500'}>
                        ✓ Shipped
                      </span>
                      <span className={order.orderStatus === 'delivered' ? 'text-green-600 font-medium' : 'text-gray-500'}>
                        ✓ Delivered
                      </span>
                    </div>
                    {expandedOrder === order._id ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedOrder === order._id && (
                  <div className="border-t p-6 bg-gray-50">
                    {/* Products */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Order Items</h4>
                      {order.products && order.products.length > 0 ? (
                        <div className="space-y-2">
                          {order.products.map((product, idx) => (
                            <div key={idx} className="flex justify-between items-center bg-white p-3 rounded">
                              <div>
                                <p className="font-medium text-gray-900">{product.productName || 'Product'}</p>
                                <p className="text-sm text-gray-600">Qty: {product.quantity}</p>
                              </div>
                              <p className="font-medium text-gray-900">₹{(product.price * product.quantity).toFixed(2)}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-600 text-sm">No products details available</p>
                      )}
                    </div>

                    {/* Shipping Address */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Delivery Address</h4>
                      {order.shippingAddress ? (
                        <div className="bg-white p-3 rounded text-sm text-gray-600">
                          <p>{order.shippingAddress.street}</p>
                          <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
                          <p>{order.shippingAddress.country}</p>
                        </div>
                      ) : (
                        <p className="text-gray-600 text-sm">Address not available</p>
                      )}
                    </div>

                    {/* Estimated Delivery */}
                    {order.estimatedDelivery && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">Estimated Delivery</h4>
                        <div className="bg-blue-50 border border-blue-200 rounded p-3">
                          <p className="text-blue-900 font-medium">{formatDate(order.estimatedDelivery)}</p>
                        </div>
                      </div>
                    )}

                    {/* Tracking Updates */}
                    {order.trackingUpdates && order.trackingUpdates.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">Tracking Updates</h4>
                        <div className="space-y-3">
                          {order.trackingUpdates.map((update, idx) => (
                            <div key={idx} className="flex items-start space-x-3 bg-white p-3 rounded">
                              <div className="flex-shrink-0">
                                {getStatusIcon(update.status)}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{getStatusLabel(update.status)}</p>
                                <p className="text-sm text-gray-600">{update.message}</p>
                                <p className="text-xs text-gray-500">{formatDate(update.timestamp)}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Payment & Summary */}
                    <div className="border-t pt-4">
                      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                        <div>
                          <p className="text-gray-600">Payment Method</p>
                          <p className="font-medium text-gray-900 capitalize">{order.paymentMethod || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Payment Status</p>
                          <p className={`font-medium ${order.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                            {order.paymentStatus ? order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1) : 'N/A'}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between text-lg font-semibold pt-4 border-t">
                        <span>Total</span>
                        <span>₹{order.totalAmount?.toFixed(2) || '0.00'}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
