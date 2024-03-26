import { Schema, model, connect } from "mongoose";
const mongoose = require("mongoose");

import {
  IUser,
  IProduct,
  IStock,
  IProductReview,
  IProductFavorite,
  IProductCategory,
  IDeliveryAddress,
  IOrder,
  IOrderDetail,
  IOrderProgress,
} from "./interface";

// schemas
const userSchema = new Schema<IUser>({
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  type: { type: String, required: true },
  vendorID: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date,
  },
});

const productSchema = new Schema<IProduct>({
  venderID: { type: String, required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  caloriesAmount: { type: Number, required: true },
  unitOfMeasurment: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date,
  },
});
const stockSchema = new Schema<IStock>({
  productID: { type: String, required: true },
  quantity: { type: String, required: true },
  unitPrice: { type: String, required: true },
});
const productReviewSchema = new Schema<IProductReview>({
  userID: { type: String, required: true },
  productID: { type: String, required: true },
  rate: { type: Number, required: true },
  review: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date,
  },
});
const productFavoriteSchema = new Schema<IProductFavorite>({
  userID: { type: String, required: true },
  productID: { type: String, required: true },
});
const productCategorySchema = new Schema<IProductCategory>({
  title: { type: String, required: true },
});
const deliveryAddressSchema = new Schema<IDeliveryAddress>({
  userID: { type: String, required: true },
  title: { type: String, required: true },
  coordinates: { type: String, required: true },
});
const orderSchema = new Schema<IOrder>({
  userID: { type: String, required: true },
  vendorID: { type: String, required: true },
  deliveryAddressID: { type: String, required: true },
  status: { type: String, required: true },
  remark: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date,
  },
});
const orderDetailSchema = new Schema<IOrderDetail>({
  productID: { type: String, required: true },
  quantity: { type: String, required: true },
  unitPrice: { type: String, required: true },
  parentID: { type: String, required: true },
});
const orderProgressSchema = new Schema<IOrderProgress>({
  orderID: { type: String, required: true },
  status: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date,
  },
});

const User = model<IUser>("User", userSchema);
const Product = model<IProduct>("Product", productSchema);
const Stock = model<IStock>("Stock", stockSchema);
const ProductReview = model<IProductReview>(
  "ProductReview",
  productReviewSchema
);
const ProductFavorite = model<IProductFavorite>(
  "ProductFavorite",
  productFavoriteSchema
);
const ProductCategory = model<IProductCategory>(
  "ProductCategory",
  productCategorySchema
);
const DeliveryAddress = model<IDeliveryAddress>(
  "DeliveryAddress",
  deliveryAddressSchema
);
const Order = model<IOrder>("Order", orderSchema);
const OrderDetail = model<IOrderDetail>("OrderDetail", orderDetailSchema);
const OrderProgress = model<IOrderProgress>(
  "OrderProgress",
  orderProgressSchema
);

export {
  User,
  Product,
  Stock,
  ProductReview,
  ProductFavorite,
  ProductCategory,
  DeliveryAddress,
  Order,
  OrderDetail,
  OrderProgress,
};
