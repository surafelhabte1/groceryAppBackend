import { Router, Request, Response } from "express";

import {
  Product,
  ProductReview,
  ProductCategory,
  ProductFavorite,
} from "../models";

export const productRoute = Router();

// Get all products
productRoute.get("/getAllProducts", async (req: Request, res: Response) => {
  const products = await Product?.find().sort({ createdAt: "desc" });
  res.status(200).json(products);

  // Product.aggregate([
  //   {
  //     $match: {},
  //   },
  //   {
  //     $lookup: {
  //       from: "stock",
  //       localField: "_id",
  //       foreignField: "productID",
  //       as: "stock",
  //     },
  //   },
  //   {
  //     $unwind: "$stock",
  //   },
  //   {
  //     $project: {
  //       "stock?.productID": -1,
  //     },
  //   },
  //   { $sort: { createdAt: -1 } },
  // ])
  //   .then((products: any) => {
  //     res.status(200).json(products);
  //   })
  //   .catch((error: any) => res.status(500).json(error));
});

// Get all product by field
productRoute.get(
  "/getProductsBy/:field/:value",
  async (req: Request, res: Response) => {
    const products = await Product?.find({
      [req.params.field]: req.params.value,
    }).sort({
      createdAt: "desc",
    });
    res.status(200).json(products);
  }
);

// Get all product review
productRoute.get(
  "/getProductReviews/:productID",
  async (req: Request, res: Response) => {
    ProductReview.aggregate([
      {
        $match: {
          productID: req.params.productID,
        },
      },
      {
        $lookup: {
          from: "user",
          localField: "userID",
          foreignField: "id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          "user.fullName": 1,
          "user._id": -1,
          _id: -1,
          productID: -1,
          userID: -1,
        },
      },
      { $sort: { createdAt: -1 } },
    ])
      .then((reviews: any) => {
        res.status(200).json(reviews);
      })
      .catch((error: any) => res.status(500).json(error));
  }
);

productRoute.get(
  "/getAllProductCategory",
  async (req: Request, res: Response) => {
    const category = await ProductCategory.find().sort({ createdAt: "desc" });
    res.status(200).json(category);
  }
);

// For Vendor ONLY
productRoute.post("/createProduct", async (req: Request, res: Response) => {
  // const body: Product = req.body;
  const newProduct = new Product(req.body);
  await newProduct
    .save()
    .then((response: any) => {
      res
        .status(200)
        .json({ status: true, message: "product created successfully" });
    })
    .catch((error: any) => {
      res
        .status(500)
        .json({ status: false, message: "Error creating product" });
    });
});

productRoute.post("/updateProduct", async (req: Request, res: Response) => {
  try {
    const { id, updates } = req.body;

    Product?.findByIdAndUpdate(id, updates)
      .then((response: any) => {
        res
          .status(200)
          .json({ status: true, message: "product updated successfully" });
      })
      .catch((error: any) => {
        res
          .status(500)
          .json({ status: false, message: "Error updating product" });
      });
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal server error" });
  }
});

productRoute.get("/deleteProduct/:id", async (req: Request, res: Response) => {
  try {
    Product?.deleteOne({ _id: req.params.id })
      .then((response: any) => {
        res
          .status(200)
          .json({ status: true, message: "product deleted successfully" });
      })
      .catch((error: any) => {
        res
          .status(500)
          .json({ status: false, message: "Error deleting product" });
      });
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal server error" });
  }
});

// Product Review
productRoute.post(
  "/createProductReview",
  async (req: Request, res: Response) => {
    const newProductReview = new ProductReview(req.body);
    await newProductReview
      .save()
      .then((response: any) => {
        res.status(200).json({
          status: true,
          message: "product review created successfully",
        });
      })
      .catch((error: any) => {
        res
          .status(500)
          .json({ status: false, message: "Error creating product review" });
      });
  }
);

productRoute.post(
  "/updateProductReview",
  async (req: Request, res: Response) => {
    try {
      const { id, updates } = req.body;

      ProductReview.findByIdAndUpdate(id, updates)
        .then((response: any) => {
          res.status(200).json({
            status: true,
            message: "product review updated successfully",
          });
        })
        .catch((error: any) => {
          res
            .status(500)
            .json({ status: false, message: "Error updating product review" });
        });
    } catch (error) {
      res.status(500).json({ status: false, message: "Internal server error" });
    }
  }
);

productRoute.get(
  "/deleteProductReview/:id",
  async (req: Request, res: Response) => {
    try {
      ProductReview.deleteOne({ _id: req.params.id })
        .then((response: any) => {
          res
            .status(200)
            .json({ message: "product review deleted successfully" });
        })
        .catch((error: any) => {
          res.status(500).json({ message: "Error deleting product review" });
        });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// Product Favorite
productRoute.post(
  "/createProductFavorite",
  async (req: Request, res: Response) => {
    const newProductFavorite = new ProductFavorite(req.body);
    await newProductFavorite
      .save()
      .then((response: any) => {
        res.status(200).json({
          status: true,
          message: "product favorite created successfully",
        });
      })
      .catch((error: any) => {
        res
          .status(500)
          .json({ status: false, message: "Error creating product favorite" });
      });
  }
);

productRoute.get(
  "/deleteProductFavorite/:id",
  async (req: Request, res: Response) => {
    try {
      ProductFavorite.deleteOne({ _id: req.params.id })
        .then((response: any) => {
          res
            .status(200)
            .json({ message: "product favorite deleted successfully" });
        })
        .catch((error: any) => {
          res.status(500).json({ message: "Error deleting product favorite" });
        });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);
