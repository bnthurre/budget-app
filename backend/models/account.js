const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  account_name: { type: String,  },
  account_number: { type: Number,  unique: true },
  account_type: { type: String, }, // Enum (e.g., 'Checking', 'Savings', 'Credit Card')
  description: { type: String },
});

module.exports = mongoose.model("Account", accountSchema);
