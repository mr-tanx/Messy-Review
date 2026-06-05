const express = require("express");
const router = express.Router();
const Menu = require("../models/Menu");

// ✅ Create / Update Menu API
router.post("/", async (req, res) => {
  try {
    const menu = await Menu.findOneAndUpdate(
      { date: req.body.date },   // match today's date
      req.body,
      { new: true, upsert: true } // update if exists, else create
    );

    res.status(201).json({
      message: "Menu created successfully",
      data: menu
    });

  } catch (err) {
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