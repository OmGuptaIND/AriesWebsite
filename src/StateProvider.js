import React,{
    createContext,
    useContext,
    useReducer   
   } from 'react';
   
   //This is a data layer;
   export const StateContext= createContext();
   
   //Build a Provider which wraps the whole APP and let us Access the data Layer
   //InitialState means how the data layer looks like and tell us what data are you storing in the data Layer 
   export const StateProvider = ({initialState, reducer , children}) => (
       <StateContext.Provider value={useReducer(reducer,initialState)} >
           {children}
       </StateContext.Provider>
   );
   
   //this line enable us to actually use the functionality of stateProvider
   export const useStateValue=()=>useContext(StateContext);