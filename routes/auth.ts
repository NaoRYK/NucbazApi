import { Router } from "express";
import { login, register, verifyUser } from "../controllers/auth";
import { check } from "express-validator";
import { collectErrors } from "../middlewares/collectErrors";
import { anEmailExist } from "../helpers/dbValidations";

const router = Router();

router.post(

    "/register",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("email", "El email es obligatorio").isEmail(),
        check("password", "La contraseña debe de ser de 6 caracteres minimamente").isLength({
            min:6
        }),
        check("email").custom(anEmailExist),
        
        collectErrors
    ],
    register
)

router.post(
    "/login",
    [
        check("email","El mail no puede estar vacio").not().isEmpty(),
        check("email","El mail no es valido").isEmail(),
        check("password", "La contraseña debe de ser de 6 caracteres minimamente").isLength({
            min:6
        }),
        collectErrors
    ],
    login
)

router.patch(
    "/verify",
    [
        check("email","El mail no puede estar vacio").not().isEmpty(),
        check("email","El mail no es valido").isEmail(),
        check("code").not().isEmpty(),
        collectErrors

    ],
    verifyUser
)

export default router;