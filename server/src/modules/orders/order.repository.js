const pool = require("../../config/db");
const withTransaction = require("../../utils/transaction");

const generateOrderNumber = async (connection) => {

    const [rows] = await connection.query(
        "SELECT id FROM orders ORDER BY id DESC LIMIT 1"
    );

    const nextId = rows.length
        ? rows[0].id + 1
        : 1;

    return `CC${String(nextId).padStart(6, "0")}`;

};

const createOrder = async (orderData) => {

    return withTransaction(async (connection) => {

        const {
            customer_name,
            payment_method,
            items
        } = orderData;

        let totalAmount = 0;

        const orderNumber = await generateOrderNumber(connection);

        for (const item of items) {

            const [productRows] = await connection.query(
                `
                SELECT id, price
                FROM products
                WHERE id = ?
                AND is_available = TRUE
                `,
                [item.product_id]
            );

            if (!productRows.length) {
                throw new Error(
                    `Product ${item.product_id} not found or unavailable.`
                );
            }

            const product = productRows[0];

            totalAmount +=
                Number(product.price) *
                Number(item.quantity);

        }

        const [orderResult] = await connection.query(
            `
            INSERT INTO orders
            (
                order_number,
                customer_name,
                total_amount
            )
            VALUES (?, ?, ?)
            `,
            [
                orderNumber,
                customer_name || null,
                totalAmount
            ]
        );

        const orderId = orderResult.insertId;

        for (const item of items) {

            const [productRows] = await connection.query(
                `
                SELECT price
                FROM products
                WHERE id = ?
                `,
                [item.product_id]
            );

            const price = productRows[0].price;

            await connection.query(
                `
                INSERT INTO order_items
                (
                    order_id,
                    product_id,
                    quantity,
                    unit_price,
                    notes
                )
                VALUES (?, ?, ?, ?, ?)
                `,
                [
                    orderId,
                    item.product_id,
                    item.quantity,
                    price,
                    item.notes || null
                ]
            );

        }

        await connection.query(
            `
            INSERT INTO payments
            (
                order_id,
                payment_method,
                payment_status,
                amount
            )
            VALUES (?, ?, 'pending', ?)
            `,
            [
                orderId,
                payment_method,
                totalAmount
            ]
        );

        await connection.query(
            `
            INSERT INTO order_status_history
            (
                order_id,
                status,
                updated_by
            )
            VALUES (?, 'pending_payment', NULL)
            `,
            [orderId]
        );

        return {
            id: orderId,
            order_number: orderNumber,
            total_amount: totalAmount
        };

    });

};

const getAllOrders = async () => {

    const [rows] = await pool.query(
        `
        SELECT *
        FROM orders
        ORDER BY created_at DESC
        `
    );

    return rows;

};

const getOrderById = async (id) => {

    const [orders] = await pool.query(
        `
        SELECT *
        FROM orders
        WHERE id = ?
        `,
        [id]
    );

    if (!orders.length) {
        return null;
    }

    const [items] = await pool.query(
        `
        SELECT
            oi.id,
            oi.product_id,
            p.name,
            oi.quantity,
            oi.unit_price,
            oi.notes
        FROM order_items oi
        JOIN products p
            ON oi.product_id = p.id
        WHERE oi.order_id = ?
        `,
        [id]
    );

    return {
        ...orders[0],
        items
    };

};

const updateOrderStatus = async (
    id,
    status,
    updatedBy = null
) => {

    return withTransaction(async (connection) => {

        await connection.query(
            `
            UPDATE orders
            SET status = ?
            WHERE id = ?
            `,
            [
                status,
                id
            ]
        );

        await connection.query(
            `
            INSERT INTO order_status_history
            (
                order_id,
                status,
                updated_by
            )
            VALUES (?, ?, ?)
            `,
            [
                id,
                status,
                updatedBy
            ]
        );

        return true;

    });

};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus
};