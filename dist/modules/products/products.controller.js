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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductControllers = void 0;
const products_service_1 = require("./products.service");
const products_validation_1 = __importDefault(require("./products.validation"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const productData = req.body;
        console.log(productData);
        const zodParsedProductData = products_validation_1.default.parse(productData);
        console.log(zodParsedProductData);
        const responseOfProductCreationFromService = yield products_service_1.ProductServices.createProductIntoDB(zodParsedProductData);
        console.log(responseOfProductCreationFromService);
        res.status(200).json({
            success: true,
            message: 'Product created successfully!',
            data: responseOfProductCreationFromService,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
});
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query;
        let fetchedAllProductsData;
        if (searchTerm) {
            fetchedAllProductsData =
                yield products_service_1.ProductServices.getFilteredProductsDataFromDB(searchTerm);
            res.status(200).json({
                success: true,
                message: `Products matching search term '${searchTerm}' fetched successfully!`,
                data: fetchedAllProductsData,
            });
        }
        else {
            fetchedAllProductsData = yield products_service_1.ProductServices.getAllProductsFromDB();
            res.status(200).json({
                success: true,
                message: 'Products fetched successfully!',
                data: fetchedAllProductsData,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
});
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const fetchedStudentsDataById = yield products_service_1.ProductServices.getSingleProductByIdFromDB(productId);
        res.status(200).json({
            success: true,
            message: 'Product fetched successfully!',
            data: fetchedStudentsDataById,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
});
const updatedProductInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const productData = req.body;
        const zodParsedUpdatedProductData = products_validation_1.default.parse(productData);
        const fetchedUpdatedProductInfo = yield products_service_1.ProductServices.updateSingleProductInfoIntoDB(productId, zodParsedUpdatedProductData);
        res.status(200).json({
            success: true,
            message: 'Product updated successfully!',
            data: fetchedUpdatedProductInfo,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const fetchedDataFromDeletedProduct = yield products_service_1.ProductServices.deleteProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully!',
            data: fetchedDataFromDeletedProduct,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
});
exports.ProductControllers = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updatedProductInfo,
    deleteProduct,
};
