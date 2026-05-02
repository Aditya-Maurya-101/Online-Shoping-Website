const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true },
    originalPrice: { type: Number }, // For discount calculation
    discount: { type: Number, default: 0 }, // Discount percentage
    imageUrl: { type: String, default: "" },
    images: [{ type: String }], // Array of image URLs for multiple angles
    category: { type: String, default: "" },
    brand: { type: String, default: "" },
    stock: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    features: [{ type: String }], // Product features
    specifications: { type: Map, of: String }, // Key-value specifications
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

// Virtual for discount price
productSchema.virtual('discountPrice').get(function() {
  if (this.discount > 0) {
    return this.price * (1 - this.discount / 100);
  }
  return this.price;
});

// Virtual for discount amount
productSchema.virtual('discountAmount').get(function() {
  if (this.discount > 0) {
    return this.price * (this.discount / 100);
  }
  return 0;
});

// Ensure virtual fields are serialized
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model("Product", productSchema);

