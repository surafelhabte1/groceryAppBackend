const enum UserType {
  CLIENT = "client",
  VENDOR = "vendor",
  DRIVER = "driver",
}

interface IUser {
  fullName: String;
  phoneNumber: String;
  type: UserType;
  vendorID: String;
  createdAt: {
    type: Date;
    default: Date;
  };
}
interface IProduct {
  venderID: String;
  title: String;
  category: String;
  description: String;
  caloriesAmount: Number;
  unitOfMeasurment: String;
  createdAt: {
    type: Date;
    default: Date;
  };
}

interface IStock {
  productID: String;
  quantity: String;
  unitPrice: String;
}
interface IProductReview {
  userID: String;
  productID: String;
  rate: Number;
  review: String;
  createdAt: {
    type: Date;
    default: Date;
  };
}
interface IProductFavorite {
  userID: String;
  productID: String;
}
interface IProductCategory {
  title: String;
}
interface IDeliveryAddress {
  userID: String;
  title: String;
  coordinates: String;
}
interface IOrder {
  userID: String;
  vendorID: String;
  deliveryAddressID: String;
  status: String;
  remark: String;
  createdAt: {
    type: Date;
    default: Date;
  };
}
interface IOrderDetail {
  productID: String;
  quantity: String;
  unitPrice: String;
  parentID: String;
}
interface IOrderProgress {
  orderID: String;
  status: String;
  description: String;
  createdAt: {
    type: Date;
    default: Date;
  };
}

export {
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
  UserType
};
