import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";

const ORDER_STATUSES = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

const placeOrder = async (req, res) => {
  try {
    const { userId, address, fullName } = req.body;

    if (!address || !fullName) {
      return res.json({ success: false, message: "Missing order details" });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const cartData = user.cartData || [];

    if (cartData.length === 0) {
      return res.json({ success: false, message: "Cart is empty" });
    }

    const productIds = cartData.map((item) => item.itemId);
    const products = await productModel
      .find({ _id: { $in: productIds } })
      .lean();

    const productMap = products.reduce((acc, product) => {
      acc[product._id.toString()] = product;
      return acc;
    }, {});

    const items = cartData
      .map(({ itemId, quantity }) => {
        const product = productMap[itemId];
        if (!product) return null;
        return {
          productId: product._id,
          name: product.name,
          image: Array.isArray(product.image) ? product.image[0] : product.image,
          price: product.price,
          quantity,
          category: product.category,
        };
      })
      .filter(Boolean);

    if (items.length === 0) {
      return res.json({
        success: false,
        message: "No valid products found in cart",
      });
    }

    const amount = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const order = await orderModel.create({
      userId,
      items,
      amount,
      address,
      fullName,
    });

    user.cartData = [];
    await user.save();

    res.json({ success: true, message: "Order placed successfully", order });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find().sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.json({ success: false, message: "Order ID and status required" });
    }

    if (!ORDER_STATUSES.includes(status)) {
      return res.json({ success: false, message: "Invalid status" });
    }

    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, message: "Order status updated", order });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await orderModel.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { placeOrder, listOrders, updateOrderStatus, getUserOrders };
