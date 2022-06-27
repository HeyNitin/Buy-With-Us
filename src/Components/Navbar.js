import axios from "axios";
import { useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import { useCart } from "../Contexts/CartContext";
import { useWishlist } from "../Contexts/WishlistContext";
import { useToast } from "./Toast";

const Navbar = () => {
  const { token, setToken } = useAuth();
  const Navigate = useNavigate();
  const { cart, setCart } = useCart();
  const { wishlist, setWishlist } = useWishlist();
  const { showToast } = useToast();

  useEffect(
    () =>
      token &&
      (async () => {
        try {
          const res = await axios.get("/api/user/wishlist", {
            headers: { authorization: token },
          });
          setWishlist(res.data.wishlist);
        } catch (error) {
          showToast("error", "Something went Wrong while tring to load navbar");
        }
      })(),
    [token]
  );

  useEffect(() => {
    token &&
      (async () => {
        try {
          const res = await axios.get("/api/user/cart", {
            headers: { authorization: token },
          });
          setCart(res.data.cart);
        } catch (error) {
          showToast("error", "Something went Wrong while tring to load navbar");
        }
      })();
  }, [token]);

  const logoutHandler = () => {
    setToken(false);
    localStorage.removeItem("token");
    setCart([]);
    setWishlist([]);
    Navigate("/");
    showToast("success", "You're successfully logged out");
  };

  return (
    <nav className="nav-header">
      <NavLink to="/" className="logo">
        <img src="https://i.postimg.cc/Qt1r4MRC/logo.png" alt="logo" />
      </NavLink>

      <div className="badge">
        <NavLink to="/wishlist">
          <i className="material-icons">favorite_border</i>
          {token && <span className="notifications">{wishlist.length}</span>}
        </NavLink>
      </div>
      <div className="badge">
        <NavLink to="/cart">
          <i className="material-icons">shopping_cart</i>
          {token && <span className="notifications">{cart.length}</span>}
        </NavLink>
      </div>
      {!token ? (
        <button onClick={() => Navigate("/login")} className="button btn-link">
          Login
        </button>
      ) : (
        <button onClick={() => logoutHandler()} className="button btn-link">
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
