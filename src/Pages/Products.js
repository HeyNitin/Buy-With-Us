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
  rating: 1,
  allProducts: [],
  ratingChecked: [false, false, false, false],
  priceChecked: [false, false],
};

const Product = () => {
  const [state, dispatch] = useReducer(productReducer, initialValue);

  const finalProductReducer = (product) => {
    const categories = {
      "Men Clothing": state.isMenClothing,
      "Women Clothing": state.isWomenClothing,
      "Kids Clothing": state.isKidsClothing,
      "Ethnic Wears": state.isEthnicWears,
      "Traditional Clothing": state.isTraditionalClothing,
      "Newly Launched": state.isNewlyLaunched,
      "Summer Collection": state.isSummerCollection,
    };

    let checkboxApplied = false;

    for (let obj in categories) {
      if (categories[obj]) {
        checkboxApplied = true;
        break;
      }
    }
    if (checkboxApplied) {
      for (let category of product.categoryName) {
        if (categories[category] && product.rating >= state.rating) {
          return true;
        }
      }
      return false;
    } else if (product.rating >= state.rating) {
      return true;
    } else {
      return false;
    }
  };

  const filteredProducts = state.allProducts.filter(finalProductReducer);

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
