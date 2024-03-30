const mongoose = require('mongoose');

const budgetPaymentSchema = new mongoose.Schema({
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    account_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
    paid_amount: { type: Number, required: true },
    year: { type: Number, required: true },
    payment_date: { type: Date, default: Date.now }, // Can be user input or set in frontend
    description: { type: String },
});

module.exports = mongoose.model('BudgetPayment', budgetPaymentSchema);
