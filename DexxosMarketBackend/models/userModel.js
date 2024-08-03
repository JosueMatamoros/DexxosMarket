const pool = require('../config');

const getUserById = async (id) => {
    const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [id]);
    return result.rows[0];
};

const createUser = async (user) => {
    const { first_name, last_name1, last_name2, gender, email, password } = user;
    const result = await pool.query(
        'INSERT INTO users (first_name, last_name1, last_name2, gender, email, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [first_name, last_name1, last_name2, gender, email, password]
    );
    return result.rows[0];
};

const updateUser = async (id, user) => {
    const { first_name, last_name1, last_name2, gender, email, password } = user;
    const result = await pool.query(
        'UPDATE users SET first_name = $1, last_name1 = $2, last_name2 = $3, gender = $4, email = $5, password = $6 WHERE user_id = $7 RETURNING *',
        [first_name, last_name1, last_name2, gender, email, password, id]
    );
    return result.rows[0];
};

const deleteUser = async (id) => {
    await pool.query('DELETE FROM users WHERE user_id = $1', [id]);
};

module.exports = {
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
