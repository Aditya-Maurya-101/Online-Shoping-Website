import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { resetCart } from "../redux/onlineShoppingSlice";

const CheckoutForm = ({ totalAmount, onSuccess, cartItems }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("cashondelivery");

  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "India",
  });

  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");

  /* ==========================================
     LOAD USER DATA
  ========================================== */
  useEffect(() => {
    const storedUser = localStorage.getItem("onlineShoppingUser");

    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);

        setUserEmail(user.email || "");
        setUserPhone(user.phone || "");
      } catch (error) {
        console.log("User parse failed");
      }
    }
  }, []);

  /* ==========================================
     INPUT HANDLERS
  ========================================== */
  const handleAddressChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleCardChange = (e) => {
    let { name, value } = e.target;

    if (name === "cardNumber") {
      value = value
        .replace(/\D/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim()
        .slice(0, 19);
    }

    if (name === "expiryDate") {
      value = value.replace(/\D/g, "");

      if (value.length >= 2) {
        value = value.slice(0, 2) + "/" + value.slice(2, 4);
      }
    }

    if (name === "cvv") {
      value = value.replace(/\D/g, "").slice(0, 4);
    }

    setCardDetails({
      ...cardDetails,
      [name]: value,
    });
  };

  /* ==========================================
     VALIDATION
  ========================================== */
  const validateForm = () => {
    if (!userEmail) {
      setError("Email is required");
      return false;
    }

    if (
      !shippingAddress.street ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.zip
    ) {
      setError("Please fill all address fields");
      return false;
    }

    if (paymentMethod === "card") {
      if (cardDetails.cardNumber.length < 19) {
        setError("Enter valid card number");
        return false;
      }

      if (cardDetails.expiryDate.length < 5) {
        setError("Enter expiry date");
        return false;
      }

      if (cardDetails.cvv.length < 3) {
        setError("Enter valid CVV");
        return false;
      }
    }

    return true;
  };

  /* ==========================================
     SUBMIT ORDER
  ========================================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!cartItems || cartItems.length === 0) {
      setError("Cart is empty");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const headers = token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {};

      const products = cartItems.map((item) => ({
        _id: String(item._id || ""),
        name: item.name || item.productName || "Product",
        image: item.image || "",
        quantity: Number(item.quantity) || 1,
        price: Number(item.price) || 0,
      }));

      const orderData = {
        products,
        shippingAddress,
        paymentMethod,
        userEmail,
        userPhone,
      };

      console.log(
        "Sending order data:",
        JSON.stringify(orderData, null, 2)
      );

      /* Fake payment wait */
      if (
        paymentMethod === "card" ||
        paymentMethod === "gpay" ||
        paymentMethod === "paypal" ||
        paymentMethod === "upi"
      ) {
        await new Promise((resolve) =>
          setTimeout(resolve, 1200)
        );
      }

      const response = await axios.post(
        "https://online-shoping-website.onrender.com/api/orders/create-order",
        orderData,
        { headers }
      );

      console.log("Order Response:", response.data);

      if (response.data.success) {
        localStorage.setItem(
          "lastOrderNumber",
          response.data.orderNumber
        );
        localStorage.setItem(
          "lastOrderAmount",
          totalAmount.toString()
        );
        localStorage.setItem(
          "lastPaymentMethod",
          paymentMethod
        );

        localStorage.removeItem("cart");

        dispatch(resetCart());

        onSuccess();
      } else {
        setError("Order failed");
      }
    } catch (error) {
      console.error("FULL ERROR:", error);
      console.error("SERVER ERROR:", error.response?.data);

      setError(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Payment failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ==========================================
     UI
  ========================================== */
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-100 text-red-700 border border-red-400 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Contact */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Contact Information
        </h3>

        <div className="space-y-3">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full border px-3 py-2 rounded"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="Phone Number"
            className="w-full border px-3 py-2 rounded"
            value={userPhone}
            onChange={(e) => setUserPhone(e.target.value)}
          />
        </div>
      </div>

      {/* Address */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Shipping Address
        </h3>

        <div className="space-y-3">
          <input
            type="text"
            name="street"
            placeholder="Street Address"
            className="w-full border px-3 py-2 rounded"
            value={shippingAddress.street}
            onChange={handleAddressChange}
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              name="city"
              placeholder="City"
              className="border px-3 py-2 rounded"
              value={shippingAddress.city}
              onChange={handleAddressChange}
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              className="border px-3 py-2 rounded"
              value={shippingAddress.state}
              onChange={handleAddressChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              name="zip"
              placeholder="ZIP Code"
              className="border px-3 py-2 rounded"
              value={shippingAddress.zip}
              onChange={handleAddressChange}
            />

            <input
              type="text"
              name="country"
              placeholder="Country"
              className="border px-3 py-2 rounded"
              value={shippingAddress.country}
              onChange={handleAddressChange}
            />
          </div>
        </div>
      </div>

      {/* Payment */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Payment Method
        </h3>

        <div className="space-y-2">
          {[
            "cashondelivery",
            "card",
            "gpay",
            "paypal",
            "upi",
          ].map((method) => (
            <label
              key={method}
              className="flex items-center border p-3 rounded cursor-pointer"
            >
              <input
                type="radio"
                value={method}
                checked={paymentMethod === method}
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
              />
              <span className="ml-3 capitalize">
                {method}
              </span>
            </label>
          ))}
        </div>

        {paymentMethod === "card" && (
          <div className="mt-4 space-y-3 bg-gray-50 p-4 rounded border">
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              className="w-full border px-3 py-2 rounded"
              value={cardDetails.cardNumber}
              onChange={handleCardChange}
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                name="expiryDate"
                placeholder="MM/YY"
                className="border px-3 py-2 rounded"
                value={cardDetails.expiryDate}
                onChange={handleCardChange}
              />

              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                className="border px-3 py-2 rounded"
                value={cardDetails.cvv}
                onChange={handleCardChange}
              />
            </div>
          </div>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-yellow-400 hover:bg-yellow-500 font-bold py-3 rounded disabled:opacity-50"
      >
        {loading
          ? "Processing..."
          : `Pay ₹${totalAmount.toFixed(2)}`}
      </button>
    </form>
  );
};

/* ==========================================
   MAIN CHECKOUT PAGE
========================================== */
const Checkout = () => {
  const navigate = useNavigate();

  const cartItems = useSelector(
    (state) => state.onlineShoppingReducer.products
  );

  const totalAmount = cartItems.reduce(
    (sum, item) =>
      sum +
      Number(item.price) * Number(item.quantity),
    0
  );

  const handleSuccess = () => {
    navigate("/order-success");
  };

  if (!cartItems.length) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <button
          onClick={() => navigate("/shop")}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-5xl mx-auto px-4 grid lg:grid-cols-2 gap-8">
        {/* Summary */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">
            Order Summary
          </h2>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between border-b pb-3"
              >
                <div>
                  <p>{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p>
                  ₹
                  {(
                    Number(item.price) *
                    Number(item.quantity)
                  ).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t font-bold text-lg flex justify-between">
            <span>Total</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white p-6 rounded shadow">
          <CheckoutForm
            totalAmount={totalAmount}
            onSuccess={handleSuccess}
            cartItems={cartItems}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;