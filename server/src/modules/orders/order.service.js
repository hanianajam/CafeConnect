const orderRepository = require("./order.repository");

const createOrder = async (orderData) => {

    return await orderRepository.createOrder(orderData);

};

const getAllOrders = async () => {

    return await orderRepository.getAllOrders();

};

const getOrderById = async (id) => {

    return await orderRepository.getOrderById(id);

};

const updateOrderStatus = async (
    id,
    status,
    updatedBy
) => {

    return await orderRepository.updateOrderStatus(
        id,
        status,
        updatedBy
    );

};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus
};