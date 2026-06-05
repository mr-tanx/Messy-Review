const express = require("express");
const router = express.Router();

const Review = require("../models/Review"); 

const {
  addReview,
  getTodayReviews,
  getAnalytics
} = require("../controllers/reviewController");

router.post("/", addReview);
router.get("/today", getTodayReviews);
router.get("/analytics", getAnalytics);

// ✅ DELETE ROUTE
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    console.log("DELETE ID:", id);

    if (!id) {
      return res.status(400).json({ message: "ID missing" });
    }

    const deletedReview = await Review.findByIdAndDelete(id);

    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json({ message: "Review deleted successfully" });

  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;