import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { useCart } from "../Contexts/CartContext";
import CartCard from "../Components/CartCard";
import { NavLink } from "react-router-dom";
import { useToast } from "../Components/Toast";
import { useDocumentTitle } from "../Hooks/useDocumentTitle";

const Cart = () => {
  const { token } = useAuth();
  const { cart, setCart, cartState, cartDispatch } = useCart();
  const { showToast } = useToast();

  useDocumentTitle("Cart");

  useEffect(() => {
    token &&
      (async () => {
        try {
          const res = await axios.get("/api/user/cart", {
            headers: { authorization: token },
          });
          setCart([...res.data.cart]);
        } catch (error) {
          showToast("error", "Something went wrong while loading cart items");
        }
      })();
  }, []);

  useEffect(
    () =>
      cart.length > 0
        ? cartDispatch({ type: "CART_UPDATE", payload: cart })
        : cartDispatch({ type: "EMPTY_CART", payload: [] }),
    [cart]
  );

  return (
    <div className="cart-container">
      <div className="heading-sub text-centered">MY CART</div>
      {cart.length === 0 && (
        <div className="empty-cart">
          Nothing's in yet. Go to{" "}
          <span>
            <NavLink to={"/products"}>Products</NavLink>
          </span>
        </div>
      )}
      <div className="cart-products">
        {cart.map((product) => (
          <CartCard key={product._id} product={product} />
        ))}
      </div>
      <div className="card card-text-only checkout-box">
        <div>
          <p className="heading-sub">Price Details</p>
        </div>
        <div>
          <p>Price</p> <p>{cartState.totalPrice}</p>
        </div>
        <div>
          <p>Discount</p> <p>{cartState.totalDiscount}</p>
        </div>
        <div>
          <p>Delivery Charges</p> <p>{cartState.deliveryCharges}</p>
        </div>
        <div>
          <p className="heading-sub">Total Amount</p>{" "}
          <p className="heading-sub">{cartState.finalAmount}</p>
        </div>
        <p>You will save {cartState.totalDiscount} on this order</p>
        <button
          className="button"
          disabled={!cartState.finalAmount}
          onClick={() => {
            showToast("info", "This feature will be available soon");
          }}
        >
          Place My Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
