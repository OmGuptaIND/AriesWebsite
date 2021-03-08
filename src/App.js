import React , {useEffect} from 'react';
import './App.css';
import Header from './Header';
import { BrowserRouter as Router, Route, Switch, useHistory} from "react-router-dom";
// import {  } from '@material-ui/core';
import Blog_Page from './Blog_Page';
import Layout from './Layout';
import Home from './Home';
import {auth} from './firebase';
import {useStateValue} from './StateProvider';
import Post from './Post';
function App() {
  const [{user},dispatch]=useStateValue();
  const history = useHistory();
  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        //the user is logged in
        dispatch({
          type:"SET_USER",
          user:authUser,
        })
      }else{
        //User is logged out
        dispatch({
          type:"SET_USER",
          user:null
        })
      }
    });

    return () => {
      unsubscribe();
    }
  },[user]);
  console.log("User is >>>>> ",user);
  return (
    <div className="App">
      <Router >
        <Switch>
            <Route path='/' exact={true}>
              <Header />
              <Home />
            </Route>
            {user ? (
              <Route path='/new-post' exact={true}>
                <Header />
                <Post />
              </Route>
            ):<h1>You are not Authorised !</h1>}
            <Route path='/blog' exact={true}>
              <Header />
              <Blog_Page />
            </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
