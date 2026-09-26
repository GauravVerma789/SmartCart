const express = require("express");
const axios = require("axios");

const Product = require("../models/Product");

const router = express.Router();


// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch products",
    });
  }
});


// Get AI recommendations
router.get("/:id/recommendations", async (req, res) => {
  try {
    const productId = Number(req.params.id);

    // Python ML service
    const response = await axios.get(
      `http://127.0.0.1:8000/recommend/${productId}`
    );

    const recommendations = response.data.recommendations;

    // IDs nikaalo
    const recommendedIds = recommendations.map(
      (product) => product.id
    );

    // MongoDB se complete product details lao
    const products = await Product.find({
      id: { $in: recommendedIds },
    });

    // ML ke order ko preserve karo
    const finalRecommendations = recommendations.map(
      (recommendation) => {
        const product = products.find(
          (p) => p.id === recommendation.id
        );

        return {
          id: recommendation.id,
          name: recommendation.name,
          category: recommendation.category,
          price: recommendation.price,
          similarity: recommendation.similarity,
          image: product?.image || "",
        };
      }
    );

    res.json({
      product_id: productId,
      recommendations: finalRecommendations,
    });

  } catch (error) {
    console.error(
      "Recommendation error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      message: "Failed to get recommendations",
    });
  }
});


module.exports = router;