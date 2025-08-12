import express from "express";
import cors from "cors";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./router/userRouter.js";
import productRouter from "./router/productRouter.js";
import cartRouter from "./router/cartRouter.js";
import orderRouter from "./router/orderRouter.js";

const app = express();
//callback of cloudinary
connectCloudinary();
// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/v1/api/product", productRouter);
app.use("/v1/user", userRouter);
app.use("/v1/api/cart", cartRouter);
app.use("/v1/api/order", orderRouter);

export default app;
