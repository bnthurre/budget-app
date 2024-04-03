const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create a new user
router.post('/create-user', userController.createUser);

// Get all users
router.get('/get-all-users', userController.getAllUsers);

// Get a single user by ID
router.get('/get-userById:id', userController.getUserById);

// Update a user by ID
router.put('/update-user:id', userController.updateUser);

// Delete a user by ID
router.delete('/delete-user:id', userController.deleteUser);

// Delete all usersU
router.post('/delete-many-users', userController.deleteSelectedUsers);

module.exports = router;
