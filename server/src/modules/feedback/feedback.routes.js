const express = require("express");

const router = express.Router();

const feedbackController = require("./feedback.controller");

const {
    createFeedbackValidation,
    getFeedbackByIdValidation,
    deleteFeedbackValidation
} = require("./feedback.validation");

const authMiddleware = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/role.middleware");
const validate = require("../../middleware/validation.middleware");


// Customer
router.post(
    "/",
    createFeedbackValidation,
    validate,
    feedbackController.createFeedback
);


// Admin
router.get(
    "/",
    authMiddleware,
    authorize("admin"),
    feedbackController.getAllFeedback
);


// Admin
router.get(
    "/:id",
    authMiddleware,
    authorize("admin"),
    getFeedbackByIdValidation,
    validate,
    feedbackController.getFeedbackById
);


// Admin
router.delete(
    "/:id",
    authMiddleware,
    authorize("admin"),
    deleteFeedbackValidation,
    validate,
    feedbackController.deleteFeedback
);


module.exports = router;