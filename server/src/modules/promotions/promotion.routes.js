const express = require("express");
const router = express.Router();

const promotionController = require("./promotion.controller");

const {
    createPromotionValidation,
    updatePromotionValidation,
    updatePromotionStatusValidation,
    getPromotionByIdValidation
} = require("./promotion.validation");

const authenticate = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/role.middleware");
const USER_ROLES = require("../../constants/userRoles");

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

router.get(
    "/",
    promotionController.getAllPromotions
);

router.get(
    "/:id",
    getPromotionByIdValidation,
    promotionController.getPromotionById
);

/*
|--------------------------------------------------------------------------
| Protected Routes (Admin)
|--------------------------------------------------------------------------
*/

router.post(
    "/",
    authenticate,
    authorize(USER_ROLES.ADMIN),
    createPromotionValidation,
    promotionController.createPromotion
);

router.put(
    "/:id",
    authenticate,
    authorize(USER_ROLES.ADMIN),
    updatePromotionValidation,
    promotionController.updatePromotion
);

router.patch(
    "/:id/status",
    authenticate,
    authorize(USER_ROLES.ADMIN),
    updatePromotionStatusValidation,
    promotionController.updatePromotionStatus
);

module.exports = router;