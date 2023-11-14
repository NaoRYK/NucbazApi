"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isVerified = void 0;
var isVerified = function (req, res, next) {
    var verified = req.body.confirmedUser.verified;
    if (!verified) {
        res.status(401).json({
            msg: "El usuario no está verificado. Por favor verificarlo"
        });
        return;
    }
    next();
};
exports.isVerified = isVerified;
