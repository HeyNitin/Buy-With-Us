import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import WishlistCard from "../Components/WishlistCard";

const Wishlist = () => {
  const { token } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/user/wishlist", {
        headers: { authorization: token }
      });
      setWishlist((wl) => [...res.data.wishlist]);
    })();
  }, [token]);

  return (
    <div className="products-container wishlist-container">
      {wishlist.map((product) => (
        <WishlistCard
          key={product._id}
          setWishlist={setWishlist}
          product={product}
        />
      ))}
    </div>
  );
};

export default Wishlist;
