import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../../Cart/Cart';

const Shop = () => {
    const first10 = fakeData.slice(0,10);               //taking first 10 items only
    const [products, setProducts] = useState(first10);
    const [cart,setCart] = useState([]);
    const handleAddProduct = (product) =>{
        console.log("Product Added : ",product);
        const newCart = [...cart,product];
        setCart(newCart);
    }
    return (
        <div className='shop-container'>
            <div className="product-container">
            {
                products.map(pd => <Product handleAddProduct = {handleAddProduct} product={pd}></Product>)      //passing data dynamically in component, this will execute 10 times as sliced above.
            }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
            
        </div>
    );
};

export default Shop;