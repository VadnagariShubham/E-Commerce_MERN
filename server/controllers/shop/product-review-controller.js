const Order = require("../../models/Order");
const Product = require("../../models/product");
const ProductReview = require("../../models/Reviews");

const addProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } = req.body;

    // Validate required fields
    if (
      !productId ||
      !userId ||
      !userName ||
      !reviewMessage ||
      reviewValue === undefined || reviewValue === null
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Check if user purchased the product
    const order = await Order.findOne({
      userId,
      "cartItems.productId": productId,
    });

    if (!order) {
      return res.status(403).json({
        success: false,
        message: "You need to purchase the product to review it.",
      });
    }

    // Check if user already submitted a review
    const existingReview = await ProductReview.findOne({ productId, userId });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this product.",
      });
    }

    // Save new review
    const newReview = new ProductReview({
      productId,
      userId,
      userName,
      reviewMessage,
      reviewValue,
    });

    await newReview.save();

    // Recalculate average review and update product
    const reviews = await ProductReview.find({ productId });
    const totalReviews = reviews.length;
    const averageReview = reviews.reduce(
      (sum, review) => sum + review.reviewValue,
      0
    ) / totalReviews;

    await Product.findByIdAndUpdate(productId, { averageReview });

    res.status(201).json({
      success: true,
      data: newReview,
    });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while adding the review.",
    });
  }
};

const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await ProductReview.find({ productId });

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching reviews.",
    });
  }
};

// ✅ Make sure this is included and closed correctly
module.exports = {
  addProductReview,
  getProductReviews,
};