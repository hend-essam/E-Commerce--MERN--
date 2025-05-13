import "./cart-wishlist.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function Cart({ cart, remove, add, handleRemove }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
  });

  const handleCheckout = () => {
    setShowForm(true);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting checkout with:", formData);
    // Send to backend, clear cart, etc.
  };

  return (
    <div className="main-container">
      <div className="border-head">
        <div className="head-cart-wishlist">YOUR SHOPPING CART</div>
      </div>

      {cart.length === 0 ? (
        <div className="no-items">No Items</div>
      ) : (
        <div className="container">
          <ul className="head-product">
            <li>IMAGE</li>
            <li>PRODUCT</li>
            <li>PRICE</li>
            <li>QUANTITY</li>
            <li>REMOVE</li>
          </ul>
          {cart.map((cartItem) => (
            <div key={cartItem._id} className="cart">
              <img
                className="img-cart-wishlist"
                src={cartItem.image}
                alt={cartItem.category}
              />
              <span className="item-name">{cartItem.category}</span>
              <span className="price-cart-wishlist">
                ${cartItem.price * cartItem.quantity}
              </span>
              <div className="quantity">
                <button onClick={() => remove(cartItem)}>-</button>
                <span>{cartItem.quantity}</span>
                <button onClick={() => add(cartItem)}>+</button>
              </div>
              <button
                className="remove-btn"
                onClick={() => handleRemove(cartItem)}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="total-container">
        <p className="total-price">
          Total → <span>$</span>
          {cart.reduce((total, item) => total + item.price * item.quantity, 0)}
        </p>
        {cart.length > 0 && (
          <button className="checkout-btn" onClick={handleCheckout}>
            CHECKOUT
          </button>
        )}
      </div>

      {cart.length === 0 && (
        <button className="shopping-btn">
          <Link to="/catalog">START SHOPPING</Link>
        </button>
      )}

      {/* Checkout Form */}
      {showForm && (
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h3>Checkout Information</h3>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Shipping Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <button type="submit" className="submit-order-btn">
            Submit Order
          </button>
        </form>
      )}
    </div>
  );
}

export default Cart;
