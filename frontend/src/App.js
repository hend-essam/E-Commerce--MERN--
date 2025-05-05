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
  const [token, setToken] = useState("");

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const getProductsData = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/product/list`);
      if (res.data.success) {
        setProducts(res.data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const getCartData = async () => {
    try {
      if (!token) return;
      const res = await axios.get(`${backendUrl}/api/cart/get`, {
        headers: { token },
      });
      if (res.data.success) {
        console.log(res.data.cartData);
        setCart(res.data.cartData);
        const backendCart = res.data.cartData;
        const enrichedCart = backendCart

          .map((cartItem) => {
            const product = products.find((p) => p._id === cartItem.itemId);
            return product ? { ...product, quantity: cartItem.quantity } : null;
          })
          .filter(Boolean);

        setCart(enrichedCart);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!token && storedToken) {
      setToken(storedToken);
    }
  }, [token]);

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (token && products.length > 0) {
      getCartData();
    }
  }, [token, products]);

  const updateCartQuantity = async (product, quantityChange) => {
    const existingProduct = cart.find((item) => item._id === product._id);

    try {
      if (token) {
        if (!existingProduct && quantityChange > 0) {
          await axios.post(
            `${backendUrl}/api/cart/add`,
            {
              itemId: product._id,
              quantity: 1,
            },
            { headers: { token } }
          );
        } else if (existingProduct) {
          await axios.put(
            `${backendUrl}/api/cart/update`,
            {
              itemId: product._id,
              quantity: existingProduct.quantity + quantityChange,
            },
            { headers: { token } }
          );
        }
      }

      setCart((prevCart) => {
        if (existingProduct) {
          const newQuantity = existingProduct.quantity + quantityChange;
          if (newQuantity <= 0) {
            return prevCart.filter((item) => item._id !== product._id);
          }
          return prevCart.map((item) =>
            item._id === product._id ? { ...item, quantity: newQuantity } : item
          );
        } else if (quantityChange > 0) {
          return [...prevCart, { ...product, quantity: 1 }];
        }
        return prevCart;
      });
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const handleAdd = (product) => updateCartQuantity(product, 1);
  const decreaseQuantity = (product) => updateCartQuantity(product, -1);

  const handleRemove = async (product) => {
    try {
      if (token) {
        await axios.delete(`${backendUrl}/api/cart/remove`, {
          data: {
            userId: token,
            itemId: product._id,
          },
          headers: { token },
        });
      }
      setCart((prevCart) =>
        prevCart.filter((item) => item._id !== product._id)
      );
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const addWishlist = (product) => {
    const exists = wishlist.find((item) => item._id === product._id);
    if (!exists) {
      setWishlist([...wishlist, { ...product }]);
    }
  };

  const removeWishlist = (product) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item._id !== product._id)
    );
  };

  const updatedItems = useMemo(() => {
    return products.map((product) => ({
      ...product,
      inCart: cart.some((item) => item._id === product._id),
      inWishlist: wishlist.some((item) => item._id === product._id),
    }));
  }, [products, cart, wishlist]);

  return (
    <BrowserRouter>
      <Header
        cartLength={cart.length}
        wishlistLength={wishlist.length}
        token={token}
        setToken={setToken}
        setCart={setCart}
        setWishlist={setWishlist}
      />
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
        <Route
          path="/login"
          element={
            <Login token={token} setToken={setToken} backendUrl={backendUrl} />
          }
        />
      </Routes>
      <Footer />
      <ScrollToTOP />
    </BrowserRouter>
  );
}

export default App;
