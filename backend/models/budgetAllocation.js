const mongoose = require('mongoose');

const budgetAllocationSchema = new mongoose.Schema({
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    account_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
    budget_amount: { type: Number, required: true },
    year: { type: Number, required: true },
    budget_date: { type: Date, default: Date.now }, // Consider user input or automatic setting in frontend
    description: { type: String },
});

module.exports = mongoose.model('BudgetAllocation', budgetAllocationSchema);
