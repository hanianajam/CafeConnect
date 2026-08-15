const paymentRepository = require("./payment.repository");

const getAllPayments = async () => {

    return paymentRepository.getAllPayments();

};

const getPaymentById = async (id) => {

    return paymentRepository.getPaymentById(id);

};

const updatePaymentStatus = async (id, status) => {

    const payment = await paymentRepository.getPaymentById(id);

    if (!payment) {
        throw new Error("Payment not found.");
    }

    return paymentRepository.updatePaymentStatus(
        id,
        status
    );

};

module.exports = {
    getAllPayments,
    getPaymentById,
    updatePaymentStatus
};