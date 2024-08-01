const express = require('express');
const cors = require('cors');
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

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
