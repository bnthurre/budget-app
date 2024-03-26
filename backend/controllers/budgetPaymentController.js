const BudgetPayment = require("../models/budgetPayment");

//create a new budget payment
exports.createBudgetPayment = async (req, res) => {
  try {
    const budgetPayment = await BudgetPayment.create(req.body);
    res.status(201).json(budgetPayment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//retrieve all budget payments
exports.getBudgetPayments = async (req, res) => {
  try {
    const budgetPayments = await BudgetPayment.find();
    res.status(200).json(budgetPayments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//retrieve a singleo budget payment by id
exports.getBudgetPaymentsById = async (req, res) => {
  try {
    const budgetPayment = await BudgetPayment.findById(req.params.id);
    if (!budgetPayment) {
      return res.status(404).json({ message: "budget payment not found" });
    }
    res.status(200).json(budgetPayment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update a single budget payment by id
exports.updateBudgetPayment = async (req, res) => {
  try {
    const budgetPayment = await BudgetPayment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!budgetPayment) {
      return res.status(404).json({ message: "budget payment not found" });
    }
    res.status(200).json(budgetPayment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete budget payment by id
exports.deleteBudgetPayment = async (req, res) => {
  try {
    const budgetPayment = await BudgetPayment.findByIdAndDelete(req.params.id);
    if (!budgetPayment) {
      return res.status(404).json({ message: "budget payment not found" });
    }
    res.status(200).json("budget payment deleted succesfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
