import express from 'express';
import { ProductRoutes } from './modules/products/products.route';
import cors from 'cors';
import { OrderRouters } from './modules/orders/orders.route';

const app = express();

// Parsers => Uncomment if needed
app.use(express.json());
app.use(cors());

app.use('/api', ProductRoutes);

app.use('/api', OrderRouters);

export default app;
