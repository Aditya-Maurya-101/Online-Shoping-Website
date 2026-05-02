const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { 
      type: String, 
      unique: true, 
      sparse: true,
      default: null
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    userEmail: { type: String, required: true },
    userPhone: { type: String, required: true },
    products: [{
      productId: String,
      productName: String,
      productImage: String,
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true },
    shippingAddress: {
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String
    },
    paymentMethod: { type: String, enum: ["card", "cashondelivery", "gpay", "paypal", "upi"], default: "card" },
    paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
    orderStatus: { type: String, enum: ["placed", "processing", "shipped", "out_for_delivery", "delivered", "cancelled"], default: "placed" },
    estimatedDelivery: Date,
    trackingUpdates: [{
      status: String,
      timestamp: { type: Date, default: Date.now },
      message: String
    }],
    stripePaymentIntentId: String
  },
  { timestamps: true }
);

// Auto-generate order number before validation and saving
orderSchema.pre('validate', function(next) {
  if (!this.orderNumber) {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    this.orderNumber = `ORD-${timestamp}-${random}`;
  }
  next();
});

// Set defaults before saving
orderSchema.pre('save', function(next) {
  // Ensure orderNumber is always set
  if (!this.orderNumber) {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    this.orderNumber = `ORD-${timestamp}-${random}`;
  }
  
  // Set estimated delivery if not already set
  if (!this.estimatedDelivery) {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 7);
    this.estimatedDelivery = deliveryDate;
  }
  
  // Add initial tracking update if not present
  if (!this.trackingUpdates || this.trackingUpdates.length === 0) {
    this.trackingUpdates = [{
      status: 'placed',
      message: 'Order placed successfully',
      timestamp: new Date()
    }];
  }
  
  next();
});

module.exports = mongoose.model("Order", orderSchema);
