import express, { Request, Response } from "express";
import mongoose, { connect, Connection } from "mongoose";
import dotenv from "dotenv";
import { json } from "body-parser";

import { orderRoute } from "../controllers/Order";
import { productRoute } from "../controllers/Product";
import { userRoute } from "../controllers/User";

export const routes = express.Router();

dotenv.config();

const port: any = process.env.PORT || 3000;
const uri: any = process.env.MONGODB_URI;

mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err: any) => console.error(err));

const app = express();
app.use(json());

routes.use(orderRoute);
routes.use(productRoute);
routes.use(userRoute);

app.use("/", routes);

app.listen(port, () => console.log(`Server listening on port ${port}`));
