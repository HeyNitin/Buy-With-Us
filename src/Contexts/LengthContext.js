import { createContext, useContext, useState } from "react";

const lengthContext = createContext();

const LengthProvider = ({ children }) => {
  const [cartLength, setCartLength] = useState(0);
  const [wishlistLength, setWishlistLength] = useState(0);

  return (
    <lengthContext.Provider
      value={{ cartLength, setCartLength, wishlistLength, setWishlistLength }}
    >
      {children}
    </lengthContext.Provider>
  );
};

const useLength = () => useContext(lengthContext);

export { LengthProvider, useLength };
