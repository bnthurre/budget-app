const BudgetAllocation = require('../models/budgetAllocation');

// Create a new budget allocation
exports.createBudgetAllocation = async (req, res) => {
    try {
        const budgetAllocation = await BudgetAllocation.create(req.body);
        res.status(201).json(budgetAllocation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Retrieve all budget allocations
exports.getAllBudgetAllocations = async (req, res) => {
    try {
        const budgetAllocations = await BudgetAllocation.find();
        res.status(200).json(budgetAllocations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve a single budget allocation by ID
exports.getBudgetAllocationById = async (req, res) => {
    try {
        const budgetAllocation = await BudgetAllocation.findById(req.params.id);
        if (!budgetAllocation) {
            return res.status(404).json({ message: 'Budget allocation not found' });
        }
        res.status(200).json(budgetAllocation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a budget allocation by ID
exports.updateBudgetAllocation = async (req, res) => {
    try {
        const budgetAllocation = await BudgetAllocation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!budgetAllocation) {
            return res.status(404).json({ message: 'Budget allocation not found' });
        }
        res.status(200).json(budgetAllocation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a budget allocation by ID
exports.deleteBudgetAllocation = async (req, res) => {
    try {
        const budgetAllocation = await BudgetAllocation.findByIdAndDelete(req.params.id);
        if (!budgetAllocation) {
            return res.status(404).json({ message: 'Budget allocation not found' });
        }
        res.status(200).json({ message: 'Budget allocation deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
