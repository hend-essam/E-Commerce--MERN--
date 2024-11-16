import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

const addProduct = async (req, res) => {
  try {
    const { name, price, category, bestseller } = req.body;
    const image = req.files.image && req.files.image[0];

    let result = await cloudinary.uploader.upload(image.path, {
      resource_type: "image",
    });
    let imageUrl = result.secure_url;

    const productData = {
      name,
      category,
      price: Number(price),
      bestseller: bestseller === "true" ? true : false,
      image: imageUrl,
    };

    console.log(productData);
    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "product added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product Remove" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, listProducts, removeProduct, singleProduct };
