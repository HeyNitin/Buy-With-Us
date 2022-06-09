import { useAuth } from "../Contexts/AuthContext";
import { useWishlist } from "../Contexts/WishlistContext";
import axios from "axios";
import { useToast } from "./Toast";

const WishlistCard = ({ product, setWishlist }) => {
  const { img, title, price } = product;
  const { token } = useAuth();
  const { setWishlistLength } = useWishlist();
  const { showToast } = useToast();

  const addToCart = async () => {
    if (token) {
      try {
        await axios.post(
          "/api/user/cart",
          { product },
          {
            headers: { authorization: token },
          }
        );
        removeFromWishlist(SVGComponentTransferFunctionElement);
      } catch (error) {
        showToast("error", "Something went wrong");
      }
    }
  };

  const removeFromWishlist = async (toCart = false) => {
    try {
      const res = await axios.delete(`/api/user/wishlist/${product._id}`, {
        headers: { authorization: token },
      });
      setWishlist([...res.data.wishlist]);
      setWishlistLength(res.data.wishlist.length);
      showToast(
        "success",
        `${
          toCart
            ? "Item has been added to Cart"
            : "Item has been removed from Wishlist"
        }`
      );
    } catch (error) {
      showToast("error", "Something went wrong");
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
          Move to Cart
        </button>
      </footer>
    </div>
  );
};

export default WishlistCard;
