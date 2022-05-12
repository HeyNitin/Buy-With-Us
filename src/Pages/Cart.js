import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import CartCard from "../Components/CartCard";

const cartReducer = (state, dispatch) => {
  const newTotal = dispatch.payload.reduce(
    (total, product) => total + product.qty * product.price,
    0
  );
  const newDiscount = dispatch.payload.reduce(
    (total, product) => total + product.qty * product.discount,
    0
  );
  const newDeliveryCharges = newTotal - newDiscount > 1500 ? 0 : 199;
  return {
    totalPrice: newTotal,
    totalDiscount: newDiscount,
    deliveryCharges: newDeliveryCharges,
    finalAmount: newTotal - newDiscount + newDeliveryCharges
  };
};

const initialValue = {
  totalPrice: 0,
  totalDiscount: 0,
  deliveryCharges: 0,
  finalAmount: 0
};

const Cart = () => {
  const { token } = useAuth();
  const [cart, setCart] = useState([]);
  const [state, dispatch] = useReducer(cartReducer, initialValue);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/api/user/cart", {
          headers: { authorization: token }
        });
        setCart([...res.data.cart]);
        [...res.data.cart].length > 0 &&
          dispatch({ payload: [...res.data.cart] });
      } catch (error) {}
    })();
  }, [token, cart]);

  return (
    <div className="cart-container">
      <div className="heading-sub text-centered">MY CART</div>
      <div className="cart-products">
        {cart.map((product) => (
          <CartCard key={product._id} setCart={setCart} product={product} />
        ))}
      </div>
      <div className="card card-text-only checkout-box">
        <div>
          <p className="heading-sub">Price Details</p>
        </div>
        <div>
          <p>Price</p> <p>{state.totalPrice}</p>
        </div>
        <div>
          <p>Discount</p> <p>{state.totalDiscount}</p>
        </div>
        <div>
          <p>Delivery Charges</p> <p>{state.deliveryCharges}</p>
        </div>
        <div>
          <p className="heading-sub">Total Amount</p>{" "}
          <p className="heading-sub">{state.finalAmount}</p>
        </div>

        <p>You will save {state.totalDiscount} on this order</p>
        <button className="button" onClick={() => {}}>
          Place My Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
