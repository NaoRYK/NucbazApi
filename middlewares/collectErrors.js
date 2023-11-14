"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectErrors = void 0;
var express_validator_1 = require("express-validator");
var collectErrors = function (req, res, next) {
    var errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json(errors);
    }
    else {
        next();
    }
};
exports.collectErrors = collectErrors;
