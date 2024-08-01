const {
    getCartItems,
    getCartItemById,
    createCartItem,
    updateCartItem,
    deleteCartItem
} = require('../models/cartModel');

const fetchCartItems = async (req, res) => {
    try {
        const cartItems = await getCartItems();
        res.json(cartItems);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const fetchCartItemById = async (req, res) => {
    try {
        const cartItem = await getCartItemById(req.params.cart_item_id);
        res.json(cartItem);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const addCartItem = async (req, res) => {
    try {
        const newCartItem = await createCartItem(req.body);
        res.status(201).json(newCartItem);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const modifyCartItem = async (req, res) => {
    try {
        const updatedCartItem = await updateCartItem(req.params.cart_item_id, req.body);
        res.json(updatedCartItem);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const removeCartItem = async (req, res) => {
    try {
        await deleteCartItem(req.params.cart_item_id);
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    fetchCartItems,
    fetchCartItemById,
    addCartItem,
    modifyCartItem,
    removeCartItem
};
