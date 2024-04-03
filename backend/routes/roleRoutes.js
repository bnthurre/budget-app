const express = require('express');
const router = express.Router();
const { createRole, getAllroles, deleteRole } = require('../controllers/roleController');
const { body } = require('express-validator');

// POST request to create a new role
router.post('/create-role', createRole);

// GET request to retrieve all roles
router.get('/get-roles', getAllroles);

// DELETE request to delete an role by ID
router.delete('/delete-role/:id', deleteRole);

module.exports = router;
