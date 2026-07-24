const promotionRepository = require("./promotion.repository");

const getAllPromotions = async () => {

    return await promotionRepository.getAllPromotions();

};

const getPromotionById = async (id) => {

    return await promotionRepository.getPromotionById(id);

};

const createPromotion = async (promotion) => {

    return await promotionRepository.createPromotion(promotion);

};

const updatePromotion = async (id, promotion) => {

    return await promotionRepository.updatePromotion(
        id,
        promotion
    );

};

const updatePromotionStatus = async (id, is_active) => {

    return await promotionRepository.updatePromotionStatus(
        id,
        is_active
    );

};

module.exports = {
    getAllPromotions,
    getPromotionById,
    createPromotion,
    updatePromotion,
    updatePromotionStatus
};