import { NavLink } from "react-router-dom";

const Navbar = () => {
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
            <span className="notifications">0</span>
          </NavLink>
        </div>
        <div className="badge">
          <NavLink to="/cart">
            <i className="material-icons">shopping_cart</i>
            <span className="notifications">0</span>
          </NavLink>
        </div>
        <button className="button btn-link">
          <NavLink to="/login">Login</NavLink>
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
