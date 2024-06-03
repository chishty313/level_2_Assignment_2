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

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    let allFetchedData;
    if (email) {
      allFetchedData = await OrderServices.filteredOrdersInfo(email as string);
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully for user email!',
        data: allFetchedData,
      });
    } else {
      allFetchedData = await OrderServices.getAllOrdersFromDB();
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully!',
        data: allFetchedData,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const OrderControllers = {
  createOrder,
  getAllOrders,
};
