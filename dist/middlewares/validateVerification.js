"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isVerified = void 0;
const isVerified = (req, res, next) => {
    const { verified } = req.body.confirmedUser;
    if (!verified) {
        res.status(401).json({
            msg: "El usuario no está verificado. Por favor verificarlo"
        });
        return;
    }
    next();
};
exports.isVerified = isVerified;
