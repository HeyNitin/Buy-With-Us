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
                payload: e.target.checked
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
        <p>Ratings</p>
        <input
          onClick={() => dispatch({ type: "Rating", payload: 4 })}
          type="radio"
          name="rating"
          id="fourstar"
        />
        <label htmlFor="fourstar">4 Stars & above</label> <br />
        <input
          onClick={() => dispatch({ type: "Rating", payload: 3 })}
          type="radio"
          name="rating"
          id="threestar"
        />
        <label htmlFor="threestar">3 Stars & above</label> <br />
        <input
          onClick={() => dispatch({ type: "Rating", payload: 2 })}
          type="radio"
          name="rating"
          id="twostar"
        />
        <label htmlFor="twostar">2 Stars & above</label> <br />
        <input
          onClick={() => dispatch({ type: "Rating", payload: 1 })}
          type="radio"
          name="rating"
          id="onestar"
        />
        <label htmlFor="onestar">1 Stars & above</label> <br />
        <p>Sort by</p>
        <input
          onClick={() => dispatch({ type: "lowHigh" })}
          type="radio"
          id="LTH"
          name="sort"
        />
        <label htmlFor="LTH">Price - Low to High</label> <br />
        <input
          onClick={() => dispatch({ type: "highLow" })}
          type="radio"
          id="HTL"
          name="sort"
        />
        <label htmlFor="HTL">Price - High to low</label>
      </div>
    </aside>
  );
};

export default SideBar;