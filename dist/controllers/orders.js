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
exports.createOrder = exports.getOrders = void 0;
const order_1 = __importDefault(require("../models/order"));
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.body.confirmedUser._id;
    const consult = { user: userID };
    const orders = yield order_1.default.find(consult);
    res.status(200).json({
        data: [
            ...orders
        ]
    });
});
exports.getOrders = getOrders;
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderData = req.body;
    const userID = req.body.confirmedUser._id;
    const data = Object.assign(Object.assign({}, orderData), { user: userID, createdAt: new Date(), satus: "pending" });
    const order = new order_1.default(data);
    console.log("la orden es", order);
    yield order.save();
    res.status(201).json({
        order
    });
});
exports.createOrder = createOrder;
