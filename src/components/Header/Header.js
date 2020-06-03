import React, { useState } from 'react';
import logo from '../../images/logo.png';
import './Header.css'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useAuth } from '../Login/useAuth';
import { Link, Router } from 'react-router-dom';

const usePrevious = value =>{
    const prev = useRef();
    useEffect(() =>{
        console.log(value);
        prev.current = value;
    },[value])
    return prev.current;
}

const Header = () => {
    const auth = useAuth();
    
    return (
        <div className="header">
            <img src={logo} alt="logo"/>
            <nav>
            <a href="/shop">Shop</a>
            <a href="/review">Order Review</a>
            <a href="/inventory">Manage Inventory</a>
            {
                auth.user &&
                <span style={{borderRadius:'3px',padding: '4px', backgroundColor: 'lightgrey'}}>
                    Hi, {auth.user.name}
                </span>
            }
            {
                auth.user ? 
                <a 
                style={{borderRadius:'3px',padding: '4px', backgroundColor: 'grey'}}
                href="/login"
                >Sign Out</a>
                : <a 
                style={{borderRadius:'3px',padding: '4px', backgroundColor: 'grey'}}
                href="/login"
                >Sign In</a>
            }
        </nav>
        </div>
    );
};

export default Header;