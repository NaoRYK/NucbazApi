import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import Order, { IOrder } from "../models/order";
export const getOrders = async (req:Request, res:Response) =>{

    const userID: ObjectId = req.body.confirmedUser._id;
    const consult = {user:userID}

    const orders = await Order.find(consult)

    res.status(200).json({
        data:[
            ...orders
        ]
    })
    
}

export const createOrder = async (req:Request, res:Response) =>{
    const orderData:IOrder = req.body;
    const userID:ObjectId = req.body.confirmedUser._id;
    const data = {
        ...orderData,
        user:userID,
        createdAt: new Date(),
        satus:"pending"
    }
    const order = new Order(data)
    console.log("la orden es", order);
    
    await order.save()

    res.status(201).json({
        order
    })
}