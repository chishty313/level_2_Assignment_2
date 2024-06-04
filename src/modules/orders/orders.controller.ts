import { Request, Response } from 'express';
import { OrderServices } from './orders.service';
import { ProductModel } from '../products/products.model';
import orderSchema from './orders.validation';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { order } = req.body;
    const zodParsedOrderData = orderSchema.parse(order);
    const { productId, quantity } = zodParsedOrderData;
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }
    if (quantity > product.inventory.quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      });
    }
    product.inventory.quantity -= quantity;
    product.inventory.inStock = product.inventory.quantity > 0;
    await product.save();
    const createdOrderInfo = await OrderServices.createOrderIntoDB(order);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: createdOrderInfo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
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
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getAllOrders,
};
