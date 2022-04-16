import { Routes as R, Route } from "react-router-dom";

import Home from "../Pages/Home";
import Cart from "../Pages/Cart";
import Wishlist from "../Pages/Wishlist";
import Signup from "../Pages/Signup";
import Login from "../Pages/Login";
import Logout from "../Pages/Logout";
import Products from "../Pages/Products";

const Routes = () => {
  return (
    <R>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/products" element={<Products />} />
      <Route path="*" element={<div>Error 404</div>} />
    </R>
  );
};

export default Routes;
