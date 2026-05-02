const mongoose = require("mongoose");
const Product = require("./models/Product");

const sampleProducts = [
  {
    name: "Wireless Bluetooth Headphones",
    description: "High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals.",
    price: 199,
    originalPrice: 249,
    discount: 20,
    category: "Electronics",
    brand: "AudioTech",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500",
      "https://images.unsplash.com/photo-1524678714210-9917a6c619c2?w=500"
    ],
    stock: 50,
    rating: 4.5,
    features: ["Noise Cancellation", "40hr Battery", "Quick Charge", "Bluetooth 5.0"],
    specifications: {
      "Battery Life": "40 hours",
      "Charging Time": "2 hours",
      "Bluetooth Version": "5.0",
      "Weight": "250g"
    }
  },
  {
    name: "Smart Fitness Watch",
    description: "Advanced fitness tracker with heart rate monitoring, GPS, and multiple sports modes. Track your health and fitness goals.",
    price: 299,
    originalPrice: 349,
    discount: 15,
    category: "Wearables",
    brand: "FitTech",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
      "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=500",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500",
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500"
    ],
    stock: 30,
    rating: 4.7,
    features: ["Heart Rate Monitor", "GPS Tracking", "Water Resistant", "Sleep Tracking"],
    specifications: {
      "Display": "1.4 inch AMOLED",
      "Battery Life": "7 days",
      "Water Resistance": "50m",
      "Sensors": "Heart Rate, GPS, Accelerometer"
    }
  },
  {
    name: "Professional Camera Lens",
    description: "85mm f/1.4 portrait lens with exceptional image quality and beautiful bokeh. Perfect for portrait and wedding photography.",
    price: 499,
    originalPrice: 599,
    discount: 18,
    category: "Photography",
    brand: "LensMaster",
    images: [
      "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500",
      "https://images.unsplash.com/photo-1552168324-d612d77725e3?w=500",
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=500"
    ],
    stock: 15,
    rating: 4.8,
    features: ["f/1.4 Aperture", "Weather Sealed", "Autofocus", "Image Stabilization"],
    specifications: {
      "Focal Length": "85mm",
      "Maximum Aperture": "f/1.4",
      "Minimum Aperture": "f/16",
      "Filter Size": "77mm"
    }
  },
  {
    name: "Ergonomic Office Chair",
    description: "Premium ergonomic office chair with lumbar support, adjustable height, and breathable mesh material. Designed for all-day comfort.",
    price: 399,
    originalPrice: 499,
    discount: 22,
    category: "Furniture",
    brand: "ComfortSeat",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500",
      "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=500",
      "https://images.unsplash.com/photo-1551298370-33d8d3ad26c8?w=500",
      "https://images.unsplash.com/photo-1567515004624-219c11d31f2e?w=500"
    ],
    stock: 25,
    rating: 4.3,
    features: ["Lumbar Support", "Adjustable Height", "Breathable Mesh", "360° Swivel"],
    specifications: {
      "Material": "Mesh & Metal",
      "Weight Capacity": "300 lbs",
      "Adjustable Height": "16-20 inches",
      "Warranty": "5 years"
    }
  },
  {
    name: "Wireless Gaming Mouse",
    description: "High-precision wireless gaming mouse with customizable RGB lighting, programmable buttons, and ultra-fast response time.",
    price: 99,
    originalPrice: 129,
    discount: 20,
    category: "Gaming",
    brand: "GamePro",
    images: [
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500",
      "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
      "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=500"
    ],
    stock: 40,
    rating: 4.6,
    features: ["Wireless", "RGB Lighting", "Programmable Buttons", "1000Hz Polling"],
    specifications: {
      "DPI": "Up to 16000",
      "Battery Life": "70 hours",
      "Connectivity": "2.4GHz Wireless",
      "Buttons": "6 programmable"
    }
  },
  {
    name: "Smart Home Security Camera",
    description: "4K wireless security camera with night vision, motion detection, and cloud storage. Keep your home safe with AI-powered alerts.",
    price: 149,
    originalPrice: 199,
    discount: 19,
    category: "Smart Home",
    brand: "SecureView",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500",
      "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=500",
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=500"
    ],
    stock: 35,
    rating: 4.4,
    features: ["4K Resolution", "Night Vision", "Motion Detection", "Cloud Storage"],
    specifications: {
      "Resolution": "4K UHD",
      "Field of View": "130°",
      "Night Vision": "Up to 30ft",
      "Storage": "Cloud + Local"
    }
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/online-shopping");
    console.log("Connected to MongoDB");

    // Clear existing products
    await Product.deleteMany({});
    console.log("Cleared existing products");

    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`Seeded ${products.length} products`);

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedProducts();