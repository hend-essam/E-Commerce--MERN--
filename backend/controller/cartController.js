import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || [];

    const itemIndex = cartData.findIndex((item) => item.itemId === itemId);

    if (itemIndex > -1) {
      cartData[itemIndex].quantity += 1;
    } else {
      cartData.push({ itemId, quantity: 1 });
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const { userId, itemId, quantity } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || [];

    const itemIndex = cartData.findIndex((item) => item.itemId === itemId);

    if (itemIndex > -1) {
      if (quantity === 0) {
        cartData.splice(itemIndex, 1);
      } else {
        cartData[itemIndex].quantity = quantity;
      }
    } else if (quantity > 0) {
      cartData.push({ itemId, quantity });
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({
      success: true,
      message: quantity === 0 ? "Item removed from cart" : "Cart updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);
    const cartData = userData.cartData || [];

    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || [];

    cartData = cartData.filter((item) => item.itemId !== itemId);
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart, removeFromCart };
