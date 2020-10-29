import { Avatar, Button } from '@material-ui/core';
import React, { useState } from 'react';
import './Home.css';
import Register from './Register';
import Login from './Login';
import post from './Post_data';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {Input} from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import { useStateValue } from './StateProvider';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import Blog from './Blog';
import { SentimentVeryDissatisfiedRounded } from '@material-ui/icons';

export default function Home() {
    const [{user},dispatch]=useStateValue();
    const [open, setOpen] = useState(false);
    const [edit,setEdit]=useState(false)
    const [loginOpen , setLoginOpen ] = useState(false);

    return (
        <div className="home">
            
            <div className="home__hero">
                <img 
                    src="hero4.gif"
                    alt="gif_err"
                    className="home__gif"
                />
            </div>
            <div className="hero__data">
                <h1 id="hero" className="hero__heading">Aries in Dev...</h1>
            </div>
            <div className="hero__social">
                <FacebookIcon  fontSize="large" className="home__social__options facebook"/>
                <InstagramIcon fontSize="large" className="home__social__options instagram"/>
                <TwitterIcon fontSize="large" className="home__social__options twitter"/>
                <GitHubIcon fontSize="large" className="home__social__options github"/>
            </div>
            <div className="hero__margin"></div>
            {!user && (
                <div className="hero__btns">
                    <div className="hero__btn">
                        <Button className="hero__login__btn" onClick={()=> setLoginOpen(true)} >Login</Button>
                        <Button className="hero__register__btn" onClick={()=> setOpen(true)} >Register </Button>
                    </div>
                </div>
            )}
            
            <Register 
                open={open}
                onClose={()=>setOpen(false)}
             />
            <Login 
                open={loginOpen}
                setOpen={setLoginOpen}
            /> 
           
            <div className="home__middle">
                <div className="home__middle__image">
                    <img 
                        src="hero__middle.gif"
                        alt="gif_err"
                        className="home__middle__gif"
                    />
                </div>
                <div maxWidth="lg" className="hero__middle_text">
                    {user && (
                        <div className="hero__username__text">
                            <Avatar 
                                alt={user.displayname}
                                src="/static/images/avatar/1.jpg"
                                className="home__avatar"
                            />
                            <div className="hero__edit">
                                <h1 className="hero__middle__username">{user.displayName} </h1>
                                <BorderColorIcon onClick={()=>setEdit(true)} className="edit__btn"/>
                            </div>
                        </div>
                    )}
                    <h1 className="blog__head">Recent Blogs</h1>
                    <div className="hero__middle__margin"></div>
                    <div className="home__blogs"> 
                        {post.map((e,index) => (
                            <>
                            <Blog 
                                key={index}
                                id={index}
                                title={e.title}
                                text={e.text}
                                views={e.views}
                                likes={e.likes}
                                badge={e.badge}
                            />
                            </>
                        ))}
                    </div>
                    

                </div>
                
            </div>


            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className="login__modal"
                open={edit}
                onClose={()=>setEdit(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >

                <Fade in={edit}>
                    <div className="login__data">
                        <Avatar 
                            src="logo.png"
                            alt={user.displayName}
                            className="home__avatar"
                        />
                        <form >
                            <Input 
                                type="text"
                                name="UserName"
                                placeholder="Enter Password..."
                                className="login__field"
                                disabled={true}
                                value={user.displayName} 
                            />   
                            <Input 
                                type="email"    
                                name="Email"
                                placeholder="Enter Email..."
                                autoComplete="off"
                                disabled={true}
                                className="login__field"
                                autoFocus={true}
                                value={user.email}
                            />
                            <Input 
                                type="email"    
                                name="Email"
                                placeholder="Enter Email..."
                                autoComplete="off"
                                disabled={true}
                                className="login__field"
                                autoFocus={true}
                                value={user.email}
                            />

                            <Button type="submit"  className="login__btn">Submit</Button>
                        </form>
                        
                    </div>
                </Fade>
            </Modal>
          
            
            

        </div>
    )
}
