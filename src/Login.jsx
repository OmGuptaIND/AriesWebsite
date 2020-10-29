import React, { useState } from 'react';
import "./Login.css";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, Input } from '@material-ui/core';
import {useStateValue} from './StateProvider'
import { auth } from './firebase';
import Success from './Success';

export default function Login({open,setOpen}){
    const [{user},dispatch]=useStateValue();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [successOpen , setSuccessOpen] = useState(false);
    
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name==='email'){
            return setEmail(value);
        }else if (name==='password'){
            return setPassword(value)
        }
    }

    const login = (e)=>{
        e.preventDefault();
        setOpen(false)
        auth.signInWithEmailAndPassword(email,password)
        .then((authUSer)=>{
            setSuccessOpen(true)
            setEmail('')
            setPassword("")
            dispatch({
                type:"SET_USER",
                user:authUSer
            })
        }).catch(err => alert(err.message))
    }
 

    return (
        <div className="login" >
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className="login__modal"
                open={open}
                onClose={()=>setOpen(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >

                <Fade in={open}>
                    <div className="login__data">
                        <img 
                            src="logo.png"
                            alt="logo_err"
                            className="login__logo"
                        />
                        <form >
                            <Input 
                                type="email"    
                                name="email"
                                placeholder="Enter Email..."
                                autoComplete="off"
                                className="login__field"
                                value={email}
                                onChange={handleChange}
                                autoFocus={true}
                            />
                            <Input 
                                type="password"
                                name="password"
                                placeholder="Enter Password..."
                                className="login__field"
                                value={password}
                                onChange={handleChange}
                            />                    
                            <Button type="submit" onClick={login} className="login__btn">Login</Button>
                        </form>
                        
                    </div>
                </Fade>
            </Modal>

            <Success 
                open={successOpen}
                onClose={setSuccessOpen}
                text="Login Success ! "
            />
            
        </div>
    )
}
