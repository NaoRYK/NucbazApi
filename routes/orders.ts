import {Router} from "express"
import { createOrder, getOrders } from "../controllers/orders";
import validateJWT from "../middlewares/validateJWT";
import { collectErrors } from "../middlewares/collectErrors";
import { isVerified } from "../middlewares/validateVerification";
import { check } from "express-validator";

const router = Router();

router.get("/",
[validateJWT,
collectErrors]
,getOrders)

router.post("/",
[
    validateJWT,
    isVerified,
    check("price", "El precio es obligatorio").not().isEmpty(),
    check("shippingCost", "El costo de envio es obligatorio").not().isEmpty(),
    check("total", "El precio total es obligatorio").not().isEmpty(),
    check("shippingDetails", "Los detalles de envio son obligatorio").not().isEmpty(),
    check("items", "El array de productos es obligatorio").not().isEmpty(),
    collectErrors

],
createOrder)

export default router;