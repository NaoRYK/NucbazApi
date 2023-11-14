import { Router } from "express";
import { postNewIssue } from "../controllers/issues";
import validateJWT from "../middlewares/validateJWT";
import { isAdmin } from "../middlewares/validateRole";
import { collectErrors } from "../middlewares/collectErrors";
import { check } from "express-validator";

const router = Router();

router.post("/",
[
    validateJWT,
    isAdmin,
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("description", "La descripcion es obligatorio").not().isEmpty(),
    check("priority", "La prioridad es obligatorio").not().isEmpty(),
    collectErrors
],
postNewIssue)

export default router