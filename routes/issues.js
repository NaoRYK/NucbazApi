"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var issues_1 = require("../controllers/issues");
var validateJWT_1 = require("../middlewares/validateJWT");
var validateRole_1 = require("../middlewares/validateRole");
var collectErrors_1 = require("../middlewares/collectErrors");
var express_validator_1 = require("express-validator");
var router = (0, express_1.Router)();
router.post("/", [
    validateJWT_1.default,
    validateRole_1.isAdmin,
    (0, express_validator_1.check)("title", "El titulo es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("description", "La descripcion es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("priority", "La prioridad es obligatorio").not().isEmpty(),
    collectErrors_1.collectErrors
], issues_1.postNewIssue);
exports.default = router;
