import express from "express";
import {
  allOrders,
  placeOrder,
  updateStatus,
  userORders,
} from "../controllers/orderControllers.js";
import { adminAUth } from "../middlewares/adminAuth.js";
import authUser from "../middlewares/auth.js";

const orderRouter = express.Router();

//admin features
orderRouter.post("/list", adminAUth, allOrders);
orderRouter.post("/status", adminAUth, updateStatus);

//payment features

orderRouter.post("/place", authUser, placeOrder);

//user features
orderRouter.post("/userorders", authUser, userORders);

export default orderRouter;
