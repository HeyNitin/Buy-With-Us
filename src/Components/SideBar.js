const SideBar = ({ state, dispatch }) => {
  return (
    <aside className="products-sidebar">
      <div className="filters">
        <p>Filters</p>
        <button
          onClick={() => dispatch({ type: "Clear" })}
          className="button"
          id="clear-input"
        >
          Clear All
        </button>
        <p>Category</p>
        <div>
          <input
            onChange={(e) =>
              dispatch({ type: "Men Clothing", payload: e.target.checked })
            }
            checked={state.isMenClothing}
            type="checkbox"
            id="men-clothing"
          />
          <label htmlFor="men-clothing">Men Clothing</label>
        </div>
        <div>
          <input
            onChange={(e) =>
              dispatch({ type: "Women Clothing", payload: e.target.checked })
            }
            checked={state.isWomenClothing}
            type="checkbox"
            id="women-clothing"
          />
          <label htmlFor="women-clothing">Women Clothing</label>
        </div>
        <div>
          <input
            onChange={(e) =>
              dispatch({ type: "Kids Clothing", payload: e.target.checked })
            }
            checked={state.isKidsClothing}
            type="checkbox"
            id="kids-clothing"
          />
          <label htmlFor="kids-clothing">kids Clothing</label>
        </div>
        <div>
          <input
            onChange={(e) =>
              dispatch({ type: "Ethnic Wears", payload: e.target.checked })
            }
            checked={state.isEthnicWears}
            type="checkbox"
            id="ethnic-wears"
          />
          <label htmlFor="ethnic-wears">Ethnic wears</label>
        </div>
        <div>
          <input
            onChange={(e) =>
              dispatch({
                type: "Traditional Clothing",
                payload: e.target.checked,
              })
            }
            checked={state.isTraditionalClothing}
            type="checkbox"
            id="traditional-clothing"
          />
          <label htmlFor="traditional-clothing">Traditional Clothing</label>
        </div>
        <div>
          <input
            onChange={(e) =>
              dispatch({ type: "Newly Launched", payload: e.target.checked })
            }
            checked={state.isNewlyLaunched}
            type="checkbox"
            id="newly-launched"
          />
          <label htmlFor="newly-launched">Newly Launched</label>
        </div>
        <div>
          <input
            onChange={(e) =>
              dispatch({ type: "Summer Collection", payload: e.target.checked })
            }
            checked={state.isSummerCollection}
            type="checkbox"
            id="summer-collection"
          />
          <label htmlFor="summer-collection">Summer Collection</label>
        </div>
        <div>
          <input
            onChange={(e) =>
              dispatch({ type: "Winter Collection", payload: e.target.checked })
            }
            checked={state.isWinterCollection}
            type="checkbox"
            id="winter-collection"
          />
          <label htmlFor="winter-collection">Winter Collection</label>
        </div>
        <p>Ratings</p>
        <div>
          <input
            onChange={() => dispatch({ type: "Rating", payload: 4 })}
            type="radio"
            name="rating"
            id="fourstar"
            checked={state.ratingChecked[3]}
          />
          <label htmlFor="fourstar">4 Stars & above</label>
        </div>
        <div>
          <input
            onChange={() => dispatch({ type: "Rating", payload: 3 })}
            type="radio"
            name="rating"
            id="threestar"
            checked={state.ratingChecked[2]}
          />
          <label htmlFor="threestar">3 Stars & above</label>
        </div>
        <div>
          <input
            onChange={() => dispatch({ type: "Rating", payload: 2 })}
            type="radio"
            name="rating"
            id="twostar"
            checked={state.ratingChecked[1]}
          />
          <label htmlFor="twostar">2 Stars & above</label>
        </div>
        <div>
          <input
            onChange={() => dispatch({ type: "Rating", payload: 1 })}
            type="radio"
            name="rating"
            id="onestar"
            checked={state.ratingChecked[0]}
          />
          <label htmlFor="onestar">1 Stars & above</label>
        </div>
        <p>Sort by</p>
        <div>
          <input
            onChange={() => dispatch({ type: "lowHigh" })}
            type="radio"
            id="LTH"
            name="sort"
            checked={state.priceChecked[0]}
          />
          <label htmlFor="LTH">Price - Low to High</label>
        </div>
        <div>
          <input
            onChange={() => dispatch({ type: "highLow" })}
            type="radio"
            id="HTL"
            name="sort"
            checked={state.priceChecked[1]}
          />
          <label htmlFor="HTL">Price - High to low</label>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
