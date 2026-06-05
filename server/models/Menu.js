const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
    unique: true
  },
  meals: {
    breakfast: [String],
    lunch: [String],
    dinner: [String]
  }
});

module.exports = mongoose.model("Menu", menuSchema);