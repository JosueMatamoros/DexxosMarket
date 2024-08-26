const pool = require('../config');

const fetchCartByUserId = async (req, res) => {
    try {
        console(req.params.id)
        const query = `
            SELECT 
                cart.product_id, 
                cart.quantity, 
                products.name, 
                products.price,
                products.image
            FROM 
                cart
            INNER JOIN 
                products 
            ON 
                cart.product_id = products.product_id
            WHERE 
                cart.user_id = $1
        `;
        const result = await pool.query(query, [req.params.id]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


const addCartItem = async (req, res) => {
    const { user_id, product_id, quantity } = req.body;

    try {
        // Verificar si el producto ya está en el carrito
        const existingItem = await pool.query(
            'SELECT * FROM cart WHERE user_id = $1 AND product_id = $2',
            [user_id, product_id]
        );

        if (existingItem.rows.length > 0) {
            // Si el producto ya está en el carrito, actualizar la cantidad
            const newQuantity = existingItem.rows[0].quantity + quantity;
            await pool.query(
                'UPDATE cart SET quantity = $1 WHERE user_id = $2 AND product_id = $3',
                [newQuantity, user_id, product_id]
            );
        } else {
            // Si el producto no está en el carrito, agregarlo
            await pool.query(
                'INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3)',
                [user_id, product_id, quantity]
            );
        }

        res.status(200).json({ message: 'Product added to cart successfully' });
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ message: 'Error adding product to cart' });
    }
};


const modifyCartItem = async (req, res) => {
    try {
        const { cart_item_id, quantity } = req.body;
        const result = await pool.query(
            'UPDATE cart SET quantity = $1 WHERE cart_item_id = $2 RETURNING *',
            [quantity, cart_item_id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const removeCartItem = async (req, res) => {
    try {
        await pool.query('DELETE FROM cart WHERE cart_item_id = $1', [req.params.id]);
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    fetchCartByUserId,
    addCartItem,
    modifyCartItem,
    removeCartItem
};
