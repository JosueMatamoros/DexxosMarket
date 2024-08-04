const express = require('express');
const cors = require('cors');
//const multer = require('multer'); // API that saves files in a specific folder
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const productsRoutes = require('./routes/productsRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const orderDetailsRoutes = require('./routes/orderDetailsRoutes');
const cartRoutes = require('./routes/cartRoutes');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);
app.use('/orderDetails', orderDetailsRoutes);
app.use('/cart', cartRoutes);

// Configurar Express para servir archivos estáticos desde la carpeta de assets
const productsAssetsPath = path.join('../DexxosMarketFrontend/assets/products'); // Cambia esto a la ruta de tu carpeta assets
app.use('/productsImages', express.static(productsAssetsPath));

const profileAssetsPath = path.join('../DexxosMarketFrontend/assets/profilesImages'); // Cambia esto a la ruta de tu carpeta assets
app.use('/profileImages', express.static(profileAssetsPath));



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
