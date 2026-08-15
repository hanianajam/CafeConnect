const db = require("../../config/db");

const getAllPayments = async () => {

    const [rows] = await db.query(
        `
        SELECT
            p.id,
            p.order_id,
            o.order_number,
            p.payment_method,
            p.payment_status,
            p.amount
        FROM payments p
        JOIN orders o
            ON p.order_id = o.id
        ORDER BY p.id DESC
        `
    );

    return rows;

};

const getPaymentById = async (id) => {

    const [rows] = await db.query(
        `
        SELECT
            p.id,
            p.order_id,
            o.order_number,
            p.payment_method,
            p.payment_status,
            p.amount
        FROM payments p
        JOIN orders o
            ON p.order_id = o.id
        WHERE p.id = ?
        `,
        [id]
    );

    return rows.length ? rows[0] : null;

};

const updatePaymentStatus = async (
    id,
    status
) => {

    const [result] = await db.query(
        `
        UPDATE payments
        SET payment_status = ?
        WHERE id = ?
        `,
        [
            status,
            id
        ]
    );

    if (result.affectedRows === 0) {
        throw new Error("Payment not found.");
    }

    return true;

};

module.exports = {
    getAllPayments,
    getPaymentById,
    updatePaymentStatus
};