const feedbackRepository = require("./feedback.repository");

const createFeedback = async (feedbackData) => {

    return await feedbackRepository.createFeedback(feedbackData);

};

const getAllFeedback = async () => {

    return await feedbackRepository.getAllFeedback();

};

const getFeedbackById = async (id) => {

    return await feedbackRepository.getFeedbackById(id);

};

const deleteFeedback = async (id) => {

    return await feedbackRepository.deleteFeedback(id);

};

module.exports = {
    createFeedback,
    getAllFeedback,
    getFeedbackById,
    deleteFeedback
};