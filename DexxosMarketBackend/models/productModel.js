const pool = require('../config');

const getProducts = async () => {
    const result = await pool.query('SELECT * FROM products');
    return result.rows;
};

const getProductById = async (id) => {
    const result = await pool.query('SELECT * FROM products WHERE product_id = $1', [id]);
    return result.rows[0];
};

const createProduct = async (product) => {
    const { name, price, code } = product;
    const result = await pool.query(
        'INSERT INTO products (name, price, code) VALUES ($1, $2, $3) RETURNING *',
        [name, price, code]
    );
    return result.rows[0];
};

const updateProduct = async (id, product) => {
    const { name, price, code } = product;
    const result = await pool.query(
        'UPDATE products SET name = $1, price = $2, code = $3 WHERE product_id = $4 RETURNING *',
        [name, price, code, id]
    );
    return result.rows[0];
};

const deleteProduct = async (id) => {
    await pool.query('DELETE FROM products WHERE product_id = $1', [id]);
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
