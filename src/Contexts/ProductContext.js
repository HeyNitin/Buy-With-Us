import { createContext, useContext, useReducer } from "react";

const productReducer = (state, action) => {
  switch (action.type) {
    case "Men Clothing":
      return { ...state, isMenClothing: action.payload };
    case "Women Clothing":
      return { ...state, isWomenClothing: action.payload };
    case "Kids Clothing":
      return { ...state, isKidsClothing: action.payload };
    case "Ethnic Wears":
      return { ...state, isEthnicWears: action.payload };
    case "Traditional Clothing":
      return { ...state, isTraditionalClothing: action.payload };
    case "Newly Launched":
      return { ...state, isNewlyLaunched: action.payload };
    case "Summer Collection":
      return { ...state, isSummerCollection: action.payload };
    case "Winter Collection":
      return { ...state, isWinterCollection: action.payload };
    case "Rating":
      return {
        ...state,
        rating: action.payload,
        ratingChecked: [...state.ratingChecked].map((item, index) =>
          index === action.payload - 1 ? true : false
        ),
      };
    case "highLow":
      return {
        ...state,
        allProducts: state.allProducts.sort((a, b) => b.price - a.price),
        priceChecked: [false, true],
      };
    case "lowHigh":
      return {
        ...state,
        allProducts: state.allProducts.sort((a, b) => a.price - b.price),
        priceChecked: [true, false],
      };
    case "setProducts":
      return {
        ...state,
        allProducts: action.payload,
      };

    case "Clear":
      return {
        ...state,
        isMenClothing: false,
        isWomenClothing: false,
        isKidsClothing: false,
        isEthnicWears: false,
        isTraditionalClothing: false,
        isNewlyLaunched: false,
        isSummerCollection: false,
        isWinterCollection: false,
        ratingChecked: [false, false, false, false],
        priceChecked: [false, false],
        rating: 1,
        allProducts: state.allProducts.sort(() => Math.random() - 0.5),
      };

    default:
      return { ...state };
  }
};

const initialValue = {
  isMenClothing: false,
  isWomenClothing: false,
  isKidsClothing: false,
  isEthnicWears: false,
  isTraditionalClothing: false,
  isNewlyLaunched: false,
  isSummerCollection: false,
  isWinterCollection: false,
  rating: 1,
  allProducts: [],
  ratingChecked: [false, false, false, false],
  priceChecked: [false, false],
};

const productContext = createContext();

const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialValue);

  return (
    <productContext.Provider value={{ state, dispatch }}>
      {children}
    </productContext.Provider>
  );
};

const useProduct = () => useContext(productContext);

export { useProduct, ProductProvider };
