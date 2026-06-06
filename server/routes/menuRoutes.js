const express = require("express");
const router = express.Router();
const Menu = require("../models/Menu");

// ✅ Create / Update Menu API
router.post("/", async (req, res) => {
  try {
    const { date, meals } = req.body;

    if (!date || !meals) {
      return res.status(400).json({
        error: "Missing required fields"
      });
    }

    const menu = await Menu.findOneAndUpdate(
      { date: date },   // ensure exact match
      { date, meals },
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: "Menu saved successfully",
      data: menu
    });

  } catch (err) {
    console.error("MENU ERROR:", err.message);
    res.status(500).json({
      error: err.message
    });
  }
});

// ✅ Get today's menu (FIXED)
router.get("/today", async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    // ❌ OLD (WRONG)
    // const menu = await Menu.findOne({ date: today }).sort({ createdAt: -1 });

    // ✅ FIXED
    const menu = await Menu.findOne({ date: today });

    if (!menu) {
      return res.status(404).json({
        message: "No menu found for today"
      });
    }

    res.json(menu);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

module.exports = router;