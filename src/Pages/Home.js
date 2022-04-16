import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [categoryData, setCategoryData] = useState([]);
  useEffect(
    () =>
      (async () => {
        const res = await axios.get("/api/categories");
        setCategoryData(res.data.categories);
      })(),
    []
  );

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
              <Link to="/products">
                {" "}
                <p>{categoryName}</p>{" "}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {largeBanners.map(({ id, img, categoryName }) => (
        <div key={id} className="homepage-banner">
          <div className=" card card-onimage">
            <img className="img-responsive" src={img} alt="main-img" />
            <div className="header">
              <Link to="/products">
                {" "}
                <p>{categoryName}</p>{" "}
              </Link>
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
                  <Link to="/products">
                    {" "}
                    <p>{heading}</p>{" "}
                  </Link>
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
