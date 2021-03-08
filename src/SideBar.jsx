import { Avatar, Button, SwipeableDrawer } from '@material-ui/core';
import React, { useState } from 'react';
import './SideBar.css';
import {useStateValue} from './StateProvider';
import Success from './Success';
import { auth } from './firebase';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import PostAddIcon from '@material-ui/icons/PostAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';
export default function SideBar({open,onClose}) {
    const [{user},dispatch]=useStateValue();
    const [successOpen , setSuccessOpen] = useState(false);
    const handleSignOut = (e) =>{
        console.log("SignOut Called!");
        auth.signOut()
        .then((authUser) => {
            setSuccessOpen(true);
            onClose();
            dispatch({
                type:"SET_USER",
                user:{}
            })
        }).catch(err => alert(err.message))
    }


    return (
        <div className="sidebar">
            <Success 
                open={successOpen}
                onClose={setSuccessOpen}
                text="Logged Successfully Thanks for Visiting ! ! "
            />    
            <SwipeableDrawer
                anchor="right"
                open={open}
                onClose={onClose}
                onOpen={open}
                className="sidebar__area"
            >
            <div className="data">
                <Avatar 
                    alt={user?.displayName}
                    src={user?.photoURL}
                    className="data__logo"
                />
                <p className="data__username" >{user?.displayName}</p>
                <hr />
                <div className="data__actions">
                    <Link className="sidbar__options" to ="/new-post">
                        <p className="data__posts data__space"><div className="data__bookmark"><PostAddIcon /> NewPost</div></p>
                    </Link>
                    <p className="data__bookmarks data__space"><div className="data__bookmark"><BookmarkBorderIcon /> Bookmarks</div></p>
                    {user && (
                            
                        <p onClick={handleSignOut}><div className="data__bookmark data__space"><ExitToAppIcon />Logout</div></p>
                    )}
                </div>
                
            </div>
            
          </SwipeableDrawer>
            
        </div>
    )
}
