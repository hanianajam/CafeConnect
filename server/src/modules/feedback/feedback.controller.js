const feedbackService = require("./feedback.service");
const sendResponse = require("../../utils/response");
const asyncHandler = require("../../utils/asyncHandler");
const { validationResult } = require("express-validator");
const MESSAGES = require("../../constants/messages");

const getAllFeedback = asyncHandler(async (req, res) => {

    const feedback = await feedbackService.getAllFeedback();

    return sendResponse(
        res,
        200,
        true,
        "Feedback fetched successfully.",
        feedback
    );

});

const getFeedbackById = asyncHandler(async (req, res) => {

    const feedback = await feedbackService.getFeedbackById(
        req.params.id
    );

    if (!feedback) {

        return sendResponse(
            res,
            404,
            false,
            "Feedback not found."
        );

    }

    return sendResponse(
        res,
        200,
        true,
        "Feedback fetched successfully.",
        feedback
    );

});

const createFeedback = asyncHandler(async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return sendResponse(
            res,
            400,
            false,
            MESSAGES.COMMON.VALIDATION_FAILED,
            errors.array()
        );

    }

    const id = await feedbackService.createFeedback(
        req.body
    );

    return sendResponse(
        res,
        201,
        true,
        "Feedback submitted successfully.",
        { id }
    );

});

const deleteFeedback = asyncHandler(async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return sendResponse(
            res,
            400,
            false,
            MESSAGES.COMMON.VALIDATION_FAILED,
            errors.array()
        );

    }

    const deleted = await feedbackService.deleteFeedback(
        req.params.id
    );

    if (!deleted) {

        return sendResponse(
            res,
            404,
            false,
            "Feedback not found."
        );

    }

    return sendResponse(
        res,
        200,
        true,
        "Feedback deleted successfully."
    );

});

module.exports = {
    getAllFeedback,
    getFeedbackById,
    createFeedback,
    deleteFeedback
};