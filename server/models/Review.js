const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userId: String,
    date: String,
    mealType: String,
    rating: Number,
    tags: [String],
    reviewText: String


});
// 🔥 Prevent duplicate review per meal per day
reviewSchema.index({ userId: 1, date: 1, mealType: 1 }, { unique: true ,timestamps: true });

module.exports = mongoose.model("Review", reviewSchema);