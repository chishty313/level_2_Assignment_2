import { Schema, model } from 'mongoose';
import { TOrder } from './orders.interface';
import { ProductModel } from '../products/products.model';
import { ProductServices } from '../products/products.service';
import { TProduct } from '../products/products.interface';

const orderSchema = new Schema<TOrder>({
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  productId: {
    type: String,
    required: [true, 'Product ID is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
  },
});

export const OrderModel = model<TOrder>('Order', orderSchema);
