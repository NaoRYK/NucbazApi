"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWT = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var generateJWT = function (id) {
    if (id === void 0) { id = ""; }
    return new Promise(function (res, rej) {
        var payload = { id: id };
        jsonwebtoken_1.default.sign(payload, process.env.secretKey, {
            expiresIn: "4h"
        }, function (err, token) {
            if (err) {
                console.log(err);
                rej("No se pudo generar el JWT");
            }
            else {
                res(token);
            }
        });
    });
};
exports.generateJWT = generateJWT;
