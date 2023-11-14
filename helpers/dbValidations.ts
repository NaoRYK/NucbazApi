import { sendEmail } from "../mailer/mailer";
import Usuario, { IUser } from "../models/usuario"

export const anEmailExist= async (email:string): Promise<void> =>{

    const anEmailExist:IUser | null = await Usuario.findOne({email});

    if(anEmailExist && anEmailExist.verified) {
        throw new Error (`El correo ${email} ya está registrado`)
    }

    if(anEmailExist && !anEmailExist.verified) {
        await sendEmail(email, anEmailExist.code as string)
        throw new Error (`El usuario ya está registrado. Se envió nuevamente el codigo de verificacion a ${email}`)
    }
}