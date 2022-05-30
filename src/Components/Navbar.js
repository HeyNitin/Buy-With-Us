import axios from "axios";
import { useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import { useLength } from "../Contexts/LengthContext";

const Navbar = () => {
  const { token, setToken } = useAuth();
  const Navigate = useNavigate();
  const {
    cartLength,
    setCartLength,
    wishlistLength,
    setWishlistLength
  } = useLength();

  useEffect(() =>
    (async () => {
      try {
        const res = await axios.get("/api/user/wishlist", {
          headers: { authorization: token }
        });
        res && setWishlistLength([...res.data.wishlist].length);
      } catch (error) {}
    })()
  );

  useEffect(() =>
    (async () => {
      try {
        const res = await axios.get("/api/user/cart", {
          headers: { authorization: token }
        });
        res && setCartLength([...res.data.cart].length);
      } catch (error) {}
    })()
  );

  const logoutHandler = () => {
    setToken(false);
    localStorage.removeItem("token");
    Navigate("/");
  };
  return (
    <div>
      <NavLink to="/cart" className={(isActive) => (isActive ? "active" : "")}>
        Cart
      </NavLink>
      <NavLink to="/wishlist">Wishlist</NavLink>
      <NavLink to="/login">Login</NavLink>
      <nav className="nav-header">
        <NavLink to="/" className="logo">
          BuyWithUs
        </NavLink>

        <div className="badge">
          <NavLink to="/wishlist">
            <i className="material-icons">favorite_border</i>
            {token && <span className="notifications">{wishlistLength}</span>}
          </NavLink>
        </div>
        <div className="badge">
          <NavLink to="/cart">
            <i className="material-icons">shopping_cart</i>
            {token && <span className="notifications">{cartLength}</span>}
          </NavLink>
        </div>
        {!token ? (
          <button
            onClick={() => Navigate("/login")}
            className="button btn-link"
          >
            Login
          </button>
        ) : (
          <button onClick={() => logoutHandler()} className="button btn-link">
            Logout
          </button>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
