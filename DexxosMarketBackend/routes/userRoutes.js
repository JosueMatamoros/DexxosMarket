const express = require('express');
const {
    fetchUsers,
    fetchUserById,
    addUser,
    modifyUser,
    removeUser
} = require('../controllers/userController');

const router = express.Router();

router.get('/', fetchUsers);
router.get('/:id', fetchUserById);
router.post('/', addUser);
router.put('/:id', modifyUser);
router.delete('/:id', removeUser);

module.exports = router;
