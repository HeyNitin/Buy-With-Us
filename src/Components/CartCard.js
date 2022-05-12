import { useAuth } from "../Contexts/AuthContext";
import { useLength } from "../Contexts/LengthContext";
import axios from "axios";

const CartCard = ({ product, setCart }) => {
  const { img, title, price, discount } = product;
  const { token } = useAuth();
  const { setCartLength } = useLength();
  const addToWishlist = async () => {
    if (token) {
      await axios.post(
        "/api/user/wishlist",
        { product },
        {
          headers: { authorization: token }
        }
      );
      removeFromCart();
    }
  };

  const removeFromCart = async () => {
    const res = await axios.delete(`/api/user/cart/${product._id}`, {
      headers: { authorization: token }
    });
    setCart([...res.data.cart]);
    setCartLength([...res.data.cart].length);
  };

  const increaseQuantity = async () => {
    const res = await axios.post(
      "/api/user/cart",
      { product },
      {
        headers: { authorization: token }
      }
    );
    setCart([...res.data.cart]);
  };
  const decreaseQuantity = async () => {
    const res = await axios.delete(`/api/user/cart/${product._id}`, {
      headers: { authorization: token }
    });
    setCart([...res.data.cart]);
  };

  return (
    <div className="card card-horizental">
      <img src={img} alt="main-img" />

      <div className="content">
        <div className="header">
          <p>{title}</p>
          <p className="heading-sub final-price">₹{price - discount} </p>
          <p className="text-grey mrp">₹{price} </p>
          <p className="text-grey">{(discount * 100) / price}% off</p>
          <div className="quantity">
            <p>Quantity</p>
            <button
              className="button quantity-d"
              onClick={() => decreaseQuantity()}
            >
              -
            </button>
            <input placeholder={product.qty} />
            <button
              className="button quantity-i"
              onClick={() => increaseQuantity()}
            >
              +
            </button>
          </div>
        </div>
        <footer className="footer">
          <button className="button" onClick={() => removeFromCart()}>
            Remove from Cart
          </button>
          <button className="button" onClick={() => addToWishlist()}>
            Move to Wishlist
          </button>
        </footer>
      </div>
    </div>
  );
};

export default CartCard;
