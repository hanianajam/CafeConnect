const promotionService = require("./promotion.service");
const sendResponse = require("../../utils/response");
const asyncHandler = require("../../utils/asyncHandler");
const MESSAGES = require("../../constants/messages");

const getAllPromotions = asyncHandler(async (req, res) => {

    const promotions = await promotionService.getAllPromotions();

    return sendResponse(
        res,
        200,
        true,
        MESSAGES.PROMOTION.FETCHED_ALL,
        promotions
    );

});

const getPromotionById = asyncHandler(async (req, res) => {

    const promotion = await promotionService.getPromotionById(req.params.id);

    if (!promotion) {

        return sendResponse(
            res,
            404,
            false,
            MESSAGES.PROMOTION.NOT_FOUND
        );

    }

    return sendResponse(
        res,
        200,
        true,
        MESSAGES.PROMOTION.FETCHED,
        promotion
    );

});

const createPromotion = asyncHandler(async (req, res) => {

    const id = await promotionService.createPromotion(req.body);

    return sendResponse(
        res,
        201,
        true,
        MESSAGES.PROMOTION.CREATED,
        { id }
    );

});

const updatePromotion = asyncHandler(async (req, res) => {

    await promotionService.updatePromotion(
        req.params.id,
        req.body
    );

    return sendResponse(
        res,
        200,
        true,
        MESSAGES.PROMOTION.UPDATED
    );

});

const updatePromotionStatus = asyncHandler(async (req, res) => {

    await promotionService.updatePromotionStatus(
        req.params.id,
        req.body.is_active
    );

    return sendResponse(
        res,
        200,
        true,
        MESSAGES.PROMOTION.STATUS_UPDATED
    );

});

module.exports = {
    getAllPromotions,
    getPromotionById,
    createPromotion,
    updatePromotion,
    updatePromotionStatus
};