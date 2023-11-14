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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = exports.login = exports.register = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const constants_1 = require("../helpers/constants");
const randomstring_1 = __importDefault(require("randomstring"));
const mailer_1 = require("../mailer/mailer");
const generateJWT_1 = require("../helpers/generateJWT");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, email, password, rol } = req.body;
    const usuario = new usuario_1.default({
        nombre,
        email,
        password,
        rol
    });
    const salt = bcryptjs_1.default.genSaltSync();
    usuario.password = bcryptjs_1.default.hashSync(password, salt);
    const adminKey = req.headers["admin-key"];
    if (adminKey === process.env.adminKey) {
        usuario.rol = constants_1.ROLES.admin;
    }
    const newCode = randomstring_1.default.generate(6);
    usuario.code = newCode;
    yield usuario.save();
    yield (0, mailer_1.sendEmail)(email, newCode);
    res.status(201).json({
        usuario
    });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield usuario_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({
                msg: "No se encontró el mail en la DB"
            });
            return;
        }
        const validatePassword = bcryptjs_1.default.compareSync(password, user.password);
        if (!validatePassword) {
            res.status(401).json({
                msg: "La contrase{a es incorrecta"
            });
            return;
        }
        ;
        const token = yield (0, generateJWT_1.generateJWT)(user.id);
        res.status(202).json({
            user,
            token
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error en el servidor"
        });
    }
});
exports.login = login;
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, code } = req.body;
    try {
        //Verificar si el usuario existe
        const user = yield usuario_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({
                msg: "No se encontró el mail en la DB"
            });
            return;
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
            return;
        }
        yield usuario_1.default.findOneAndUpdate({ email }, { verified: true });
        res.status(200).json({
            msg: "Usuario verificado exitosamente"
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error en el servidor"
        });
    }
});
exports.verifyUser = verifyUser;
