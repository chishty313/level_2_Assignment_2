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
  productId: string,
  product: TProduct,
) => {
  const previousProductDataIntoDB = await ProductModel.findByIdAndUpdate(
    productId,
    product,
  );
  const updatedProductDataIntoDB = await ProductModel.findById(productId);
  return updatedProductDataIntoDB;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductByIdFromDB,
  updateSingleProductInfoIntoDB,
};
