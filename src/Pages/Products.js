import SideBar from "../Components/SideBar";
import ProductCard from "../Components/ProductCard";
import { useEffect, useReducer } from "react";
import axios from "axios";

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
    case "Rating":
      return { ...state, rating: action.payload };
    case "highLow":
      return {
        ...state,
        allProducts: state.allProducts.sort((a, b) => b.price - a.price)
      };
    case "lowHigh":
      return {
        ...state,
        allProducts: state.allProducts.sort((a, b) => a.price - b.price)
      };
    case "setProducts":
      return {
        ...state,
        allProducts: action.payload
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
        isSummerCollection: false
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
  rating: 1,
  allProducts: []
};

const Product = () => {
  const [state, dispatch] = useReducer(productReducer, initialValue);

  const filteredProducts = state.allProducts
    .filter((data) =>
      state.isMenClothing ? data.categoryName.includes("Men Clothing") : data
    )
    .filter((data) =>
      state.isWomenClothing
        ? data.categoryName.includes("Women Clothing")
        : data
    )
    .filter((data) =>
      state.isKidsClothing ? data.categoryName.includes("Kids Clothing") : data
    )
    .filter((data) =>
      state.isEthnicWears ? data.categoryName.includes("Ethnic Wears") : data
    )
    .filter((data) =>
      state.isTraditionalClothing
        ? data.categoryName.includes("Traditional Clothing")
        : data
    )
    .filter((data) =>
      state.isNewlyLaunched
        ? data.categoryName.includes("Newly Launched")
        : data
    )
    .filter((data) =>
      state.isSummerCollection
        ? data.categoryName.includes("Summer Collection")
        : data
    )
    .filter((data) => data.rating >= state.rating);

  useEffect(() => {
    (async () => {
      const { data: products } = await axios.get("/api/products");
      dispatch({ type: "setProducts", payload: products.products });
    })();
  }, []);

  return (
    <div>
      <SideBar state={state} dispatch={dispatch} />
      <div className="products-container">
        {filteredProducts.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
};

export default Product;
