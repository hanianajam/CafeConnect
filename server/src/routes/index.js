const express = require("express");

const router = express.Router();

const healthRoutes = require("../modules/health/health.routes");
const authRoutes = require("../modules/auth/auth.routes");
const categoryRoutes = require("../modules/categories/category.routes");
const productRoutes = require("../modules/products/product.routes");
const promotionRoutes = require("../modules/promotions/promotion.routes");
const orderRoutes = require("../modules/orders/order.routes");
const dashboardRoutes = require("../modules/dashboard/dashboard.routes");
const ingredientRoutes = require("../modules/ingredients/ingredient.routes");

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);
router.use("/promotions", promotionRoutes);
router.use("/orders", orderRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/ingredients", ingredientRoutes);

module.exports = router;
