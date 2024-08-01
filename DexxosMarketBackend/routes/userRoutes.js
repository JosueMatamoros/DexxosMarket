const express = require('express');
const {
    fetchUsers,
    fetchUserById,
    addUser,
    modifyUser,
    removeUser
} = require('../controllers/userController');

const router = express.Router();

// Get all users
router.get('/', fetchUsers);

// Get user by id
router.get('/:id', fetchUserById);

// Create new user
router.post('/', addUser);

// Update user
router.put('/:id', modifyUser);

// Delete user
router.delete('/:id', removeUser);

module.exports = router;
