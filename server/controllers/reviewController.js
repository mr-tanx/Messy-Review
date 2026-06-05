const Review = require("../models/Review");

// ✅ Add Review
const asyncHandler = require("../utils/asyncHandler");

exports.addReview = asyncHandler(async (req, res) => {
  const { userId, mealType, rating, tags, reviewText } = req.body;

  const date = new Date().toISOString().split("T")[0];

  const review = await Review.create({
    userId,
    date,
    mealType,
    rating,
    tags,
    reviewText
  });

  res.status(201).json({
    message: "Review added successfully",
    data: review
  });
});

// ✅ Get Today's Reviews
exports.getTodayReviews = asyncHandler(async (req, res) => {
  const today = new Date().toISOString().split("T")[0];

  const reviews = await Review.find({ date: today });

  res.json({
    total: reviews.length,
    data: reviews
  });
});

// ✅ Analytics
exports.getAnalytics = asyncHandler(async (req, res) => {
  const range = req.query.range || "daily";

  let reviews = [];

  const today = new Date();

  if (range === "daily") {
    const date = today.toISOString().split("T")[0];
    reviews = await Review.find({ date });
  }

  if (range === "weekly") {
    const pastDate = new Date();
    pastDate.setDate(today.getDate() - 7);

    reviews = await Review.find({
      createdAt: { $gte: pastDate }
    });
  }

  if (range === "monthly") {
    const pastDate = new Date();
    pastDate.setMonth(today.getMonth() - 1);

    reviews = await Review.find({
      createdAt: { $gte: pastDate }
    });
  }

  if (reviews.length === 0) {
    return res.json({
      totalReviews: 0,
      avgRating: 0,
      mealStats: {},
      tagStats: {}
    });
  }

  const avgRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  const mealStats = {};
  const tagStats = {};

  reviews.forEach((r) => {
    if (!mealStats[r.mealType]) {
      mealStats[r.mealType] = { total: 0, count: 0 };
    }

    mealStats[r.mealType].total += r.rating;
    mealStats[r.mealType].count += 1;

    r.tags.forEach((tag) => {
      tagStats[tag] = (tagStats[tag] || 0) + 1;
    });
  });

  Object.keys(mealStats).forEach((meal) => {
    mealStats[meal].avg =
      mealStats[meal].total / mealStats[meal].count;
  });

  res.json({
    totalReviews: reviews.length,
    avgRating: avgRating.toFixed(2),
    mealStats,
    tagStats,
  });
});