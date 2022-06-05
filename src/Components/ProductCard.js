import axios from "axios";
import { useAuth } from "../Contexts/AuthContext";
import { useLength } from "../Contexts/LengthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const { title, price, img, rating } = product;
  const { token } = useAuth();
  const Navigate = useNavigate();
  const { setWishlistLength, setCartLength } = useLength();
  const [inCart, setInCart] = useState(false);
  const [inWishList, setInWishList] = useState(false);

  const addToCart = async () => {
    if (token) {
      if (!inCart) {
        const res = await axios.post(
          "/api/user/cart",
          { product },
          {
            headers: { authorization: token },
          }
        );
        setCartLength(res.data.cart.length);
      } else {
        Navigate("/cart");
      }
      setInCart((val) => !val);
    } else {
      Navigate("/login");
    }
  };

  const addToWishlist = async () => {
    if (token) {
      const res = await axios.post(
        "/api/user/wishlist",
        { product },
        {
          headers: { authorization: token },
        }
      );
      setWishlistLength(res.data.wishlist.length);
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
