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
exports.OrderControllers = void 0;
const orders_service_1 = require("./orders.service");
const products_model_1 = require("../products/products.model");
const orders_validation_1 = __importDefault(require("./orders.validation"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order } = req.body;
        const zodParsedOrderData = orders_validation_1.default.parse(order);
        const { productId, quantity } = zodParsedOrderData;
        const product = yield products_model_1.ProductModel.findById(productId);
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
        yield product.save();
        const createdOrderInfo = yield orders_service_1.OrderServices.createOrderIntoDB(order);
        res.status(200).json({
            success: true,
            message: 'Order created successfully!',
            data: createdOrderInfo,
        });
    }
    catch (error) {
        console.log(error);
    }
});
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.query;
        let allFetchedData;
        if (email) {
            allFetchedData = yield orders_service_1.OrderServices.filteredOrdersInfo(email);
            res.status(200).json({
                success: true,
                message: 'Orders fetched successfully for user email!',
                data: allFetchedData,
            });
        }
        else {
            allFetchedData = yield orders_service_1.OrderServices.getAllOrdersFromDB();
            res.status(200).json({
                success: true,
                message: 'Orders fetched successfully!',
                data: allFetchedData,
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.OrderControllers = {
    createOrder,
    getAllOrders,
};
