const express = require('express');
const router = express.Router();
const { createAccount, getAccounts, getAccountById, updateAccount, deleteAccount,deleteAccounts } = require('../controllers/accountController');
const { body } = require('express-validator');

// POST request to create a new account
router.post('/create-accounts', createAccount);

// GET request to retrieve all accounts
router.get('/get-accounts', getAccounts);

// GET request to retrieve a specific account by ID
router.get('/get-account/:id', getAccountById);

// PUT request to update an account by ID
router.put('/update-ccounts/:id', [
  // Add validation middleware here if needed
], updateAccount);

// DELETE request to delete an account by ID
router.delete('/delete-account/:id', deleteAccount);

// DELETE request to delete all accounts selected
router.post('/delete-accounts', deleteAccounts);

module.exports = router;
