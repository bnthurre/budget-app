const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  account_name: { type: String, required: true},
  account_number: { type: Number,  unique: true ,required: true},
  account_type: { type: String, required: true}, // Enum (e.g., 'Checking', 'Savings', 'Credit Card')
  description: { type: String },
});

module.exports = mongoose.model("Account", accountSchema);
