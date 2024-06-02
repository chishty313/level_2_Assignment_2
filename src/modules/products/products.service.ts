import { TProduct } from './products.interface';
import { ProductModel } from './products.model';

const createProductIntoDB = async (product: TProduct) => {
  const productCreationResponse = await ProductModel.create(product);
  return productCreationResponse;
};

const getAllProductsFromDB = async () => {
  const gettingAllProductsDetails = await ProductModel.find();
  return gettingAllProductsDetails;
};

const getSingleProductByIdFromDB = async (productId: string) => {
  const singleProductDetail = await ProductModel.findById(productId);
  return singleProductDetail;
};

const updateSingleProductInfoIntoDB = async (
  productID: string,
  product: TProduct,
) => {
  const updatedProductIntoDB = await ProductModel.findByIdAndUpdate(
    productID,
    product,
  );
  return updatedProductIntoDB;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductByIdFromDB,
  updateSingleProductInfoIntoDB,
};
