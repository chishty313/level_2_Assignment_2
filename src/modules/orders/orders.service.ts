import { TOrder } from './orders.interface';
import { OrderModel } from './orders.model';

const createOrderIntoDB = async (order: TOrder) => {
  return await OrderModel.create(order);
};

export const OrderServices = {
  createOrderIntoDB,
};
