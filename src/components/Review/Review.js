import React, { useState, useEffect } from 'react';
import './Review.css'
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../../Cart/Cart';
import orderImage from '../../images/tenor.gif';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced,setOrderPlaced] = useState(false);

    const handlePlaceOrder = () => {
        setCart([]);
        setOrderPlaced(true);
        processOrder();
    }

    const  removeProduct = (productKey) =>{
        console.log('remove clicked', productKey);
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);         //Also can use Object.values to get value of the keys. You know, the object {key : value} !
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
    },[])

    let doneImage; 
    if(orderPlaced)
    {
        doneImage = <img src={orderImage} alt=""/>;
    }
    return (
        <div className='twin-container'>
            <div className='product-container'>
            <h1>Cart Items : {cart.length}</h1>
            {
                cart.map(pd => <ReviewItem 
                    key={pd.key}
                    removeProduct = {removeProduct}
                    product={pd}></ReviewItem>)
            }
            { doneImage }
            </div>
            <div className="cart-conatiner">
                <Cart cart={cart}><button className='main-button'
                onClick={handlePlaceOrder}
                >Place Order</button></Cart>
            </div>                      
        </div>
        //since, here is no child element within <Cart></Cart>, review page won't show any children.
    );
};

export default Review;