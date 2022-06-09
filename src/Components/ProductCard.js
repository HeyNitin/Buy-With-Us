import axios from "axios";
import { useAuth } from "../Contexts/AuthContext";
import { useCart } from "../Contexts/CartContext";
import { useWishlist } from "../Contexts/WishlistContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "./Toast";

const ProductCard = ({ product }) => {
  const { title, price, img, rating } = product;
  const { token } = useAuth();
  const Navigate = useNavigate();
  const { setCartLength } = useCart();
  const { setWishlistLength } = useWishlist();
  const [inCart, setInCart] = useState(false);
  const [inWishList, setInWishList] = useState(false);
  const { showToast } = useToast();

  const addToCart = async () => {
    if (token) {
      if (!inCart) {
        try {
          const res = await axios.post(
            "/api/user/cart",
            { product },
            {
              headers: { authorization: token },
            }
          );
          setCartLength(res.data.cart.length);
          showToast("success", "Item has been added to Cart");
        } catch (error) {
          showToast("error", "Something went wrong");
        }
      } else if (inCart) {
        Navigate("/cart");
      }
      setInCart((val) => !val);
    } else {
      Navigate("/login");
    }
  };

  const addToWishlist = async () => {
    if (token) {
      if (!inWishList) {
        try {
          const res = await axios.post(
            "/api/user/wishlist",
            { product },
            {
              headers: { authorization: token },
            }
          );

          res.status === 201 &&
            (setWishlistLength(res.data.wishlist.length),
            showToast("success", "Item has been added to Wishlist"));
          res.status === 200 &&
            showToast("info", "Item already present in Wishlist");
        } catch (error) {
          showToast("error", "Something went wrong");
        }
      } else {
        try {
          const res = await axios.delete(`/api/user/wishlist/${product._id}`, {
            headers: { authorization: token },
          });
          setWishlistLength(res.data.wishlist.length);
          showToast("success", "Item has been removed from Wishlist");
        } catch (error) {
          showToast("error", "Something went wrong");
        }
      }
      setInWishList((val) => !val);
    } else {
      Navigate("/login");
    }
  };

  return (
    <div className=" card card-basic">
      <img src={img} alt="main-img" />
      <div className="header">
        <p>{title}</p>
        <p className="heading-sub">₹{price}</p>
        <p>Ratings - {rating}/5</p>
      </div>
      <div onClick={() => addToWishlist()} className="badge-square">
        <i
          style={{ color: inWishList ? "red" : "black" }}
          className="fa fa-heart-o material-icons"
        >
          favorite_border
        </i>
      </div>
      <footer className="footer">
        <button onClick={() => addToCart()} className="button btn-primary">
          {inCart ? "Go to Cart" : "Add to Cart"}
        </button>
      </footer>
    </div>
  );
};

export default ProductCard;
