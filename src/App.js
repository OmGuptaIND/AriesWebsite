import React , {useEffect} from 'react';
import './App.css';
import Header from './Header';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
// import {  } from '@material-ui/core';
import Layout from './Layout';
import Home from './Home';
import {auth} from './firebase';
import {useStateValue} from './StateProvider';
function App() {
  const [{user},dispatch]=useStateValue();
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
          <Layout>
            <Route path='/' exact={true}>
              <Home />
            </Route>
          </Layout>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
