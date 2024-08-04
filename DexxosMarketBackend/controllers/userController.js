const pool = require('../config');


const fetchUserById = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [req.params.id]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const addUser = async (req, res) => {
    try {
        const { first_name, last_name1, last_name2, gender, email, password, role } = req.body;
        const result = await pool.query(
            'INSERT INTO users (first_name, last_name1, last_name2, gender, email, password, role) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [first_name, last_name1, last_name2, gender, email, password, role]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const modifyUser = async (req, res) => {
    try {
        const { first_name, last_name1, last_name2, gender, email, password, role } = req.body;
        const result = await pool.query(
            'UPDATE users SET first_name = $1, last_name1 = $2, last_name2 = $3, gender = $4, email = $5, password = $6, role = $7 WHERE user_id = $8 RETURNING *',
            [first_name, last_name1, last_name2, gender, email, password, role, req.params.id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const removeUser = async (req, res) => {
    try {
        await pool.query('DELETE FROM users WHERE user_id = $1', [req.params.id]);
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    fetchUserById,
    addUser,
    modifyUser,
    removeUser
};
