const pool = require('../config');

// Fetch all products
const fetchProducts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        res.json(result.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getImageByProductId = async (req, res) => {
    try {
        const productId = req.params.id; // Obtener el ID del producto de los parámetros de la ruta
        const result = await pool.query('SELECT image FROM products WHERE product_id = $1', [productId]);
        const product = result.rows[0];
        if (product) {
            res.json({ image: product.image });
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const updateProductImage = async (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const { imageUrl } = req.body;
    try {
        const result = await pool.query(
            'UPDATE products SET image = $1 WHERE product_id = $2 RETURNING *',
            [imageUrl, productId]
        );
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).send('Product not found');
        }
    } catch (err) {
        console.error('Error updating product image:', err.message);
        res.status(500).send('Server Error');
    }
};

// ------------------------------

const fetchProductById = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products WHERE product_id = $1', [req.params.id]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const addProduct = async (req, res) => {
    try {
        const { name, price, description, category, image } = req.body;
        const result = await pool.query(
            'INSERT INTO products (name, price, description, category, image) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, price, description, category, image]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const modifyProduct = async (req, res) => {
    try {
        const { name, price, description, category, image } = req.body;
        const result = await pool.query(
            'UPDATE products SET name = $1, price = $2, description = $3, category = $4, image = $5 WHERE product_id = $6 RETURNING *',
            [name, price, description, category, image, req.params.id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const removeProduct = async (req, res) => {
    try {
        await pool.query('DELETE FROM products WHERE product_id = $1', [req.params.id]);
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    fetchProducts,
    getImageByProductId,
    updateProductImage,
    fetchProductById,
    addProduct,
    modifyProduct,
    removeProduct
};
