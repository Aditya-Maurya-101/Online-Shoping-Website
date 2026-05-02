const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Order = require("../models/Order");

const router = express.Router();

/* =====================================================
   VERIFY TOKEN
===================================================== */
const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    let token = null;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      req.userId = null; // guest checkout allowed
      return next();
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_secret_key"
    );

    req.userId = decoded.id || decoded.userId || null;

    next();
  } catch (error) {
    req.userId = null;
    next();
  }
};

/* =====================================================
   CREATE PAYMENT INTENT (DUMMY)
===================================================== */
router.post("/create-payment-intent", verifyToken, async (req, res) => {
  try {
    const { amount } = req.body;

    res.status(200).json({
      success: true,
      clientSecret: "dummy_secret_" + Date.now(),
      amount: amount || 0,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Payment intent creation failed",
      error: error.message,
    });
  }
});

/* =====================================================
   CREATE ORDER
===================================================== */
router.post("/create-order", verifyToken, async (req, res) => {
  try {
    const {
      products,
      shippingAddress,
      paymentMethod,
      userEmail,
      userPhone,
    } = req.body;

    /* ---------------------------
       VALIDATION
    ---------------------------- */
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Products are required",
      });
    }

    if (!shippingAddress) {
      return res.status(400).json({
        success: false,
        message: "Shipping address is required",
      });
    }

    const {
      street,
      city,
      state,
      zip,
      country,
    } = shippingAddress;

    if (!street || !city || !state || !zip) {
      return res.status(400).json({
        success: false,
        message: "All address fields are required",
      });
    }

    /* ---------------------------
       FORMAT PRODUCTS
    ---------------------------- */
    let totalAmount = 0;

    const formattedProducts = products.map((item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 1;

      totalAmount += price * quantity;

      return {
        productId: item._id || "",
        productName: item.name || item.productName || "Product",
        productImage: item.image || "",
        quantity,
        price,
      };
    });

    if (totalAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid order total",
      });
    }

    /* ---------------------------
       CREATE ORDER
    ---------------------------- */
    const newOrder = new Order({
      user: req.userId || null,

      products: formattedProducts,

      totalAmount,

      shippingAddress: {
        street,
        city,
        state,
        zip,
        country: country || "India",
      },

      paymentMethod:
        paymentMethod || "cashondelivery",

      paymentStatus:
        paymentMethod === "cashondelivery" ||
        paymentMethod === "cash on delivery"
          ? "pending"
          : "paid",

      orderStatus: "processing",

      userEmail: userEmail || "",
      userPhone: userPhone || "",
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      orderNumber: savedOrder.orderNumber,
      order: savedOrder,
    });
  } catch (error) {
    console.error("Create Order Error:", error);

    res.status(500).json({
      success: false,
      message: "Order creation failed",
      error: error.message,
    });
  }
});

/* =====================================================
   GET MY ORDERS
===================================================== */
router.get("/my-orders", verifyToken, async (req, res) => {
  try {
    let query = {};

    // For logged-in users, get by userId
    if (req.userId) {
      query.user = req.userId;
    } else {
      // For guests, try to get email from header or query
      const guestEmail = req.headers["x-guest-email"] || req.query.email;
      if (!guestEmail) {
        return res.status(401).json({
          success: false,
          message: "Login required or provide email",
        });
      }
      query.userEmail = guestEmail;
    }

    const orders = await Order.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
});

/* =====================================================
   GET ORDER BY ORDER NUMBER
===================================================== */
router.get("/order/:orderNumber", async (req, res) => {
  try {
    const order = await Order.findOne({
      orderNumber: req.params.orderNumber,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch order",
      error: error.message,
    });
  }
});

/* =====================================================
   UPDATE ORDER STATUS
===================================================== */
router.put("/:id/status", verifyToken, async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body;

    const updateData = {};

    if (orderStatus) {
      updateData.orderStatus = orderStatus;
    }

    if (paymentStatus) {
      updateData.paymentStatus = paymentStatus;
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update order",
      error: error.message,
    });
  }
});

module.exports = router;