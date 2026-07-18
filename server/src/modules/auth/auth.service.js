const pool = require("../../config/db");
const bcrypt = require("bcrypt");
const { generateToken } = require("../../utils/jwt");

const login = async (email, password) => {

    const [users] = await pool.execute(
        `SELECT * FROM users WHERE email = ? LIMIT 1`,
        [email]
    );

    if (users.length === 0) {
        return null;
    }

    const user = users[0];

    if (!user.is_active) {
        throw new Error("Account is inactive.");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return false;
    }

    const token = generateToken({
        id: user.id,
        role: user.role,
        name: user.name
    });

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    };
};

module.exports = {
    login
};