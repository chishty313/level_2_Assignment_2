import { Request, Response } from 'express';
import { ProductServices } from './products.service';
import productSchema from './products.validation';

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const zodParsedProductData = productSchema.parse(productData);
    const responseOfProductCreationFromService =
      await ProductServices.createProductIntoDB(zodParsedProductData);

    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: responseOfProductCreationFromService,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;

    let fetchedAllProductsData;

    if (searchTerm) {
      fetchedAllProductsData =
        await ProductServices.getFilteredProductsDataFromDB(
          searchTerm as string,
        );
      res.status(200).json({
        success: true,
        message: `Products matching search term '${searchTerm}' fetched successfully!`,
        data: fetchedAllProductsData,
      });
    } else {
      fetchedAllProductsData = await ProductServices.getAllProductsFromDB();
      res.status(200).json({
        success: true,
        message: 'Products fetched successfully!',
        data: fetchedAllProductsData,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const fetchedStudentsDataById =
      await ProductServices.getSingleProductByIdFromDB(productId);

    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: fetchedStudentsDataById,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const updatedProductInfo = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const { products: productData } = req.body;
    const zodParsedUpdatedProductData = productSchema.parse(productData);
    const fetchedUpdatedProductInfo =
      await ProductServices.updateSingleProductInfoIntoDB(
        productId,
        zodParsedUpdatedProductData,
      );

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: fetchedUpdatedProductInfo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
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
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updatedProductInfo,
  deleteProduct,
};
