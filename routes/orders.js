"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var orders_1 = require("../controllers/orders");
var validateJWT_1 = require("../middlewares/validateJWT");
var collectErrors_1 = require("../middlewares/collectErrors");
var validateVerification_1 = require("../middlewares/validateVerification");
var express_validator_1 = require("express-validator");
var router = (0, express_1.Router)();
router.get("/", [validateJWT_1.default,
    collectErrors_1.collectErrors], orders_1.getOrders);
router.post("/", [
    validateJWT_1.default,
    validateVerification_1.isVerified,
    (0, express_validator_1.check)("price", "El precio es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("shippingCost", "El costo de envio es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("total", "El precio total es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("shippingDetails", "Los detalles de envio son obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("items", "El array de productos es obligatorio").not().isEmpty(),
    collectErrors_1.collectErrors
], orders_1.createOrder);
exports.default = router;
