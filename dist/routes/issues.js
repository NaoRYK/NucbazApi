"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const issues_1 = require("../controllers/issues");
const validateJWT_1 = __importDefault(require("../middlewares/validateJWT"));
const validateRole_1 = require("../middlewares/validateRole");
const collectErrors_1 = require("../middlewares/collectErrors");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.post("/", [
    validateJWT_1.default,
    validateRole_1.isAdmin,
    (0, express_validator_1.check)("title", "El titulo es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("description", "La descripcion es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("priority", "La prioridad es obligatorio").not().isEmpty(),
    collectErrors_1.collectErrors
], issues_1.postNewIssue);
exports.default = router;
