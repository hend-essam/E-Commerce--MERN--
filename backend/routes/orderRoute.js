import express from "express";
import {
  placeOrder,
  listOrders,
  updateOrderStatus,
  getUserOrders,
} from "../controller/orderController.js";
import authUser from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";

const orderRouter = express.Router();

// customer endpoints
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/user", authUser, getUserOrders);

// admin endpoints
orderRouter.get("/list", adminAuth, listOrders);
orderRouter.put("/status", adminAuth, updateOrderStatus);

export default orderRouter;
