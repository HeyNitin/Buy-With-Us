import SideBar from "../Components/SideBar";
import ProductCard from "../Components/ProductCard";
import { useEffect } from "react";
import axios from "axios";
import { useProduct } from "../Contexts/ProductContext";
import { useToast } from "../Components/Toast";
import { useDocumentTitle } from "../Hooks/useDocumentTitle";

const Product = () => {
  const { state, dispatch } = useProduct();
  const { showToast } = useToast();

  useDocumentTitle("Products");

  const finalProductReducer = (product) => {
    const categories = {
      "Men Clothing": state.isMenClothing,
      "Women Clothing": state.isWomenClothing,
      "Kids Clothing": state.isKidsClothing,
      "Ethnic Wears": state.isEthnicWears,
      "Traditional Clothing": state.isTraditionalClothing,
      "Newly Launched": state.isNewlyLaunched,
      "Summer Collection": state.isSummerCollection,
      "Winter Collection": state.isWinterCollection,
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
      try {
        const { data: products } = await axios.get("/api/products");
        dispatch({ type: "setProducts", payload: products.products });
      } catch (error) {
        showToast(
          "error",
          "Something went wrong while trying to load products"
        );
      }
    })();
  }, []);

  return (
    <div>
      <SideBar />
      <div className="main-container-products">
        <div className="products-container">
          {filteredProducts.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Product;
