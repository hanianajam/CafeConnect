const db = require("../../config/db");

const getAllProducts = async () => {

    const [rows] = await db.query(
        `
        SELECT
            p.id,
            p.name,
            p.description,
            p.price,
            p.image_url,
            p.preparation_time,
            p.is_featured,
            p.display_order,
            p.is_available,
            c.id AS category_id,
            c.name AS category_name
        FROM products p
        JOIN categories c
            ON p.category_id = c.id
        WHERE p.is_available = TRUE
        ORDER BY
            p.display_order ASC,
            p.name ASC
        `
    );

    return rows;

};

const getProductById = async (id) => {

    const [rows] = await db.query(
        `
        SELECT
            p.*,
            c.name AS category_name
        FROM products p
        JOIN categories c
            ON p.category_id = c.id
        WHERE p.id = ?
        `,
        [id]
    );

    return rows[0];

};

const getProductsByCategory = async (categoryId) => {

    const [rows] = await db.query(
        `
        SELECT *
        FROM products
        WHERE
            category_id = ?
            AND is_available = TRUE
        ORDER BY display_order
        `,
        [categoryId]
    );

    return rows;

};

const getFeaturedProducts = async () => {

    const [rows] = await db.query(
        `
        SELECT *
        FROM products
        WHERE
            is_featured = TRUE
            AND is_available = TRUE
        ORDER BY display_order
        `
    );

    return rows;

};

const searchProducts = async (keyword) => {

    const [rows] = await db.query(
        `
        SELECT *
        FROM products
        WHERE
            is_available = TRUE
            AND (
                name LIKE ?
                OR description LIKE ?
            )
        ORDER BY display_order
        `,
        [`%${keyword}%`, `%${keyword}%`]
    );

    return rows;

};

const createProduct = async (product) => {

    const {
        category_id,
        name,
        description,
        price,
        image_url,
        preparation_time,
        is_featured,
        display_order
    } = product;

    const [result] = await db.query(
        `
        INSERT INTO products
        (
            category_id,
            name,
            description,
            price,
            image_url,
            preparation_time,
            is_featured,
            display_order
        )
        VALUES
        (?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
            category_id,
            name,
            description,
            price,
            image_url,
            preparation_time,
            is_featured,
            display_order
        ]
    );

    return result.insertId;

};

const updateProduct = async (id, product) => {

    const {
        category_id,
        name,
        description,
        price,
        image_url,
        preparation_time,
        is_featured,
        display_order
    } = product;

    await db.query(
        `
        UPDATE products
        SET
            category_id = ?,
            name = ?,
            description = ?,
            price = ?,
            image_url = ?,
            preparation_time = ?,
            is_featured = ?,
            display_order = ?
        WHERE id = ?
        `,
        [
            category_id,
            name,
            description,
            price,
            image_url,
            preparation_time,
            is_featured,
            display_order,
            id
        ]
    );

};

const updateProductStatus = async (id, is_available) => {

    await db.query(
        `
        UPDATE products
        SET is_available = ?
        WHERE id = ?
        `,
        [is_available, id]
    );

};

module.exports = {
    getAllProducts,
    getProductById,
    getProductsByCategory,
    getFeaturedProducts,
    searchProducts,
    createProduct,
    updateProduct,
    updateProductStatus
};