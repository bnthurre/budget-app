const express = require('express');
const router = express.Router();
const { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { body } = require('express-validator');

// POST request to create a new account
router.post('/create-category', createCategory);

// GET request to retrieve all accounts
router.get('/get-categories', getAllCategories);

// GET request to retrieve a specific account by ID
router.get('/get-category-by-id/:id', getCategoryById);

// PUT request to update an account by ID
router.put('/update-category/:id', [

], updateCategory);

// DELETE request to delete an account by ID
router.delete('/delete-category/:id', deleteCategory);

module.exports = router;
