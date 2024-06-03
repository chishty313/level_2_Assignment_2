import { Request, Response } from 'express';
import { OrderServices } from './orders.service';
import { ProductModel } from '../products/products.model';
import orderSchema from './orders.validation';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { order } = req.body;
    orderSchema.parse(order);
    const { productId, quantity } = order;
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }
    if (quantity > product.inventory.quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      });
    }
    product.inventory.quantity -= quantity;
    product.inventory.inStock = product.inventory.quantity > 0;
    await product.save();
    const createdOrderInfo = await OrderServices.createOrderIntoDB(order);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: createdOrderInfo,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    let allFetchedData;
    if (email) {
      allFetchedData = await OrderServices.filteredOrdersInfo(email as string);
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully for user email!',
        data: allFetchedData,
      });
    } else {
      allFetchedData = await OrderServices.getAllOrdersFromDB();
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully!',
        data: allFetchedData,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const OrderControllers = {
  createOrder,
  getAllOrders,
};

/**Apni express js middleware use korte paren.
Something like below:
app.post('/api/orders', (req, res, next) => {
// Step 1: Find the product by its product ID from the database using req.body.productId
// Step 2: Compare the available product quantity with the quantity requested by the user in req.body.quantity
// Step 3: If the available product quantity is less than the requested quantity, throw an error indicating insufficient stock
// Step 4: If the product quantity is sufficient, proceed to the next middleware function
next();
}, (req, res, next) => {
// Step 5: Create the order in the database using the product and user information from the request
// Step 6: Reduce the quantity of the product by the amount ordered
// Step 7: If the product quantity becomes 0, update the inStock field to false (or 0)
// Step 8: Save the updated product information back to the database
// Step 9: Send a response to the client confirming the order has been successfully created
}); */
