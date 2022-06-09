import { createContext, useContext, useState } from "react";

const wishlistContext = createContext();

const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [wishlistLength, setWishlistLength] = useState([]);

  return (
    <wishlistContext.Provider
      value={{ wishlist, setWishlist, wishlistLength, setWishlistLength }}
    >
      {children}
    </wishlistContext.Provider>
  );
};

const useWishlist = () => useContext(wishlistContext);

export { useWishlist, WishlistProvider };
