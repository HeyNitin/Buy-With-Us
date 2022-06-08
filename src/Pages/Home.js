import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../Contexts/ProductContext";
import { useToast } from "../Components/Toast";
import { useDocumentTitle } from "../Hooks/useDocumentTitle";

const Home = () => {
  const [categoryData, setCategoryData] = useState([]);
  const { dispatch } = useProduct();

  useDocumentTitle("Home");

  let Navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(
    () =>
      (async () => {
        try {
          const res = await axios.get("/api/categories");
          setCategoryData(res.data.categories);
        } catch (error) {
          showToast("error", "Looks like we're down");
        }
      })(),
    []
  );

  const clickHandler = (categoryName) => {
    switch (categoryName) {
      case "Men's Collection":
        dispatch({ type: "Clear" });
        dispatch({ type: "Men Clothing", payload: true });
        break;
      case "Women's Collection":
        dispatch({ type: "Clear" });
        dispatch({ type: "Women Clothing", payload: true });
        break;
      case "Kid's Collection":
        dispatch({ type: "Clear" });
        dispatch({ type: "Kids Clothing", payload: true });
        break;

      default:
        dispatch({ type: "Clear" });
        dispatch({ type: categoryName, payload: true });
        break;
    }
    Navigate("/products");
  };

  const smallBanners = categoryData.filter(({ size }) => size === "small");

  const mediumBanners = categoryData.filter(({ size }) => size === "medium");

  const largeBanners = categoryData.filter(({ size }) => size === "large");

  return (
    <div>
      <div className="homepage-catagories">
        {smallBanners.map(({ id, img, categoryName }) => (
          <div key={id} className=" card card-onimage">
            <img src={img} alt="main-img" />
            <div className="header">
              <p onClick={() => clickHandler(categoryName)}>{categoryName}</p>{" "}
            </div>
          </div>
        ))}
      </div>

      {largeBanners.map(({ id, img, categoryName }) => (
        <div key={id} className="homepage-banner">
          <div className=" card card-onimage">
            <img className="img-responsive" src={img} alt="main-img" />
            <div className="header">
              <p onClick={() => clickHandler(categoryName)}>{categoryName}</p>{" "}
            </div>
          </div>
        </div>
      ))}
      <div className="homepage-collection">
        {mediumBanners.map(
          ({ id, img, categoryName, heading, description }) => (
            <div key={id} className="card card-horizental">
              <img src={img} alt="main-img" />
              <div className="content">
                <div className="header">
                  <p className="heading-sub">{categoryName}</p>
                </div>

                <footer className="footer">
                  <p onClick={() => clickHandler(heading)}>{heading}</p>{" "}
                  <p>{description}</p>
                </footer>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Home;
