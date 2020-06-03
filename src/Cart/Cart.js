import React from "react";
import "./Cart.css";
import { useContext } from "react";
// import { UserContext } from "../App";


const Cart = (props) => {
  const cart = props.cart;
  //Pro method : reduce((init, el) => init+ el.property, init value of init)
  //const total = cart.reduce((total, pd) => total + pd.price, 0);

  //or Old school method using for loop :
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];
    total += (product.price * product.quantity);
  }
  let shipping = 12.99;
  if (total > 35 || total == 0) {
    shipping = 0;
  } else if (total > 15) {
    shipping = 4.99;
  }

  const tax = (total / 10).toFixed(2); //taking maximum 2 digits of decimal values of fraction.
  const grandTotal = (Number(total) + shipping + Number(tax)).toFixed(2);
  // console.log(cart);
  return (
    <div>
      <h4>Order Summary</h4>
      <p>Items ordered : {cart.length}</p>
      <p>Product Price :$ {total}</p>
      <p>
        <small>Shipping Cost :$ {shipping}</small>
      </p>
      <p>
        <small>Tax :$ {tax}</small>
      </p>
      <p>Total Price :$ {grandTotal}</p>
      <br/>
      {
        props.children
      }
    </div>
  );
};

export default Cart;
