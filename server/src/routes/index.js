const express = require("express");

const router = express.Router();

const healthRoutes = require("../modules/health/health.routes");
const authRoutes = require("../modules/auth/auth.routes");
const categoryRoutes = require("../modules/categories/category.routes");
const productRoutes = require("../modules/products/product.routes");

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);

module.exports = router;
