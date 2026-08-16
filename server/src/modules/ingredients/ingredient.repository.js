const db = require("../../config/db");
const MESSAGES = require("../../constants/messages");


const getAllIngredients = async () => {

    const [rows] = await db.query(
        `
        SELECT
            id,
            name,
            is_allergen,
            created_at
        FROM ingredients
        ORDER BY name ASC
        `
    );

    return rows;
};


const getIngredientById = async (id) => {

    const [rows] = await db.query(
        `
        SELECT
            id,
            name,
            is_allergen,
            created_at
        FROM ingredients
        WHERE id = ?
        `,
        [id]
    );

    return rows[0];
};


const createIngredient = async (ingredient) => {

    const {
        name,
        is_allergen
    } = ingredient;

    try {

        const [result] = await db.query(
            `
            INSERT INTO ingredients
            (
                name,
                is_allergen
            )
            VALUES (?, ?)
            `,
            [
                name,
                is_allergen
            ]
        );

        return result.insertId;

    } catch (error) {

        if (error.code === "ER_DUP_ENTRY") {

            const duplicateError = new Error(
                MESSAGES.INGREDIENT.ALREADY_EXISTS

            );

            duplicateError.statusCode = 409;

            throw duplicateError;
        }

        throw error;
    }
};


const updateIngredient = async (id, ingredient) => {

    const {
        name,
        is_allergen
    } = ingredient;

    const [result] = await db.query(
        `
        UPDATE ingredients
        SET
            name = ?,
            is_allergen = ?
        WHERE id = ?
        `,
        [
            name,
            is_allergen,
            id
        ]
    );

    return result.affectedRows > 0;
};


module.exports = {
    getAllIngredients,
    getIngredientById,
    createIngredient,
    updateIngredient
};