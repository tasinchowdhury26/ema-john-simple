import React, { useState, useEffect } from "react";
import "./Review.css";
import {
  getDatabaseCart,
  removeFromDatabaseCart
} from "../../utilities/databaseManager";
import ReviewItem from "../ReviewItem/ReviewItem";
import Cart from "../../Cart/Cart";
import { Link } from "react-router-dom";
import { useAuth } from "../Login/useAuth";

const Review = () => {
  const [cart, setCart] = useState([]);
  const auth = useAuth();

  //We don't need it here, because we're getting it done in Shipment.js
  // const handlePlaceOrder = () => {
  //   setCart([]);
  //   setOrderPlaced(true);
  //   processOrder();
  // };

  const removeProduct = (productKey) => {
    const newCart = cart.filter((pd) => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };
  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart); //Also can use Object.values to get value of the keys. You know, the object {key : value} !
    console.log(productKeys);
    fetch('http://localhost:4200/getProductsByKey', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productKeys)
    }).then(res => res.json())
    .then(data => {
      const cartProducts = productKeys.map((key) => {
        const product = data.find((pd) => pd.key === key);
        product.quantity = savedCart[key];
        return product;
      });
      setCart(cartProducts);
    })
  }, []);

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
