const express = require('express');
const router = express.Router();
const budgetAllocationController = require('../controllers/budgetAllocationController');

//create
router.post('/create-budget-allocation', budgetAllocationController.createBudgetAllocation);

//get All
router.get('/get-budget-allocation', budgetAllocationController.getAllBudgetAllocations)

//get by id
router.get('/get-budgetallocationById', budgetAllocationController.getBudgetAllocationById);

//update
router.put('/update-budget-allocation', budgetAllocationController.updateBudgetAllocation)

//delete by id
router.delete('/delete-budget-allocation', budgetAllocationController.deleteBudgetAllocation)

module.exports = router;