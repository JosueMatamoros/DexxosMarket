const express = require('express');
const {
    fetchUserById,
    addUser,
    modifyUser,
    removeUser
} = require('../controllers/userController');

const router = express.Router();

// Get user by id
router.get('/:id', fetchUserById);

// Create new user
router.post('/', addUser);

// Update user
router.put('/:id', modifyUser);

// Delete user
router.delete('/:id', removeUser);

module.exports = router;
