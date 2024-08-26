const pool = require('../config');
const { v4: uuidv4 } = require('uuid'); // Importar la librería uuid

const fetchOrderById = async (req, res) => {
    try {
        const { user_id } = req.params;

        // Consulta para obtener todas las órdenes del usuario junto con los detalles del producto
        const ordersResult = await pool.query(
            `
            SELECT o.order_id, o.total_price, o.shipping_price, p.product_id, p.name, p.price, od.quantity, p.image
            FROM orders o
            JOIN order_details od ON o.order_id = od.order_id
            JOIN products p ON od.product_id = p.product_id
            WHERE o.user_id = $1
            ORDER BY o.order_id;
            `,
            [user_id]
        );

        if (ordersResult.rows.length === 0) {
            return res.status(404).json({ message: "No orders found for this user." });
        }

        // Organizar los resultados por orden
        const orders = {};
        ordersResult.rows.forEach(row => {
            const orderId = row.order_id;
            if (!orders[orderId]) {
                orders[orderId] = {
                    order_id: orderId,
                    total_price: row.total_price,
                    shipping_price: row.shipping_price,
                    products: []
                };
            }
            orders[orderId].products.push({
                product_id: row.product_id,
                name: row.name,
                price: row.price,
                quantity: row.quantity,
                image: row.image
            });
        });

        // Convertir el objeto en un array
        const ordersArray = Object.values(orders);

        res.status(200).json(ordersArray);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const addOrder = async (req, res) => {
    const client = await pool.connect();
    try {
        const { user_id } = req.body;

        // Generar el barcode utilizando uuid
        const barcode = uuidv4(); // Esto generará un SKU único y aleatorio
        console.log('Barcode:', barcode);

        // Obtener todos los artículos del carrito
        const cartItemsResult = await client.query(
            'SELECT product_id, quantity FROM cart WHERE user_id = $1',
            [user_id]
        );
        const cartItems = cartItemsResult.rows;

        // Calcular el precio total
        let total_price = 0;
        for (let item of cartItems) {
            const productResult = await client.query(
                'SELECT price FROM products WHERE product_id = $1',
                [item.product_id]
            );
            total_price += productResult.rows[0].price * item.quantity;
        }

        // Define el shipping price (puede ser una constante o basada en alguna lógica)
        const shipping_price = 5.00; // Ejemplo de un valor fijo

        // Iniciar transacción
        await client.query('BEGIN');

        // Crear la orden con el barcode generado
        const orderResult = await client.query(
            'INSERT INTO orders (user_id, barcode, total_price, shipping_price) VALUES ($1, $2, $3, $4) RETURNING *',
            [user_id, barcode, total_price, shipping_price]
        );
        const order = orderResult.rows[0];

        // Agregar productos al detalle de la orden
        for (let item of cartItems) {
            await client.query(
                'INSERT INTO order_details (product_id, order_id, quantity) VALUES ($1, $2, $3)',
                [item.product_id, order.order_id, item.quantity]
            );
        }

        // Vaciar el carrito del usuario después de crear la orden
        await client.query('DELETE FROM cart WHERE user_id = $1', [user_id]);

        // Confirmar la transacción
        await client.query('COMMIT');

        res.status(201).json(order);
    } catch (error) {
        // Revertir la transacción en caso de error
        await client.query('ROLLBACK');
        res.status(500).send(error.message);
    } finally {
        client.release();
    }
};

const removeOrder = async (req, res) => {
    try {
        await pool.query('DELETE FROM orders WHERE order_id = $1', [req.params.id]);
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
};


const modifyOrder = async (req, res) => {
    try {
        const { user_id, barcode, total_price, shipping_price } = req.body;
        const result = await pool.query(
            'UPDATE orders SET user_id = $1, barcode = $2, total_price = $3, shipping_price = $4 WHERE order_id = $5 RETURNING *',
            [user_id, barcode, total_price, shipping_price, req.params.id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const fetchOrderByBarcode = async (req, res) => {
    try {
        const barcode = req.params.barcode; // Obtener código de barras de los parámetros de la ruta
        const result = await pool.query('SELECT * FROM orders WHERE barcode = $1', [barcode]);
        const order = result.rows[0];
        if (order) {
            res.json(order);
        } else {
            res.status(404).send('Order not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};


module.exports = {
    fetchOrderById,
    addOrder,
    removeOrder,
    modifyOrder,
    fetchOrderByBarcode
};
