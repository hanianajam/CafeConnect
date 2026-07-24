const db = require("../../config/db");

const getAllPromotions = async () => {

    const [rows] = await db.query(
        `SELECT *
         FROM promotions
         ORDER BY id DESC`
    );

    return rows;

};

const getPromotionById = async (id) => {

    const [rows] = await db.query(
        `SELECT *
         FROM promotions
         WHERE id = ?`,
        [id]
    );

    return rows[0];

};

const createPromotion = async (promotion) => {

    const {
        title,
        description,
        discount_percentage,
        start_date,
        end_date
    } = promotion;

    const [result] = await db.query(
        `INSERT INTO promotions
        (
            title,
            description,
            discount_percentage,
            start_date,
            end_date
        )
        VALUES (?, ?, ?, ?, ?)`,
        [
            title,
            description,
            discount_percentage,
            start_date,
            end_date
        ]
    );

    return result.insertId;

};

const updatePromotion = async (id, promotion) => {

    const {
        title,
        description,
        discount_percentage,
        start_date,
        end_date
    } = promotion;

    await db.query(
        `UPDATE promotions
        SET
            title = ?,
            description = ?,
            discount_percentage = ?,
            start_date = ?,
            end_date = ?
        WHERE id = ?`,
        [
            title,
            description,
            discount_percentage,
            start_date,
            end_date,
            id
        ]
    );

};

const updatePromotionStatus = async (id, is_active) => {

    await db.query(
        `UPDATE promotions
        SET is_active = ?
        WHERE id = ?`,
        [
            is_active,
            id
        ]
    );

};

module.exports = {
    getAllPromotions,
    getPromotionById,
    createPromotion,
    updatePromotion,
    updatePromotionStatus
};