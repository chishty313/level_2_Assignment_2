"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const orderSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: 'Invalid email address' }),
    productId: zod_1.z.string().min(1, { message: 'Product ID is required' }),
    price: zod_1.z.number().positive({ message: 'Price must be greater than 0' }),
    quantity: zod_1.z
        .number()
        .int()
        .positive({ message: 'Quantity must be a positive integer' }),
});
exports.default = orderSchema;
