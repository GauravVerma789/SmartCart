const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/Product");

const products = [
  {
    id: 1,
    name: "Gaming Laptop",
    category: "Electronics",
    price: 65000,
    description: "gaming laptop 16GB RAM NVIDIA graphics powerful processor",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302",
  },

  {
    id: 2,
    name: "Mechanical Keyboard",
    category: "Electronics",
    price: 2500,
    description: "mechanical gaming keyboard RGB backlit keys",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
  },

  {
    id: 3,
    name: "Gaming Mouse",
    category: "Electronics",
    price: 1800,
    description: "wireless gaming mouse RGB high precision sensor",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db",
  },

  {
    id: 4,
    name: "Gaming Headphones",
    category: "Electronics",
    price: 3500,
    description: "gaming headphones surround sound microphone RGB",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  },

  {
    id: 5,
    name: "USB C Hub",
    category: "Electronics",
    price: 1200,
    description: "USB C hub HDMI USB ports laptop connectivity",
    image: "https://images.unsplash.com/photo-1625842268584-8f3296236761",
  },

  {
    id: 6,
    name: "Office Laptop",
    category: "Electronics",
    price: 55000,
    description: "office laptop lightweight 16GB RAM fast processor",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
  },

  {
    id: 7,
    name: "Wireless Earbuds",
    category: "Audio",
    price: 2200,
    description: "wireless earbuds bluetooth noise cancellation",
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1",
  },

  {
    id: 8,
    name: "Smart Watch",
    category: "Wearables",
    price: 4500,
    description: "smart watch fitness tracking heart rate bluetooth",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  },

  {
    id: 9,
    name: "Running Shoes",
    category: "Fashion",
    price: 3000,
    description: "running shoes lightweight comfortable sports training",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },

  {
    id: 10,
    name: "Gaming Chair",
    category: "Furniture",
    price: 12000,
    description: "ergonomic gaming chair comfortable adjustable backrest",
    image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6",
  },

  {
    id: 11,
    name: "Webcam",
    category: "Electronics",
    price: 2800,
    description: "HD webcam video calls streaming microphone",
    image: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da",
  },

  {
    id: 12,
    name: "Portable SSD",
    category: "Electronics",
    price: 7000,
    description: "portable SSD fast storage USB C high speed",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b",
  },
];
async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("Products inserted successfully");

    await mongoose.connection.close();
  } catch (error) {
    console.error(error);
  }
}

seedDatabase();
