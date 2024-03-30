const express = require('express');
const router = express.Router();
const budgetPaymentController = require('../controllers/budgetPaymentController');

//create
router.post('/create-budget-payment', budgetPaymentController.createBudgetPayment);

//get All
router.post('/get-budget-payment', budgetPaymentController.getBudgetPayments)

//get by id
router.get('/get-budgetPaymentById/:id', budgetPaymentController.getBudgetPaymentsById);

//update
router.put('/update-budget-payment/:id', budgetPaymentController.updateBudgetPayment)

//delete by id
router.delete('/delete-budget-payment/:id', budgetPaymentController.deleteBudgetPayment)

module.exports = router;