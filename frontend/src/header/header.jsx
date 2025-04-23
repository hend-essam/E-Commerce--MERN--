import "../standerd.css";
import "./header.css";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Header({
  cartLength,
  wishlistLength,
  token,
  setToken,
  setCart,
  setWishlist,
}) {
  const [open, close] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCart([]);
    setWishlist([]);
  };

  return (
    <header>
      <div className="head">
        <div className="logo" onClick={() => navigate("/")}>
          <div className="part-one">
            <span></span>
            <span></span>
          </div>
          <h2>Furniture</h2>
        </div>
        <span
          className="icon"
          onClick={() => {
            close(!open);
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>

      <ul className={` ${open ? "nav-active" : "main-list"}`}>
        <li>
          <NavLink to="/" end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/catalog"> Catalog </NavLink>
        </li>
        <li>
          <NavLink to="/about"> About </NavLink>
        </li>
        <li>
          <NavLink to="/contact"> Contact us </NavLink>
        </li>
      </ul>

      <div className="main-icons">
        <Link to="/login">
          {token === "" ? (
            <i className="fa-solid fa-user">
              <sup></sup>
            </i>
          ) : (
            <span onClick={logout}>Logout</span>
          )}
        </Link>
        <Link to="/wishlist">
          <i className="fa-solid fa-heart">
            <sup>{wishlistLength}</sup>
          </i>
        </Link>
        <Link to="/cart">
          <i className="fa-solid fa-cart-shopping">
            <sup>{cartLength}</sup>
          </i>
        </Link>
      </div>
    </header>
  );
}

export default Header;
