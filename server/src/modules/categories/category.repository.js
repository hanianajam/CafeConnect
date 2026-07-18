const db = require("../../config/db");

const getAll = async () => {
    const [rows] = await db.query(
        `SELECT
            id,
            name,
            description,
            image_url,
            display_order,
            is_active,
            created_at
        FROM categories
        ORDER BY display_order ASC, name ASC`
    );

    return rows;
};

const getById = async (id) => {
    const [rows] = await db.query(
        `SELECT *
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

    const [result] = await db.query(
        `INSERT INTO categories
        (name, description, image_url, display_order, is_active)
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
};

const update = async (id, category) => {

    const {
        name,
        description,
        image_url,
        display_order,
        is_active
    } = category;

    await db.query(
        `UPDATE categories
        SET
            name=?,
            description=?,
            image_url=?,
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
};

const updateStatus = async (id, status) => {

    await db.query(
        `UPDATE categories
         SET is_active=?
         WHERE id=?`,
        [status, id]
    );

};

module.exports = {
    getAll,
    getById,
    create,
    update,
    updateStatus
};