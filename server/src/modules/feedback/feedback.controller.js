const feedbackService = require("./feedback.service");

const sendResponse = require("../../utils/response");
const asyncHandler = require("../../utils/asyncHandler");
const MESSAGES = require("../../constants/messages");


const getAllFeedback = asyncHandler(async (req, res) => {

    const feedback = await feedbackService.getAllFeedback();

    return sendResponse(
        res,
        200,
        true,
        MESSAGES.FEEDBACK.FETCHED_ALL,
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
            MESSAGES.FEEDBACK.NOT_FOUND
        );

    }

    return sendResponse(
        res,
        200,
        true,
        MESSAGES.FEEDBACK.FETCHED,
        feedback
    );

});


const createFeedback = asyncHandler(async (req, res) => {

    const id = await feedbackService.createFeedback(
        req.body
    );

    return sendResponse(
        res,
        201,
        true,
        MESSAGES.FEEDBACK.CREATED,
        { id }
    );

});


const deleteFeedback = asyncHandler(async (req, res) => {

    const deleted = await feedbackService.deleteFeedback(
        req.params.id
    );

    if (!deleted) {

        return sendResponse(
            res,
            404,
            false,
            MESSAGES.FEEDBACK.NOT_FOUND
        );

    }

    return sendResponse(
        res,
        200,
        true,
        MESSAGES.FEEDBACK.DELETED
    );

});


module.exports = {
    getAllFeedback,
    getFeedbackById,
    createFeedback,
    deleteFeedback
};