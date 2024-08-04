const {
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../models/userModel');

const fetchUserById = async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const addUser = async (req, res) => {
    try {
        const newUser = await createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const modifyUser = async (req, res) => {
    try {
        const updatedUser = await updateUser(req.params.id, req.body);
        res.json(updatedUser);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const removeUser = async (req, res) => {
    try {
        await deleteUser(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    fetchUserById,
    addUser,
    modifyUser,
    removeUser
};
