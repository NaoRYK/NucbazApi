import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import Usuario, { IUser } from "../models/usuario";
const validateJWT = async (req:Request, res:Response, next:NextFunction) =>{
    const token = req.headers["x-token"] as string;

    if(!token){
        res.status(401).json({
            msg:"No hay token en la peticion"
        })

        return;
    }

    try {
        const secretKey = process.env.secretKey as string;
        const payload = jwt.verify(token, secretKey ) as JwtPayload;

        const {id} = payload;


        const confirmedUser: IUser | null = await Usuario.findById(id);


        if(!confirmedUser){
            res.status(404).json({
                msg:"El usuario no se encontró en la DB"
            });
            return;
        }


        req.body.confirmedUser = confirmedUser;

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:"Token no valido"
        })

    }
    
}

export default validateJWT;