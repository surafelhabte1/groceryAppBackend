import { Router, Request, Response } from "express";

import { Order, OrderDetail, OrderProgress } from "../models";

export const orderRoute = Router();

// Get all orders by field
orderRoute.get("/getOrdersBy/:field/:value", async (req: Request, res: Response) => {
  const orders = await Order?.find({
    [req.params.field]: req.params.value,
  }).sort({
    createdAt: "desc",
  });
  res.status(200).json(orders);
});

// Get order detail
orderRoute.get("/getOrderDetail/:parentID", async (req: Request, res: Response) => {
  OrderDetail.aggregate([
    {
      $match: {
        parentID: req.params.parentID,
      },
    },
    {
      $lookup: {
        from: "order",
        localField: "parentID",
        foreignField: "_id",
        as: "order",
      },
    },
    {
      $unwind: "$order",
    },
    {
      $lookup: {
        from: "product",
        localField: "productID",
        foreignField: "_id",
        as: "product",
      },
    },
    {
      $project: {
        productID: -1,
        parentID: -1,
        "order?.userID": -1,
        "order?.vendorID": -1,
        "order?.deliveryAddressID": -1,
      },
    },
    { $sort: { createdAt: -1 } },
  ])
    .then((orders: any) => {
      res.status(200).json(orders);
    })
    .catch((error: any) => res.status(500).json(error));
});

// Get order prgress
orderRoute.get("/getOrderProgress/:orderID", async (req: Request, res: Response) => {
  const progress = await OrderProgress.find({
    orderID: req.params.orderID,
  });
  res.status(200).json(progress);
});

orderRoute.post("/createOrder", async (req: Request, res: Response) => {
  const newOrder = new Order(req.body);
  await newOrder
    .save()
    .then((response: any) => {
      res
        .status(200)
        .json({ status: true, message: "order created successfully" });
    })
    .catch((error: any) => {
      res.status(500).json({ status: false, message: "Error creating order" });
    });
});

orderRoute.post("/updateOrder", async (req: Request, res: Response) => {
  try {
    const { id, updates } = req.body;

    Order?.findByIdAndUpdate(id, updates)
      .then((response: any) => {
        res
          .status(200)
          .json({ status: true, message: "order updated successfully" });
      })
      .catch((error: any) => {
        res
          .status(500)
          .json({ status: false, message: "Error updating order" });
      });
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal server error" });
  }
});

orderRoute.get("/deleteOrder/:id", async (req: Request, res: Response) => {
  try {
    Order?.deleteOne({ _id: req.params.id })
      .then((response: any) => {
        res.status(200).json({ message: "order deleted successfully" });
      })
      .catch((error: any) => {
        res.status(500).json({ message: "Error deleting order" });
      });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Order Progress
orderRoute.post("/createOrderProgress", async (req: Request, res: Response) => {
  const newOrderProgress = new OrderProgress(req.body);
  await newOrderProgress
    .save()
    .then((response: any) => {
      res
        .status(200)
        .json({ status: true, message: "order progress created successfully" });
    })
    .catch((error: any) => {
      res
        .status(500)
        .json({ status: false, message: "Error creating order progress" });
    });
});
