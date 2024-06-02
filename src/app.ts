import express from 'express';
import { ProductRoutes } from './modules/products/products.route';
import cors from 'cors';

const app = express();

// Parsers => Uncomment if needed
app.use(express.json());
app.use(cors());

app.use('/api', ProductRoutes);

export default app;
