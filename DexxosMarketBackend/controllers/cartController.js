const {
    getProductByUserId,
    createCartItem,
    updateCartItem,
    deleteCartItem
} = require('../models/cartModel');

// Fetch all cart items by user_id
const fetchCartItemsByUserId = async (req, res) => {
    try {
        const user_id = req.params.user_id; // Get user_id from route parameters
        const cartItems = await getProductByUserId(user_id); // Pass user_id to the model function
        res.json(cartItems);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Add a new cart item
const addCartItem = async (req, res) => {
    try {
        const newCartItem = await createCartItem(req.body); // Create a new cart item with request body data
        res.status(201).json(newCartItem);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Update a cart item
const modifyCartItem = async (req, res) => {
    try {
        const updatedCartItem = await updateCartItem(req.body); // Update cart item with request body data
        res.json(updatedCartItem);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Delete a cart item
const removeCartItem = async (req, res) => {
    try {
        const { user_id, product_id } = req.params; // Get user_id and product_id from route parameters
        const deletedCartItem = await deleteCartItem(user_id, product_id); // Delete cart item with the provided IDs
        res.json(deletedCartItem);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    fetchCartItemsByUserId,
    addCartItem,
    modifyCartItem,
    removeCartItem
};
