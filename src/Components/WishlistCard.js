import { useAuth } from "../Contexts/AuthContext";
import axios from "axios";

const WishlistCard = ({ product, setWishlist }) => {
  const { img, title, price } = product;
  const { token } = useAuth();
  const addToCart = async () => {
    if (token) {
      await axios.post(
        "/api/user/cart",
        { product },
        {
          headers: { authorization: token }
        }
      );
      await axios.delete(`/api/user/wishlist/${product._id}`, {
        headers: { authorization: token }
      });
      removeFromWishlist();
    }
  };

  const removeFromWishlist = async () => {
    await axios.delete(`/api/user/wishlist/${product._id}`, {
      headers: { authorization: token }
    });
    setWishlist((wl) => {
      return wl.filter((data) => data._id !== product._id);
    });
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
          Move to Cart
        </button>
      </footer>
    </div>
  );
};

export default WishlistCard;
