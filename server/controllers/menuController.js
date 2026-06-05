const Menu = require("../models/Menu");

// ✅ Create Menu
exports.createMenu = async (req, res) => {
  try {
    const menu = await Menu.create(req.body);

    res.status(201).json({
      message: "Menu created successfully",
      data: menu
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get Today's Menu
exports.getTodayMenu = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const menu = await Menu.findOne({ date: today });

    if (!menu) {
      return res.status(404).json({
        message: "No menu found for today"
      });
    }

    res.json(menu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};