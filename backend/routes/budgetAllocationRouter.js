const express = require('express');
const router = express.Router();
const budgetAllocationController = require('../controllers/budgetAllocationController');

//create
router.post('/create-budget-allocation', budgetAllocationController.createBudgetAllocation);

//get All
router.post('/get-budget-allocation', budgetAllocationController.getAllBudgetAllocations)

//get by id
router.get('/get-budgetallocationById/:id', budgetAllocationController.getBudgetAllocationById);

//update
router.put('/update-budget-allocation/:id', budgetAllocationController.updateBudgetAllocation)

//delete by id
router.delete('/delete-budget-allocation/:id', budgetAllocationController.deleteBudgetAllocation)

//delete many
router.post('/delete-budget-allocations', budgetAllocationController.deleteAllocations)

module.exports = router;