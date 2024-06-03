import { z } from 'zod';

const variantSchema = z.object({
  type: z.string().min(1, { message: 'Product type is required' }),
  value: z.string().min(1, { message: 'Product value is required' }),
});

const inventorySchema = z.object({
  quantity: z.number().min(0, { message: 'Product quantity is required' }),
  inStock: z.boolean({
    required_error: 'Product in stock availability information is required',
  }),
});

const productSchema = z.object({
  name: z.string().min(1, { message: 'Product name is required' }),
  description: z
    .string()
    .min(1, { message: 'Product description is required' }),
  price: z.number().min(0, { message: 'Product price is required' }),
  category: z.string().min(1, { message: 'Product category is required' }),
  tags: z.array(z.string()).min(1, { message: 'Product tags are required' }),
  variants: z
    .array(variantSchema)
    .min(1, { message: 'Product variants information is required' }),
  inventory: inventorySchema,
});
