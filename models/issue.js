"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var IssueSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "El titulo es obligatorio"]
    },
    description: {
        type: String,
        required: [true, "La descripcion es obligatorio"]
    }, priority: {
        type: Number,
        required: [true, "La prioridad es obligatorio"]
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
var Issue = (0, mongoose_1.model)("Issue", IssueSchema);
exports.default = Issue;
