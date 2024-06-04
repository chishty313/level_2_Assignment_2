"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const variantSchema = new mongoose_1.Schema({
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
const inventorySchema = new mongoose_1.Schema({
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
const productSchema = new mongoose_1.Schema({
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
exports.ProductModel = (0, mongoose_1.model)('Product', productSchema);
