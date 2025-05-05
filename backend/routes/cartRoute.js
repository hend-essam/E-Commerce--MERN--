import express from "express";
import {
  addToCart,
  getUserCart,
  updateCart,
  removeFromCart,
} from "../controller/cartController.js";
import authUser from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.get("/get", authUser, getUserCart);
cartRouter.post("/add", authUser, addToCart);
cartRouter.put("/update", authUser, updateCart);
cartRouter.delete("/remove", authUser, removeFromCart);

export default cartRouter;
