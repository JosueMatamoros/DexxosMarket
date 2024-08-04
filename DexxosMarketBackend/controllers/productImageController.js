const {
    getImageByProductId,
    addProductImage
} = require('../models/productImages.js');

const fetchImageByProductId = async (req, res) => {
    try {
        const productId = req.params.id;
        const image = await getImageByProductId(productId);

        if (image) {
            res.json({ imageUrl: image.image_url });
        } else {
            res.status(404).json({ error: 'Imagen no encontrada' });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const addImageByProductId = async (req, res) => {
    const productId = req.params.id;
    const { imageUrl } = req.body;

    try {
        const newImage = await addProductImage(productId, imageUrl);
        res.status(201).json(newImage);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al agregar la imagen' });
    }
};

module.exports = {
    getImageByProductId,
    addProductImage
};
