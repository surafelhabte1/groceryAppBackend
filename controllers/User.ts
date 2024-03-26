import { Router, Request, Response } from "express";
import { User, DeliveryAddress } from "../models";

export const userRoute = Router();

userRoute.get(
  "/getUserBy/:field/:value",
  async (req: Request, res: Response) => {
    const result = await User?.find({
      [req.params.field]: req.params.value,
    }).sort({
      createdAt: "desc",
    });
    res.status(200).json(result);
  }
);

userRoute.post("/createUser", async (req: Request, res: Response) => {
  const newUser = new User(req.body);
  await newUser
    .save()
    .then((response: any) => {
      res
        .status(200)
        .json({ status: true, message: "user created successfully" });
    })
    .catch((error: any) => {
      res.status(500).json({ status: false, message: "Error creating user" });
    });
});

userRoute.post("/updateUser", async (req: Request, res: Response) => {
  try {
    const { id, updates } = req.body;

    User?.findByIdAndUpdate(id, updates)
      .then((response: any) => {
        res
          .status(200)
          .json({ status: true, message: "user updated successfully" });
      })
      .catch((error: any) => {
        res.status(500).json({ status: false, message: "Error updating user" });
      });
  } catch (error: any) {
    res.status(500).json({ status: false, message: "Internal server error" });
  }
});

userRoute.get("/deleteUser/:id", async (req: Request, res: Response) => {
  try {
    User?.deleteOne({ _id: req.params.id })
      .then((response: any) => {
        res.status(200).json({ message: "user deleted successfully" });
      })
      .catch((error: any) => {
        res.status(500).json({ message: "Error deleting user" });
      });
  } catch (error: any) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// For Delivery address
userRoute.get(
  "/getDeliveryAddress/:userID",
  async (req: Request, res: Response) => {
    const address = await DeliveryAddress.find({
      userID: req.params.userID,
    }).sort({
      createdAt: "desc",
    });
    res.status(200).json(address);
  }
);

userRoute.post(
  "/createDeliveryAddress",
  async (req: Request, res: Response) => {
    const deliveryAddress = new DeliveryAddress(req.body);
    await deliveryAddress
      .save()
      .then((response: any) => {
        res
          .status(200)
          .json({ status: true, message: "address created successfully" });
      })
      .catch((error: any) => {
        res
          .status(500)
          .json({ status: false, message: "Error creating address" });
      });
  }
);

userRoute.post(
  "/updateDeliveryAddress",
  async (req: Request, res: Response) => {
    try {
      const { id, updates } = req.body;

      DeliveryAddress.findByIdAndUpdate(id, updates)
        .then((response: any) => {
          res
            .status(200)
            .json({ status: true, message: "address updated successfully" });
        })
        .catch((error: any) => {
          res
            .status(500)
            .json({ status: false, message: "Error updating address" });
        });
    } catch (error: any) {
      res.status(500).json({ status: false, message: "Internal server error" });
    }
  }
);

userRoute.get(
  "/deleteDeliveryAddress/:id",
  async (req: Request, res: Response) => {
    try {
      DeliveryAddress.deleteOne({ _id: req.params.id })
        .then((response: any) => {
          res.status(200).json({ message: "address deleted successfully" });
        })
        .catch((error: any) => {
          res.status(500).json({ message: "Error deleting address" });
        });
    } catch (error: any) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);
