import React from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { useState } from "react";
import { createContext } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';


firebase.initializeApp(firebaseConfig);

const AuthContext = createContext();

export const AuthContextProvider = (props) =>{
    const auth = Auth();
    return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);

export const PrivateRoute = ({ children, ...rest }) => {
    const auth = useAuth();
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

const getUser = user =>{
    const {displayName, email, photoURL} = user;
    return {name : displayName, email, photo : photoURL};
}

const Auth = () => {
    const [user, setUser] = useState(null);

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider)
        .then(res => {
            const signedInUser = getUser(res.user);
            setUser(signedInUser);
            return res.user;
        })
        .catch(err => {
            setUser(null);
            return err.message;
        })
    }
    const signOut = () => {
        return firebase.auth().signOut().then(function() {
            setUser(null);
            return true;
            console.log(user);
          }).catch(function(error) {
              return false;
            // An error happened.
          });
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(usr) {
            if (usr) {
                const currentUser = getUser(usr);
                setUser(currentUser);
              // User is signed in.
            } else {
              // No user is signed in.
            }
          });
    },[])
    
    return {
        user,
        signInWithGoogle,signOut
    }
}

export default Auth;