"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
const products_model_1 = require("./products.model");
const createProductIntoDB = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const productCreationResponse = yield products_model_1.ProductModel.create(product);
    return productCreationResponse;
});
const getAllProductsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const gettingAllProductsDetails = yield products_model_1.ProductModel.find();
    return gettingAllProductsDetails;
});
const getFilteredProductsDataFromDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const regex = new RegExp(searchTerm, 'i');
    const filteredProductsInfo = yield products_model_1.ProductModel.find({
        $or: [
            { name: { $regex: regex } },
            { description: { $regex: regex } },
            { category: { $regex: regex } },
            { tags: { $regex: regex } },
        ],
    });
    return filteredProductsInfo;
});
const getSingleProductByIdFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const singleProductDetail = yield products_model_1.ProductModel.findById(productId);
    return singleProductDetail;
});
const updateSingleProductInfoIntoDB = (productId, product) => __awaiter(void 0, void 0, void 0, function* () {
    yield products_model_1.ProductModel.findByIdAndUpdate(productId, product);
    const updatedProductDataIntoDB = yield products_model_1.ProductModel.findById(productId);
    return updatedProductDataIntoDB;
});
const deleteProductFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    yield products_model_1.ProductModel.findByIdAndDelete(productId);
    const deletedProductStatus = yield products_model_1.ProductModel.findById(productId);
    return deletedProductStatus;
});
exports.ProductServices = {
    createProductIntoDB,
    getAllProductsFromDB,
    getSingleProductByIdFromDB,
    updateSingleProductInfoIntoDB,
    deleteProductFromDB,
    getFilteredProductsDataFromDB,
};
