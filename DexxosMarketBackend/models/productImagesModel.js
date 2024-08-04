const pool = require('../config');

const getImageByProductId = async (productId) => {
    const result = await pool.query(
        'SELECT image_url FROM product_images WHERE product_id = $1',
        [productId]
    );
    return result.rows[0];
};

const addProductImage = async (productId, imageUrl) => {
    const result = await pool.query(
        'INSERT INTO product_images (product_id, image_url) VALUES ($1, $2) RETURNING *',
        [productId, imageUrl]
    );
    return result.rows[0];
};

module.exports = {
    getImageByProductId,
    addProductImage
};
