import React, { useState } from 'react';
import './Header.css';
import {Link} from "react-router-dom";
import {useStateValue} from './StateProvider';
import { auth } from './firebase';
import Success from './Success';

export default function Header() {
    const [{user},dispatch]=useStateValue();
    const [successOpen , setSuccessOpen] = useState(false);

    const handleSignOut = (e) =>{
        console.log("SignOut Called!");
        auth.signOut()
        .then((authUser) => {
            setSuccessOpen(true)
            dispatch({
                type:"SET_USER",
                user:{}
            })
        }).catch(err => alert(err.message))
    }
    
    return (
        <div className="header">
           
            <div className="header__logo">
                <Link to = "/">
                    <img 
                        src="logo.png"
                        alt="logo_err"
                        className="header__image"
                    />
                </Link>
            </div> 
                <Success 
                    open={successOpen}
                    onClose={setSuccessOpen}
                    text="Logged Successfully Thanks for Visiting ! ! "
                />           
            <div className="header__options">
                <Link className="header__options__link" to = "/about">
                    <div className="header__link">
                        <p>About</p>
                    </div>
                   
                </Link>
                <Link className="header__options__link" to = "/discuss-doubt">
                    <div className="header__link">
                        <p>Blog</p>
                    </div>
                   
                </Link>

                {user && (
                    <div className="header__options__link" to = "/discuss-doubt">
                        <div className="header__link">
                            <p onClick={handleSignOut} >Logout</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
