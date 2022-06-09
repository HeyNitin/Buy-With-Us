import { useAuth } from "../Contexts/AuthContext";
import { useCart } from "../Contexts/CartContext";
import { useWishlist } from "../Contexts/WishlistContext";
import axios from "axios";
import { useToast } from "./Toast";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CartCard = ({ product }) => {
  const { img, title, price, discount } = product;
  const { token } = useAuth();
  const { setCart } = useCart();
  const { wishlist, setWishlist } = useWishlist();
  const { showToast } = useToast();
  let Navigate = useNavigate();

  const [isInWishList, setIsInWishlist] = useState(false);

  useEffect(() => {
    for (let item of wishlist) {
      if (item._id === product._id) {
        setIsInWishlist(true);
      }
    }
  }, []);

  const addToWishlist = async () => {
    if (token) {
      if (!isInWishList) {
        try {
          const res = await axios.post(
            "/api/user/wishlist",
            { product },
            {
              headers: { authorization: token },
            }
          );
          setWishlist(res.data.wishlist);
          removeFromCart(true);
        } catch (error) {
          showToast(
            "error",
            "something went wrong while trying to add item to wishlist"
          );
        }
      } else {
        Navigate("/wishlist");
      }
    }
  };

  const removeFromCart = async (fromWishlist = false) => {
    try {
      const res = await axios.delete(`/api/user/cart/${product._id}`, {
        headers: { authorization: token },
      });
      setCart([...res.data.cart]);
      showToast(
        "success",
        `${
          fromWishlist
            ? "Item has been moved to Wishlist"
            : "Item has been removed from cart"
        }`
      );
    } catch {
      showToast(
        "error",
        "Something went wrong while trying to remove item from cart"
      );
    }
  };

  const increaseQuantity = async () => {
    try {
      const res = await axios.post(
        `/api/user/cart/${product._id}`,
        { action: { type: "increment" } },
        {
          headers: { authorization: token },
        }
      );
      setCart([...res.data.cart]);
    } catch (error) {
      showToast(
        "error",
        "Something went Wrong while trying to increase the quantity"
      );
    }
  };
  const decreaseQuantity = async () => {
    if (product.qty === 1) {
      try {
        const res = await axios.delete(`/api/user/cart/${product._id}`, {
          headers: { authorization: token },
        });
        setCart([...res.data.cart]);
        showToast("success", "Item has been removed from cart");
      } catch (error) {
        showToast(
          "error",
          "Something went wrong while tring to remove the item from cart"
        );
      }
    }

    try {
      const res = await axios.post(
        `/api/user/cart/${product._id}`,
        { action: { type: "decrement" } },
        {
          headers: { authorization: token },
        }
      );
      setCart([...res.data.cart]);
    } catch (error) {
      showToast(
        "error",
        "Something went wrong while tring to decreasse the quantity"
      );
    }
  };

  return (
    <div className="card card-horizental">
      <img src={img} alt="main-img" />

      <div className="content">
        <div className="header">
          <p>{title}</p>
          <p className="heading-sub final-price">₹{price - discount} </p>
          <p className="text-grey mrp">₹{price}</p>
          <p className="text-grey"> {~~((discount * 100) / price)}% off</p>
          <div className="quantity">
            <p>Quantity</p>
            <button
              className="button quantity-d"
              onClick={() => {
                decreaseQuantity();
              }}
            >
              -
            </button>
            <input placeholder={product.qty} />
            <button
              className="button quantity-i"
              onClick={() => increaseQuantity()}
            >
              +
            </button>
          </div>
        </div>
        <footer className="footer">
          <button className="button" onClick={() => removeFromCart()}>
            Remove from Cart
          </button>
          <button className="button" onClick={() => addToWishlist()}>
            {isInWishList ? "Go to Wishlist" : "Move to Wishlist"}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default CartCard;
