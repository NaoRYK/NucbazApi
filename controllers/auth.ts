import { Request, Response } from "express"
import Usuario, { IUser } from "../models/usuario";
import bcryptjs from "bcryptjs"
import { ROLES } from "../helpers/constants";
import randomstring  from "randomstring"
import { sendEmail } from "../mailer/mailer";
import { generateJWT } from "../helpers/generateJWT";

export const register = async (req:Request,res:Response) => {

    const {nombre,email,password,rol}:IUser = req.body;

    const usuario = new Usuario({
        nombre,
        email,
        password,
        rol
    });
    

    const salt = bcryptjs.genSaltSync();

    usuario.password = bcryptjs.hashSync(password,salt)

    const adminKey = req.headers["admin-key"];

    if(adminKey === process.env.adminKey){
        usuario.rol = ROLES.admin;
    }
    
    const newCode = randomstring.generate(6);

    usuario.code = newCode;

    await usuario.save()


    await sendEmail(email,newCode)

    res.status(201).json({
        usuario
    });

    
}

export const login = async (req:Request, res:Response):Promise<void> =>{
    const {email,password}:IUser = req.body;

    try {
        
        const user = await Usuario.findOne({email});

        if(!user){
            res.status(400).json({
                msg:"No se encontró el mail en la DB"
            });
            return
        }

        const validatePassword = bcryptjs.compareSync(password, user.password)

        if(!validatePassword){
            res.status(401).json({
                msg:"La contrase{a es incorrecta"
            })
            return;

        };

        const token = await generateJWT(user.id);

        res.status(202).json({
            user,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"Error en el servidor"
        })
        
    }
}

export const verifyUser = async (req:Request,res:Response)=>{

    const {email,code} = req.body;

    try {
        //Verificar si el usuario existe
        
        const user = await Usuario.findOne({email});


        if(!user){
            res.status(400).json({
                msg:"No se encontró el mail en la DB"
            });
            return
        }

        if(user.verified){
            res.status(400).json({
                msg:"El usuario ya se encuentra verificado"
            })
        }

        if(code !== user.code){
            res.status(401).json({
                msg:"El codigo ingresado es incorrecto"
            })
            return;
        }


        await Usuario.findOneAndUpdate(
            {email},
            {verified:true}
        );

        res.status(200).json({
            msg:"Usuario verificado exitosamente"
        })
    } catch (error) {

            console.log(error);
            res.status(500).json({
                msg:"Error en el servidor"
            })
            
        
    }

}