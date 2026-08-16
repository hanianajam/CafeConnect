const db = require("../../config/db");

const getAll = async () => {

    const [rows] = await db.query(
        `SELECT
            id,
            name,
            description,
            image AS image_url,
            display_order,
            is_active,
            created_at,
            updated_at
        FROM categories
        ORDER BY display_order ASC, name ASC`
    );

    return rows;
};


const getById = async (id) => {

    const [rows] = await db.query(
        `SELECT
            id,
            name,
            description,
            image AS image_url,
            display_order,
            is_active,
            created_at,
            updated_at
        FROM categories
        WHERE id = ?`,
        [id]
    );

    return rows[0];
};


const create = async (category) => {

    const {
        name,
        description,
        image_url,
        display_order,
        is_active
    } = category;

    try {

        const [result] = await db.query(
            `INSERT INTO categories
            (name, description, image, display_order, is_active)
            VALUES (?, ?, ?, ?, ?)`,
            [
                name,
                description,
                image_url,
                display_order,
                is_active
            ]
        );

        return result.insertId;

    } catch (error) {

        if (error.code === "ER_DUP_ENTRY") {
            error.statusCode = 409;
            error.message = "Category with this name already exists.";
        }

        throw error;
    }
};


const update = async (id, category) => {

    const {
        name,
        description,
        image_url,
        display_order,
        is_active
    } = category;

    try {

        const [result] = await db.query(
            `UPDATE categories
            SET
                name=?,
                description=?,
                image=?,
                display_order=?,
                is_active=?
            WHERE id=?`,
            [
                name,
                description,
                image_url,
                display_order,
                is_active,
                id
            ]
        );

        return result.affectedRows;

    } catch (error) {

        if (error.code === "ER_DUP_ENTRY") {
            error.statusCode = 409;
            error.message = "Category with this name already exists.";
        }

        throw error;
    }
};


const updateStatus = async (id, status) => {

    const [result] = await db.query(
        `UPDATE categories
         SET is_active=?
         WHERE id=?`,
        [status, id]
    );

    return result.affectedRows;
};


module.exports = {
    getAll,
    getById,
    create,
    update,
    updateStatus
};