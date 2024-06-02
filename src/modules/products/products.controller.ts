import { Request, Response } from 'express';
import { ProductServices } from './products.service';

const createProduct = async (req: Request, res: Response) => {
  try {
    const { products: productData } = req.body;
    const responseOfProductCreationFromService =
      await ProductServices.createProductIntoDB(productData);

    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: responseOfProductCreationFromService,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const fetchedAllStudentsData = await ProductServices.getAllProductsFromDB();

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: fetchedAllStudentsData,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    // console.log(req);
    const { productId } = req.params;
    const fetchedStudentsDataById =
      await ProductServices.getSingleProductByIdFromDB(productId);

    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: fetchedStudentsDataById,
    });
  } catch (error) {
    console.log(error);
  }
};

const updatedProductInfo = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const { products: productData } = req.body;
    const fetchedUpdatedProductInfo =
      await ProductServices.updateSingleProductInfoIntoDB(
        productId,
        productData,
      );

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: fetchedUpdatedProductInfo,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const fetchedDataFromDeletedProduct =
      await ProductServices.deleteProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: fetchedDataFromDeletedProduct,
    });
  } catch (error) {
    console.log(error);
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updatedProductInfo,
  deleteProduct,
};
