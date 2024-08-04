const pool = require('../config');
const { get } = require('../routes/cartRoutes');

const getProducts = async () => { // Get all products
    const result = await pool.query('SELECT * FROM products');
    return result.rows;
};

const getProductById = async (id) => { // Get product by id
    const result = await pool.query('SELECT * FROM products WHERE product_id = $1', [id]);
    return result.rows[0];
};

module.exports = {
    getProducts,
    getProductById,
};
