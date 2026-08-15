const db = require("../../config/db");

const createFeedback = async (feedbackData) => {

    const {
        order_id,
        overall_rating,
        comment,
        would_recommend
    } = feedbackData;

    const [orders] = await db.query(
        `
        SELECT id
        FROM orders
        WHERE id = ?
        AND status = 'completed'
        `,
        [order_id]
    );

    if (!orders.length) {

        const error = new Error(
            "Feedback can only be submitted for a completed order."
        );

        error.statusCode = 400;

        throw error;

    }

    const [existingFeedback] = await db.query(
        `
        SELECT id
        FROM feedback
        WHERE order_id = ?
        `,
        [order_id]
    );

    if (existingFeedback.length) {

        const error = new Error(
            "Feedback has already been submitted for this order."
        );

        error.statusCode = 400;

        throw error;

    }

    const [result] = await db.query(
        `
        INSERT INTO feedback
        (
            order_id,
            overall_rating,
            comment,
            would_recommend
        )
        VALUES (?, ?, ?, ?)
        `,
        [
            order_id,
            overall_rating,
            comment || null,
            would_recommend ?? null
        ]
    );

    return result.insertId;

};

const getAllFeedback = async () => {

    const [rows] = await db.query(
        `
        SELECT
            f.id,
            f.order_id,
            o.order_number,
            f.overall_rating,
            f.comment,
            f.would_recommend,
            f.created_at
        FROM feedback f
        JOIN orders o
            ON f.order_id = o.id
        ORDER BY f.created_at DESC
        `
    );

    return rows;

};

const getFeedbackById = async (id) => {

    const [rows] = await db.query(
        `
        SELECT
            f.id,
            f.order_id,
            o.order_number,
            f.overall_rating,
            f.comment,
            f.would_recommend,
            f.created_at
        FROM feedback f
        JOIN orders o
            ON f.order_id = o.id
        WHERE f.id = ?
        `,
        [id]
    );

    return rows[0];

};

const deleteFeedback = async (id) => {

    const [result] = await db.query(
        `
        DELETE FROM feedback
        WHERE id = ?
        `,
        [id]
    );

    return result.affectedRows > 0;

};

module.exports = {
    createFeedback,
    getAllFeedback,
    getFeedbackById,
    deleteFeedback
};