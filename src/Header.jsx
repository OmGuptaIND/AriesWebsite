import React, { useState } from 'react';
import './Header.css';
import {Link} from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import SideBar from './SideBar';
import { useStateValue } from './StateProvider';
import { LazyLoadImage } from 'react-lazy-load-image-component';
export default function Header() {
    const [{user},dispatch]=useStateValue();
    const [open,setOpen]=useState(false);

    return (
        <div className="header">
            <div className="header__logo">
                <Link to = "/">
                    <img 
                        src="https://firebasestorage.googleapis.com/v0/b/aries-website-9da3e.appspot.com/o/site_images%2Flogo.png?alt=media&token=572dbbfc-a21b-4a49-83a1-008bb49badd6"
                        alt="logo_err"
                        className="header__image"
                    />
                </Link>
            </div> 
                <SideBar 
                    open={open}
                    onClose={()=>setOpen(false)}
                />
                       
            <div className="header__options">
                <Link className="header__options__link" to = "/about">
                    <div className="header__link">
                        <p>About</p>
                    </div>
                   
                </Link>
                <Link className="header__options__link" to = "/blog">
                    <div className="header__link">
                        <p>Blog</p>
                    </div>
                   
                </Link>

                {user && (
                    <div className="header__options__link">
                        <div className="header__link">
                            <p onClick={()=>setOpen(true)} ><MenuIcon 
                                className="header__menu__burger"
                                fontSize="inherit"
                            /></p>
                        </div>
                    </div>
                )}
                
            </div>
            
        </div>
    )
}
