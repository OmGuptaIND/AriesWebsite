import { Avatar, Button } from '@material-ui/core';
import React, { useState,useEffect } from 'react';
import './Home.css';
import Register from './Register';
import Login from './Login';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {Input} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import InstagramIcon from '@material-ui/icons/Instagram';
import GitHubIcon from '@material-ui/icons/GitHub';
import YouTubeIcon from '@material-ui/icons/YouTube';
import TwitterIcon from '@material-ui/icons/Twitter';
import { useStateValue } from './StateProvider';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import ReactHtmlParser from 'react-html-parser'
import Blog from './Blog';
import { db,auth,storage } from './firebase';
import Success from './Success';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Yt from './Yt';
import MyStacks from './MyStacks';
export default function Home() {
    const [{user},dispatch]=useStateValue();
    const [open, setOpen] = useState(false);
    const [edit,setEdit]=useState(false)
    const [loginOpen , setLoginOpen ] = useState(false);
    const [progress,setProgress]=useState(0);
    const [image,setImage]=useState(null);
    const [posts,setPosts]=useState([])
    const [loading , setLoading]=useState(false)
    const [successOpen , setSuccessOpen] = useState(false);

    useEffect(() => {
       db.collection("posts").orderBy('timestamp','desc').onSnapshot(snapshot => {
           setPosts(snapshot.docs.map(doc => ({id:doc.id , post:doc.data()})))
       })
    }, []);

    const handleUpload = (e) => {
        const name=e.target.name;
        const value = e.target.files;
        if (name==="image" && value.length>0){
            console.log(value);
            return (setImage(value[0]));
        }
    }
    const handleUpdate = (e) => {
        e.preventDefault();
        let currentUser = auth.currentUser;
        console.log(currentUser);
        const uploadTask = storage.ref(`profileimages/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot)=>{
                //progress update....
                const progress = Math.round(
                    (snapshot.bytesTransferred/snapshot.totalBytes)*100
                );
                setLoading(true)
                setProgress(progress);    
            },
            (error)=>{
                //error function....
                console.log(error);
                alert(error.message);
            },
            ()=>{
                //complte function....
                storage
                .ref("profileimages")
                .child(image.name)
                .getDownloadURL()
                .then(url=>{
                    //Post the image inside the database;
                    currentUser.updateProfile({
                        photoURL:url
                    })
                    setProgress(0);
                    setImage(null)
                    setEdit(false)
                    setSuccessOpen(true)
                    setLoading(false)
                })
            }
        )
        
    }

    return (
        <div className="home">
            
            <div className="home__hero">
            
                <img 
                    src="https://firebasestorage.googleapis.com/v0/b/aries-website-9da3e.appspot.com/o/site_images%2Fhero4.gif?alt=media&token=ea47931f-5f7b-4950-bd8a-18ef7e60df2f"
                    alt="gif_err"
                    className="home__gif"
                />
            </div>
            <div className="hero__data">
                <h1 id="hero" className="hero__heading">Aries in Dev...</h1>
            </div>
            <div className="hero__social">
                {/* <FacebookIcon  fontSize="large" className="home__social__options facebook"/> */}
                <InstagramIcon fontSize="large" className="home__social__options instagram"/>
                <TwitterIcon fontSize="large" className="home__social__options twitter"/>
                <GitHubIcon fontSize="large" className="home__social__options github"/>
                <YouTubeIcon fontSize="large" className="home__social__options youtube"/>
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
                        src="https://firebasestorage.googleapis.com/v0/b/aries-website-9da3e.appspot.com/o/site_images%2Fhero__middle.gif?alt=media&token=ac24efe9-ec49-45f3-beab-ad022b16d463"
                        alt="gif_err"
                        className="home__middle__gif"
                    />
                </div>
                <div maxWidth="lg" className="hero__middle_text">
                    {user && (
                        <div className="hero__username__text">
                            <Avatar 
                                alt={user?.displayname}
                                src={user?.photoURL}
                                className="home__avatar"
                            />
                            <div className="hero__edit">
                                <h1 className="hero__middle__username">{user.displayName} </h1>
                                <BorderColorIcon onClick={()=>setEdit(true)} className="edit__btn"/>
                            </div>
                        </div>
                    )}
                    
                    <h1 className="blog__head">Recent Blogs</h1>
                    <hr className="bolg__head__hr"/>
                    <div className="home__blogs"> 
                        {posts?.length>0 ? posts?.map((data,index) => { 
                            const text = String(data.post.text.substring(0,200));
                            if (index < 5){
                                return (
                                    <>
                                        <Blog 
                                            key={data.id}
                                            id={data.id}
                                            title={data.post.title}
                                            text={text}
                                            views={data.post.views}
                                            likes={data.post.likes}
                                            badge={data.post.badge}
                                        />
                                    </>
                            );
                            }
                            
                        }):<h1>Nothing to see here</h1>}
                    </div>
                    <hr className="blog__bottom" />
                    {user?.displayName==="Aries" && (
                        <>
                        <div className="home__bottom">
                            <MyStacks />             
                        </div>
                        
                        </>
                    )}
                    <div className="home__bottom">
                        <Yt />              
                    </div>
                    <hr className="blog__bottom" />
                   
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
                            src={user?.photoURL}
                            alt={user?.displayName}
                            className="home__avatar"
                        />
                        <form >
                            <label for="username">
                                UserName
                            </label>
                            <Input 
                                id="username"
                                type="text"
                                name="UserName"
                                placeholder="Enter Password..."
                                className="login__field"
                                disabled={true}
                                value={user?.displayName} 
                            />   
                            <label for="email">
                                Email
                            </label>
                            <Input 
                                id="email"
                                type="email"    
                                name="Email"
                                placeholder="Enter Email..."
                                autoComplete="off"
                                disabled={true}
                                className="login__field"
                                autoFocus={true}
                                value={user?.email}
                            />
                            <label for ="contained-button-file">
                                Profile Pic
                            </label>
                            <br></br>
                            <div className="edit__load">
                                <Input
                                    name="image"
                                    onChange={handleUpload}
                                    id="contained-button-file"
                                    type="file"
                                    className="login__upload"
                                />
                                    { loading && (<CircularProgress variant="static" value={progress} />)}
                            </div>
                            <br />
                            
                                <Button type="submit"  onClick={handleUpdate} className="login__btn update__btn">Update</Button>
                             
                        </form>
                    </div>
                </Fade>
            </Modal>

            <Success 
                open={successOpen}
                onClose={setSuccessOpen}
                text="Profile Updated Successfully!"
            />
        </div>
    )
}