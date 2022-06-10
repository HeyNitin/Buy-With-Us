import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "../Contexts/AuthContext";
import WishlistCard from "../Components/WishlistCard";
import { NavLink } from "react-router-dom";
import { useDocumentTitle } from "../Hooks/useDocumentTitle";
import { useWishlist } from "../Contexts/WishlistContext";
import { useToast } from "../Components/Toast";

const Wishlist = () => {
  const { token } = useAuth();
  const { wishlist, setWishlist } = useWishlist();
  const { showToast } = useToast();

  useDocumentTitle("Wishlist");

  useEffect(() => {
    token &&
      (async () => {
        try {
          const res = await axios.get("/api/user/wishlist", {
            headers: { authorization: token },
          });
          setWishlist(res.data.wishlist);
        } catch (error) {
          showToast(
            "error",
            "Something went wrong while trying to load wishlist items"
          );
        }
      })();
  }, [token]);

  return (
    <div className="products-container wishlist-container">
      {wishlist.length === 0 && (
        <div className="empty-cart">
          Nothing's in yet. Go to{" "}
          <span>
            <NavLink to={"/products"}>Products</NavLink>
          </span>
        </div>
      )}
      {wishlist.map((product) => (
        <WishlistCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Wishlist;
