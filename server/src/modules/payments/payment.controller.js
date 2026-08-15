const paymentService = require("./payment.service");
const sendResponse = require("../../utils/response");
const asyncHandler = require("../../utils/asyncHandler");
const MESSAGES = require("../../constants/messages");

const getAllPayments = asyncHandler(async (req, res) => {

    const payments = await paymentService.getAllPayments();

    return sendResponse(
        res,
        200,
        true,
        MESSAGES.PAYMENT.FETCHED_ALL,
        payments
    );

});

const getPaymentById = asyncHandler(async (req, res) => {

    const payment = await paymentService.getPaymentById(
        req.params.id
    );

    if (!payment) {

        return sendResponse(
            res,
            404,
            false,
            MESSAGES.PAYMENT.NOT_FOUND
        );

    }

    return sendResponse(
        res,
        200,
        true,
        MESSAGES.PAYMENT.FETCHED,
        payment
    );

});

const updatePaymentStatus = asyncHandler(async (req, res) => {

    const result = await paymentService.updatePaymentStatus(
        req.params.id,
        req.body.status
    );

    return sendResponse(
        res,
        200,
        true,
        MESSAGES.PAYMENT.STATUS_UPDATED,
        result
    );

});

module.exports = {
    getAllPayments,
    getPaymentById,
    updatePaymentStatus
};