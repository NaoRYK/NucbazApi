"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = exports.login = exports.register = void 0;
var usuario_1 = require("../models/usuario");
var bcryptjs_1 = require("bcryptjs");
var constants_1 = require("../helpers/constants");
var randomstring_1 = require("randomstring");
var mailer_1 = require("../mailer/mailer");
var generateJWT_1 = require("../helpers/generateJWT");
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, nombre, email, password, rol, usuario, salt, adminKey, newCode;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, nombre = _a.nombre, email = _a.email, password = _a.password, rol = _a.rol;
                usuario = new usuario_1.default({
                    nombre: nombre,
                    email: email,
                    password: password,
                    rol: rol
                });
                salt = bcryptjs_1.default.genSaltSync();
                usuario.password = bcryptjs_1.default.hashSync(password, salt);
                adminKey = req.headers["admin-key"];
                if (adminKey === process.env.adminKey) {
                    usuario.rol = constants_1.ROLES.admin;
                }
                newCode = randomstring_1.default.generate(6);
                usuario.code = newCode;
                return [4 /*yield*/, usuario.save()];
            case 1:
                _b.sent();
                return [4 /*yield*/, (0, mailer_1.sendEmail)(email, newCode)];
            case 2:
                _b.sent();
                res.status(201).json({
                    usuario: usuario
                });
                return [2 /*return*/];
        }
    });
}); };
exports.register = register;
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, validatePassword, token, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, usuario_1.default.findOne({ email: email })];
            case 2:
                user = _b.sent();
                if (!user) {
                    res.status(400).json({
                        msg: "No se encontró el mail en la DB"
                    });
                    return [2 /*return*/];
                }
                validatePassword = bcryptjs_1.default.compareSync(password, user.password);
                if (!validatePassword) {
                    res.status(401).json({
                        msg: "La contrase{a es incorrecta"
                    });
                    return [2 /*return*/];
                }
                ;
                return [4 /*yield*/, (0, generateJWT_1.generateJWT)(user.id)];
            case 3:
                token = _b.sent();
                res.status(202).json({
                    user: user,
                    token: token
                });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                console.log(error_1);
                res.status(500).json({
                    msg: "Error en el servidor"
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var verifyUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, code, user, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, code = _a.code;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, usuario_1.default.findOne({ email: email })];
            case 2:
                user = _b.sent();
                if (!user) {
                    res.status(400).json({
                        msg: "No se encontró el mail en la DB"
                    });
                    return [2 /*return*/];
                }
                if (user.verified) {
                    res.status(400).json({
                        msg: "El usuario ya se encuentra verificado"
                    });
                }
                if (code !== user.code) {
                    res.status(401).json({
                        msg: "El codigo ingresado es incorrecto"
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, usuario_1.default.findOneAndUpdate({ email: email }, { verified: true })];
            case 3:
                _b.sent();
                res.status(200).json({
                    msg: "Usuario verificado exitosamente"
                });
                return [3 /*break*/, 5];
            case 4:
                error_2 = _b.sent();
                console.log(error_2);
                res.status(500).json({
                    msg: "Error en el servidor"
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.verifyUser = verifyUser;
