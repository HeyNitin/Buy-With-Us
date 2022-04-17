import { Routes as R, Route } from "react-router-dom";

import Home from "../Pages/Home";
import Cart from "../Pages/Cart";
import Wishlist from "../Pages/Wishlist";
import Signup from "../Pages/Signup";
import Login from "../Pages/Login";
import Products from "../Pages/Products";
import Error404 from "../Pages/Error404";
import RequireAuth from "./RequireAuth";

const Routes = () => {
  return (
    <R>
      <Route path="/" element={<Home />} />
      <Route
        path="/cart"
        element={
          <RequireAuth>
            {" "}
            <Cart />{" "}
          </RequireAuth>
        }
      />
      <Route
        path="/wishlist"
        element={
          <RequireAuth>
            {" "}
            <Wishlist />{" "}
          </RequireAuth>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/products" element={<Products />} />
      <Route path="*" element={<Error404 />} />
    </R>
  );
};

export default Routes;
