const BudgetAllocation = require('../models/budgetAllocation');
const Account = require('../models/account'); 
const Category = require('../models/category'); 

exports.createBudgetAllocation = async (req, res) => {
  
// create new category
  const { category_id, account_id, budget_amount, year, description } = req.body;

  
  try {
    const category = await Category.findById(category_id);
    const account = await Account.findById(account_id);
    if (!category || !account) {
      return res.status(400).json({ message: 'Invalid category or account ID' });
    }

    const newAllocation = new BudgetAllocation({
      category_id,
      account_id,
      budget_amount,
      year,
      description,
    });
    const savedAllocation = await newAllocation.save();
    res.status(201).json(savedAllocation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// get categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get category by id
exports.getCategoryById = async (req, res) => {
  const id = req.params.id;

  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//edit
exports.updateCategory = async (req, res) => {
  const id = req.params.id;

  
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, { new: true }); // Returns updated document
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//delete category
exports.deleteCategory = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
