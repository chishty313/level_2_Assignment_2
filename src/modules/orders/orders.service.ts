import { TOrder } from './orders.interface';
import { OrderModel } from './orders.model';

const createOrderIntoDB = async (order: TOrder) => {
  return await OrderModel.create(order);
};

const getAllOrdersFromDB = async () => {
  return await OrderModel.find();
};

const filteredOrdersInfo = async (email: string) => {
  const regex = new RegExp(email, 'i');
  return await OrderModel.find({
    email: { $regex: regex },
  });
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  filteredOrdersInfo,
};
