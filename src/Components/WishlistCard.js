import { useAuth } from "../Contexts/AuthContext";
import { useCart } from "../Contexts/CartContext";
import { useWishlist } from "../Contexts/WishlistContext";
import axios from "axios";
import { useToast } from "./Toast";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WishlistCard = ({ product }) => {
  const { img, title, price } = product;
  const { token } = useAuth();
  const { cart, setCart } = useCart();
  const { setWishlist } = useWishlist();
  const { showToast } = useToast();

  const [isInCart, setIsInCart] = useState(false);
  let Navigate = useNavigate();

  useEffect(() => {
    for (let item of cart) {
      if (item._id === product._id) {
        setIsInCart(true);
      }
    }
  }, []);

  const addToCart = async () => {
    if (token) {
      if (!isInCart) {
        try {
          const res = await axios.post(
            "/api/user/cart",
            { product },
            {
              headers: { authorization: token },
            }
          );
          setCart(res.data.cart);
          removeFromWishlist(true);
        } catch (error) {
          showToast("error", "Something went wrong trying to add item to cart");
        }
      } else {
        Navigate("/cart");
      }
    }
  };

  const removeFromWishlist = async (toCart = false) => {
    try {
      const res = await axios.delete(`/api/user/wishlist/${product._id}`, {
        headers: { authorization: token },
      });
      setWishlist([...res.data.wishlist]);
      showToast(
        "success",
        `${
          toCart
            ? "Item has been added to Cart"
            : "Item has been removed from Wishlist"
        }`
      );
    } catch (error) {
      showToast(
        "error",
        "Something went wrong while tring to remove item from wishlist"
      );
    }
  };

  return (
    <div className=" card card-basic wishlist">
      <img src={img} alt="main-img" />
      <div className="header">
        <p>{title}</p>
        <p className="heading-sub">₹{price}</p>
      </div>
      <div onClick={() => removeFromWishlist()} className="badge-square">
        <i style={{ color: "red" }} className="fa fa-heart-o material-icons">
          favorite_border
        </i>
      </div>
      <footer className="footer">
        <button onClick={() => addToCart()} className="button btn-primary">
          {isInCart ? "Go to Cart" : "Move to Cart"}
        </button>
      </footer>
    </div>
  );
};

export default WishlistCard;
