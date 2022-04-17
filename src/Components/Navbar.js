import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

const Navbar = () => {
  const { token, setToken } = useAuth();
  const Navigate = useNavigate();

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
            {token && <span className="notifications">0</span>}
          </NavLink>
        </div>
        <div className="badge">
          <NavLink to="/cart">
            <i className="material-icons">shopping_cart</i>
            {token && <span className="notifications">0</span>}
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
