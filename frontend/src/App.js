import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./header/header";
import Home from "./home/home";
import Catalog from "./catalog/catalog";
import About from "./about/about";
import Contact from "./contact/contact";
import Cart from "./cart-wishList/cart";
import Wishlist from "./cart-wishList/wishlist";
import Login from "./login/login";
import Footer from "./footer/footer";
import ScrollToTOP from "./scroll-to-top";
import { useState, useMemo, useEffect } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const getProductsData = async () => {
    try {
      const res = await axios.get(backendUrl + "/api/product/list");
      if (res.data.success) {
        setProducts(res.data.products);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  const updateCartQuantity = (product, quantityChange) => {
    const productExist = cart.find((item) => item._id === product._id);
    products.find((item) => item._id === product._id).inCart = true;
    if (productExist) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? {
                ...productExist,
                quantity: productExist.quantity + quantityChange,
              }
            : item
        )
      );
    } else if (quantityChange > 0) {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleAdd = (product) => updateCartQuantity(product, 1);
  const decreaseQuantity = (product) => updateCartQuantity(product, -1);

  const handleRemove = (product) => {
    products.find((item) => item._id === product._id).inCart = false;
    setCart(cart.filter((products) => products._id !== product._id));
  };

  const addWishlist = (product) => {
    const productExist = wishlist.find((item) => item._id === product._id);
    products.find((item) => item._id === product._id).inWishlist = true;
    if (productExist) {
      setWishlist(
        wishlist.map((item) =>
          item.id === product._id ? { ...productExist } : item
        )
      );
    } else {
      setWishlist([...wishlist, { ...product }]);
    }
  };

  const removeWishlist = (product) => {
    products.find((item) => item._id === product._id).inWishlist = false;
    setWishlist(wishlist.filter((products) => products._id !== product._id));
  };

  const updatedItems = useMemo(() => {
    return products.map((ele) => ({
      ...ele,
      inCart: cart.some((item) => item._id === ele._id),
      inWishlist: wishlist.some((item) => item._id === ele._id),
    }));
  }, [cart, wishlist, products]);

  return (
    <>
      <BrowserRouter>
        <Header cartLength={cart.length} wishlistLength={wishlist.length} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                products={products}
                handleAdd={handleAdd}
                addWishlist={addWishlist}
              />
            }
          />
          <Route
            path="/catalog"
            element={
              <Catalog
                products={products}
                items={updatedItems}
                handleAdd={handleAdd}
                addWishlist={addWishlist}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                handleAdd={handleAdd}
                remove={decreaseQuantity}
                add={handleAdd}
                handleRemove={handleRemove}
              />
            }
          />
          <Route
            path="/wishlist"
            element={
              <Wishlist
                wishlist={wishlist}
                addWishlist={addWishlist}
                handleAdd={handleAdd}
                removeWishlist={removeWishlist}
              />
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
        <ScrollToTOP />
      </BrowserRouter>
    </>
  );
}

export default App;
