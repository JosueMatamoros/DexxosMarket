const pool = require('../config');


const fetchUserById = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const addUser = async (req, res) => {
    try {
        const { user_id, email, name } = req.body;

        // Verifica si el usuario ya está registrado
        const userExists = await pool.query('SELECT * FROM users WHERE user_id = $1', [user_id]);

        if (userExists.rows.length > 0) {
            // Si el usuario ya existe, devuelve una respuesta sin volver a registrarlo
            return res.status(200).json({ message: 'User already registered', user: userExists.rows[0] });
        }

        // Si el usuario no existe, lo registra
        const result = await pool.query(
            'INSERT INTO users (user_id, email, name) VALUES ($1, $2, $3) RETURNING *',
            [user_id, email, name]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    fetchUserById,
    addUser
};
