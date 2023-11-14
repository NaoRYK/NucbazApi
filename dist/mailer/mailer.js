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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'cesarchalimond93@gmail.com',
        pass: 'zekltnldbozapqnd',
    },
    from: 'cesarchalimond93@gmail.com'
});
const sendEmail = (to, code) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOptions = {
        from: '"Nucbanetta" cesarchalimond93@gmail.com',
        to,
        subject: "Codigo de verificacion para la Nucbanetta",
        text: ` 
            Se ha completado tu registro exitosamente.

            Tu codigo de activacion es: ${code}
        `
    };
    try {
        yield transporter.sendMail(mailOptions);
        console.log("Correo electronico enviado");
    }
    catch (error) {
        console.error("Error al enviar el correo electronico: ", error);
    }
});
exports.sendEmail = sendEmail;
