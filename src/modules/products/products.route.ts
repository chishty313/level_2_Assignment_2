import express from 'express';
import { ProductControllers } from './products.controller';

const router = express.Router();

router.post('/products', ProductControllers.createProduct);

router.get('/products', ProductControllers.getAllProducts);

router.get('/products/:productId', ProductControllers.getSingleProduct);

router.put('/products/:productId', ProductControllers.updatedProductInfo);

router.delete('/products/:productId', ProductControllers.deleteProduct);

export const ProductRoutes = router;
