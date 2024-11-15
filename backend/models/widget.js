const mongoose = require("mongoose");

const widgetSchema = mongoose.Schema({
  name: String,
  description: String,
  category: String, 
  status: String,
  createdAt: Date,
  updatedAt: Date,
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Widget = mongoose.model("widgets", widgetSchema);

module.exports = Widget;
