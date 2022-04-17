import axios from "axios";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { title, price, img, rating } = product;
  const { token } = useAuth();
  const Navigate = useNavigate();

  const addToCart = async () => {
    if (token) {
      await axios.post(
        "/api/user/cart",
        { product },
        {
          headers: { authorization: token }
        }
      );
    } else {
      Navigate("/login");
    }
  };

  const addToWishlist = async () => {
    if (token) {
      await axios.post(
        "/api/user/wishlist",
        { product },
        {
          headers: { authorization: token }
        }
      );
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
        <i style={{ color: "black" }} className="fa fa-heart-o material-icons">
          favorite_border
        </i>
      </div>
      <footer className="footer">
        <button onClick={() => addToCart()} className="button btn-primary">
          Add to Cart
        </button>
      </footer>
    </div>
  );
};

export default ProductCard;
