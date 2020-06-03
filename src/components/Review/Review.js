import React, { useState, useEffect } from "react";
import "./Review.css";
import {
  getDatabaseCart,
  removeFromDatabaseCart,
  processOrder,
} from "../../utilities/databaseManager";
import fakeData from "../../fakeData";
import ReviewItem from "../ReviewItem/ReviewItem";
import Cart from "../../Cart/Cart";
import orderImage from "../../images/tenor.gif";
import { Link } from "react-router-dom";
import { useAuth } from "../Login/useAuth";

const Review = () => {
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const auth = useAuth();

  const handlePlaceOrder = () => {
    setCart([]);
    setOrderPlaced(true);
    processOrder();
  };

  const removeProduct = (productKey) => {
    console.log("remove clicked", productKey);
    const newCart = cart.filter((pd) => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };
  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart); //Also can use Object.values to get value of the keys. You know, the object {key : value} !
    const cartProducts = productKeys.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      product.quantity = savedCart[key];
      return product;
    });
    setCart(cartProducts);
  }, []);

  let doneImage;
  if (orderPlaced) {
    doneImage = <img src={orderImage} alt="" />;
  }
  return (
    <div className="twin-container">
      <div className="product-container">
        <h1>Cart Items : {cart.length}</h1>
        {cart.map((pd) => (
          <ReviewItem
            key={pd.key}
            removeProduct={removeProduct}
            product={pd}
          ></ReviewItem>
        ))}
        {doneImage}
        {
          !cart.length && <h3>You have not started shopping.<a href="/shop">Keep Shopping</a></h3>
        }
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <Link to = 'shipment'>
            {
              auth.user ?
            <button className="main-button">
              Proceed Shipment
            </button>
            :
            <button className="main-button">
              Login to Proceed
            </button>
            }
          </Link>
        </Cart>
      </div>
    </div>
    //if there is no child element within <Cart></Cart>, review page won't show any children.
  );
};

export default Review;
