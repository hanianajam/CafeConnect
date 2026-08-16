const express = require("express");

const router = express.Router();

const controller = require("./category.controller");

const {
    categoryIdValidation,
    categoryValidation,
    categoryStatusValidation
} = require("./category.validation");

const authenticate = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/role.middleware");
const validate = require("../../middleware/validation.middleware");

router.get(
    "/",
    controller.getAllCategories
);

router.get(
    "/:id",
    categoryIdValidation,
    validate,
    controller.getCategoryById
);

router.post(
    "/",
    authenticate,
    authorize("admin", "manager"),
    categoryValidation,
    validate,
    controller.createCategory
);

router.put(
    "/:id",
    authenticate,
    authorize("admin", "manager"),
    categoryIdValidation,
    categoryValidation,
    validate,
    controller.updateCategory
);

router.patch(
    "/:id/status",
    authenticate,
    authorize("admin", "manager"),
    categoryStatusValidation,
    validate,
    controller.updateCategoryStatus
);


module.exports = router;