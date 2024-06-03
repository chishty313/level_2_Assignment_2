import { Schema, model } from 'mongoose';
import {
  TProduct,
  TProductInventory,
  TProductVariant,
} from './products.interface';

const variantSchema = new Schema<TProductVariant>({
  type: {
    type: String,
    required: [true, 'Product type is required'],
    default: '',
  },
  value: {
    type: String,
    required: [true, 'Product value is required'],
    default: '',
  },
});

const inventorySchema = new Schema<TProductInventory>({
  quantity: {
    type: Number,
    required: [true, 'Product quantity is required'],
    default: 0,
  },
  inStock: {
    type: Boolean,
    required: [true, 'Product in stock availability information is required'],
    default: false,
  },
});

const productSchema = new Schema<TProduct>({
  name: {
    type: String,
    required: [true, 'Product name is required'],
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
  },
  tags: {
    type: [String],
    required: [true, 'Product tags are required'],
  },
  variants: {
    type: [variantSchema],
    required: [true, 'Product variants information is required'],
  },
  inventory: {
    type: inventorySchema,
    required: [true, 'Product inventory details are required'],
  },
});

export const ProductModel = model<TProduct>('Product', productSchema);
