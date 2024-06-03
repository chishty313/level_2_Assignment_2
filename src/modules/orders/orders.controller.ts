import { Request, Response } from 'express';
import { OrderServices } from './orders.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { order } = req.body;
    const createdOrderInfo = await OrderServices.createOrderIntoDB(order);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: createdOrderInfo,
    });
  } catch (error) {
    console.log(error);
  }
};

export const OrderControllers = {
  createOrder,
};
