const express = require("express");

const router = express.Router();

const controller = require("./category.controller");

const {
    categoryValidation
} = require("./category.validation");

const authenticate = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/role.middleware");

router.get(
    "/",
    controller.getAllCategories
);

router.get(
    "/:id",
    controller.getCategoryById
);

router.post(
    "/",
    authenticate,
    authorize("admin", "manager"),
    categoryValidation,
    controller.createCategory
);

router.put(
    "/:id",
    authenticate,
    authorize("admin", "manager"),
    categoryValidation,
    controller.updateCategory
);

router.patch(
    "/:id/status",
    authenticate,
    authorize("admin", "manager"),
    controller.updateCategoryStatus
);

module.exports = router;