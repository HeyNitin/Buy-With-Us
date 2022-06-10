import { createContext, useContext, useReducer, useState } from "react";

const cartReducer = (state, action) => {
  switch (action.type) {
    case "EMPTY_CART":
      return {
        totalPrice: 0,
        totalDiscount: 0,
        deliveryCharges: 0,
        finalAmount: 0,
      };

    case "CART_UPDATE":
      const newTotal = action.payload.reduce(
        (total, product) => total + product.qty * product.price,
        0
      );
      const newDiscount = action.payload.reduce(
        (total, product) => total + product.qty * product.discount,
        0
      );
      const newDeliveryCharges = newTotal - newDiscount > 1500 ? 0 : 199;
      return {
        totalPrice: newTotal,
        totalDiscount: newDiscount,
        deliveryCharges: newDeliveryCharges,
        finalAmount: newTotal - newDiscount + newDeliveryCharges,
      };
    default:
      break;
  }
};

const initialValue = {
  totalPrice: 0,
  totalDiscount: 0,
  deliveryCharges: 0,
  finalAmount: 0,
};

const cartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartState, cartDispatch] = useReducer(cartReducer, initialValue);

  return (
    <cartContext.Provider
      value={{
        cartState,
        cartDispatch,
        cart,
        setCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

const useCart = () => useContext(cartContext);

export { CartProvider, useCart };
