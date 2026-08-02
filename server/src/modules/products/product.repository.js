const db = require("../../config/db");

const getAllProducts = async () => {

    const [rows] = await db.query(
        `
        SELECT
            p.id,
            p.name,
            p.description,
            p.price,
            p.image,
            p.prep_time,
            p.is_featured,
            p.display_order,
            p.availability,
            p.is_active,
            c.id AS category_id,
            c.name AS category_name
        FROM products p
        JOIN categories c
            ON p.category_id = c.id
        WHERE
            p.availability = 'available'
            AND p.is_active = TRUE
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
            AND availability = 'available'
            AND is_active = TRUE
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
            AND availability = 'available'
            AND is_active = TRUE
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
            availability = 'available'
            AND is_active = TRUE
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
        image,
        prep_time,
        is_featured,
        display_order,
        availability
    } = product;

    const [result] = await db.query(
        `
        INSERT INTO products
        (
            category_id,
            name,
            description,
            price,
            image,
            prep_time,
            is_featured,
            display_order,
            availability
        )
        VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
            category_id,
            name,
            description,
            price,
            image,
            prep_time,
            is_featured,
            display_order,
            availability
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
        image,
        prep_time,
        is_featured,
        display_order,
        availability
    } = product;

    await db.query(
        `
        UPDATE products
        SET
            category_id = ?,
            name = ?,
            description = ?,
            price = ?,
            image = ?,
            prep_time = ?,
            is_featured = ?,
            display_order = ?,
            availability = ?
        WHERE id = ?
        `,
        [
            category_id,
            name,
            description,
            price,
            image,
            prep_time,
            is_featured,
            display_order,
            availability,
            id
        ]
    );

};

const updateProductStatus = async (id, is_active) => {

    await db.query(
        `
        UPDATE products
        SET is_active = ?
        WHERE id = ?
        `,
        [is_active, id]
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