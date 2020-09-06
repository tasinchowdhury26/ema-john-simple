import React from "react";
import { useForm } from "react-hook-form";
import "./Shipment.css";
import { useAuth } from "../Login/useAuth";
import { getDatabaseCart, processOrder } from "../../utilities/databaseManager";

const Shipment = () => {
  const { register, handleSubmit, errors } = useForm();
  const auth = useAuth();
  const onSubmit = (data) => {
    //TODO: Will include payment methods in next module


    console.log(auth.user.email);
    const savedCart = getDatabaseCart();
    const orderDetails = {email: auth.user.email, cart: savedCart}
    fetch('http://localhost:4200/placeOrder', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderDetails)
    })
    .then(res => res.json())
    .then(data => {
      alert('Order successfully placed with order id: ' + data._id);
      processOrder();
    })

  };
  

  return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      <input
        name="name"
        defaultValue={auth.user.name}
        ref={register({ required: true })}
        placeholder="Name"
      />
      {errors.name && <span className="error">Name is required</span>}

      <input
        name="email"
        defaultValue={auth.user.email}
        ref={register({ required: true })}
        placeholder="email"
      />
      {errors.email && <span className="error">Email is required</span>}

      <input
        name="Address Line 1"
        ref={register({ required: true })}
        placeholder="address line 1"
      />
      {errors.name && <span className="error">Address is required</span>}

      <input
        name="Address Line 2"
        ref={register}
        placeholder="address line 2"
      />

      <input
        name="city"
        ref={register({ required: true })}
        placeholder="city"
      />
      {errors.city && <span className="error">City is required</span>}

      <input
        name="country"
        ref={register({ required: true })}
        placeholder="country"
      />
      {errors.country && <span className="error">Country is required</span>}

      <input
        name="zipcode"
        ref={register({ required: true })}
        placeholder="zipcode"
      />
      {errors.zipcode && <span className="error">Zipcode is required</span>}
      <input type="submit" />
    </form>
  );
};

export default Shipment;
