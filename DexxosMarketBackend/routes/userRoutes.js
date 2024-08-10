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


module.exports = router;
