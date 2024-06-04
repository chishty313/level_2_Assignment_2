"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const variantSchema = zod_1.z.object({
    type: zod_1.z.string().min(1, { message: 'Product type is required' }),
    value: zod_1.z.string().min(1, { message: 'Product value is required' }),
});
const inventorySchema = zod_1.z.object({
    quantity: zod_1.z.number().min(0, { message: 'Product quantity is required' }),
    inStock: zod_1.z.boolean({
        required_error: 'Product in stock availability information is required',
    }),
});
const productSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: 'Product name is required' }),
    description: zod_1.z
        .string()
        .min(1, { message: 'Product description is required' }),
    price: zod_1.z.number().min(0, { message: 'Product price is required' }),
    category: zod_1.z.string().min(1, { message: 'Product category is required' }),
    tags: zod_1.z.array(zod_1.z.string()).min(1, { message: 'Product tags are required' }),
    variants: zod_1.z
        .array(variantSchema)
        .min(1, { message: 'Product variants information is required' }),
    inventory: inventorySchema,
});
exports.default = productSchema;
