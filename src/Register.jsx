import React, { useState } from 'react';
import "./Register.css";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, Input } from '@material-ui/core';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
import Success from './Success';


export default function Register({open,onClose}) {

    const [{user},dispatch]=useStateValue();
    const [username,setUsername]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [successOpen , setSuccessOpen] = useState(false)


    const handleChange = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        if (name==="username"){
            console.log("username: ",value);
            return setUsername(value)
        }else if (name==='email'){
            console.log("Email: ",value);
            return setEmail(value)
        }else if (name==='password'){
            console.log("Password: ",value);
            return setPassword(value);
        }
    }

    const register = (e)=>{
        e.preventDefault();
        onClose()
        auth.createUserWithEmailAndPassword(email,password)
        .then((authUser)=>{
            authUser.user.updateProfile({
                displayName:username
            })
            setSuccessOpen(true)
            setUsername('')
            setEmail('')
            setPassword('')
            dispatch({
                type:"SET_USER",
                user:authUser
            })
        })
        .catch(e => alert(e.message))
    }
    
    return (
        <div className="register">
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className="register__modal"
                open={open}
                onClose={onClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >

                <Fade in={open}>
                    <div className="register__data">
                        <img 
                            src="logo.png"
                            alt="logo_err"
                            className="register__logo"
                        />
                        <Input 
                            name="username"
                            type="text"
                            placeholder="Enter UserName..."
                            autoFocus={true}
                            className="register__field"
                            value={username}
                            onChange={handleChange}
                        />
                        <Input 
                            name="email"
                            type="email"    
                            placeholder="Enter Email..."
                            autoComplete="off"
                            className="register__field"
                            value={email}
                            onChange={handleChange}
                        />
                        <Input 
                            name="password"
                            type="password"
                            placeholder="Enter Password..."
                            className="register__field"
                            value={password}
                            onChange={handleChange}
                        />                    
                        <Button type="submit" onClick={register} className="register__btn">Register</Button>
                    </div>
                </Fade>
            </Modal>
            
            <Success 
                open={successOpen}
                onClose={setSuccessOpen}
                text="Account Created!"
            />
            
        </div>
    )

}