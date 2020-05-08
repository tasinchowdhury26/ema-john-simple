import React from "react";

const ReviewItem = (props) => {
  const { name, quantity, key, price } = props.product;
  const reviewItemStyle = {
    borderBottom: "1px solid grey",
    marginBottom: "5px",
    paddingBottom: "5px",
    marginLeft: "200px",
  };
  console.log(props);
  return (
    <div style={reviewItemStyle}>
      <h4 className="product-name">{name}</h4>
      <p>Quantity : {quantity}</p>
      <p>
        <small>$ {price}</small>
      </p>
      <br />
      <button className="main-button" onClick={() => props.removeProduct(key)}>
        Remove item
      </button>
    </div>
  );
};

export default ReviewItem;
