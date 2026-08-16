const orderService = require("./order.service");
const sendResponse = require("../../utils/response");
const asyncHandler = require("../../utils/asyncHandler");
const MESSAGES = require("../../constants/messages");

const getAllOrders = asyncHandler(async (req, res) => {

    const orders = await orderService.getAllOrders();

    return sendResponse(
        res,
        200,
        true,
        MESSAGES.ORDER.FETCHED_ALL,
        orders
    );

});

const getOrderById = asyncHandler(async (req, res) => {

    const order = await orderService.getOrderById(req.params.id);

    if (!order) {

        return sendResponse(
            res,
            404,
            false,
            MESSAGES.ORDER.NOT_FOUND
        );

    }

    return sendResponse(
        res,
        200,
        true,
        MESSAGES.ORDER.FETCHED,
        order
    );

});

const createOrder = asyncHandler(async (req, res) => {

    const order = await orderService.createOrder(req.body);

    return sendResponse(
        res,
        201,
        true,
        MESSAGES.ORDER.CREATED,
        order
    );

});

const updateOrderStatus = asyncHandler(async (req, res) => {

    await orderService.updateOrderStatus(
        req.params.id,
        req.body.status,
        req.user.id 
    );

    return sendResponse(
        res,
        200,
        true,
        MESSAGES.ORDER.STATUS_UPDATED
    );

});

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrderStatus
};