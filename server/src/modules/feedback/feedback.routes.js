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


// Customer
router.post(
    "/",
    createFeedbackValidation,
    feedbackController.createFeedback
);


// Admin
router.get(
    "/",
    authMiddleware,
    authorize("admin"),
    feedbackController.getAllFeedback
);

router.get(
    "/:id",
    authMiddleware,
    authorize("admin"),
    getFeedbackByIdValidation,
    feedbackController.getFeedbackById
);

router.delete(
    "/:id",
    authMiddleware,
    authorize("admin"),
    deleteFeedbackValidation,
    feedbackController.deleteFeedback
);


module.exports = router;