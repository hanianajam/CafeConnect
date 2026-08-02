const pool = require("../../config/db");

const getSummary = async () => {

    const [[products]] = await pool.query(`
        SELECT COUNT(*) AS total_products
        FROM products
        WHERE is_active = TRUE
    `);

    const [[categories]] = await pool.query(`
        SELECT COUNT(*) AS total_categories
        FROM categories
        WHERE is_active = TRUE
    `);

    const [[orders]] = await pool.query(`
        SELECT COUNT(*) AS total_orders
        FROM orders
    `);

    const [[revenue]] = await pool.query(`
        SELECT
            COALESCE(SUM(amount),0) AS total_revenue
        FROM payments
        WHERE payment_status='paid'
    `);

    return {
        total_products: products.total_products,
        total_categories: categories.total_categories,
        total_orders: orders.total_orders,
        total_revenue: revenue.total_revenue
    };

};

const getRecentOrders = async () => {

    const [rows] = await pool.query(`
        SELECT
            id,
            order_number,
            customer_name,
            total_amount,
            status,
            created_at
        FROM orders
        ORDER BY created_at DESC
        LIMIT 10
    `);

    return rows;

};

const getOrderStatus = async () => {

    const [rows] = await pool.query(`
        SELECT
            status,
            COUNT(*) AS total
        FROM orders
        GROUP BY status
        ORDER BY status
    `);

    return rows;

};

const getTopProducts = async () => {

    const [rows] = await pool.query(`
        SELECT
            p.id,
            p.name,
            SUM(oi.quantity) AS total_sold
        FROM order_items oi
        JOIN products p
            ON oi.product_id = p.id
        GROUP BY
            p.id,
            p.name
        ORDER BY total_sold DESC
        LIMIT 5
    `);

    return rows;

};

module.exports = {
    getSummary,
    getRecentOrders,
    getOrderStatus,
    getTopProducts
};