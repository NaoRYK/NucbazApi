"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const express_validator_1 = require("express-validator");
const collectErrors_1 = require("../middlewares/collectErrors");
const dbValidations_1 = require("../helpers/dbValidations");
const router = (0, express_1.Router)();
router.post("/register", [
    (0, express_validator_1.check)("nombre", "El nombre es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("email", "El email es obligatorio").isEmail(),
    (0, express_validator_1.check)("password", "La contraseña debe de ser de 6 caracteres minimamente").isLength({
        min: 6
    }),
    (0, express_validator_1.check)("email").custom(dbValidations_1.anEmailExist),
    collectErrors_1.collectErrors
], auth_1.register);
router.post("/login", [
    (0, express_validator_1.check)("email", "El mail no puede estar vacio").not().isEmpty(),
    (0, express_validator_1.check)("email", "El mail no es valido").isEmail(),
    (0, express_validator_1.check)("password", "La contraseña debe de ser de 6 caracteres minimamente").isLength({
        min: 6
    }),
    collectErrors_1.collectErrors
], auth_1.login);
router.patch("/verify", [
    (0, express_validator_1.check)("email", "El mail no puede estar vacio").not().isEmpty(),
    (0, express_validator_1.check)("email", "El mail no es valido").isEmail(),
    (0, express_validator_1.check)("code").not().isEmpty(),
    collectErrors_1.collectErrors
], auth_1.verifyUser);
exports.default = router;
