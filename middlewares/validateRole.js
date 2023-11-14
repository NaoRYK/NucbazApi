"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
var constants_1 = require("../helpers/constants");
var isAdmin = function (req, res, next) {
    var rol = req.body.confirmedUser.rol;
    if (rol !== constants_1.ROLES.admin) {
        res.status(401).json({
            msg: "El usuario no es administrador"
        });
        return;
    }
    next();
};
exports.isAdmin = isAdmin;
