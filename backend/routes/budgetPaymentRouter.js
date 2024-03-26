const express = require('express');
const router = express.Router();
const budgetPaymentController = require('../controllers/budgetPaymentController');

//create
router.post('/create-budget-payment', budgetPaymentController.createBudgetPayment);

//get All
router.get('/get-budget-payment', budgetPaymentController.getBudgetPayments)

//get by id
router.get('/get-budgetPaymentById', budgetPaymentController.getBudgetPaymentsById);

//update
router.put('/update-budget-payment', budgetPaymentController.updateBudgetPayment)

//delete by id
router.delete('/delete-budget-payment', budgetPaymentController.deleteBudgetPayment)

module.exports = router;