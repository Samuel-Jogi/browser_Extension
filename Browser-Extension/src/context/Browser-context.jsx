import React, {createContext, useContext, useReducer } from 'react';
import {extensionReducer} from '../reducer/extensionReducer'




const initialValue={
    name : "",
    time : '',
    message :'',
    task : null
}
const extensionContext = createContext(initialValue);

const BrowserProvider = ({children}) => {

    const [{name, time, message, task}, extensionDispatch] = useReducer(extensionReducer, initialValue)
    return (
        <extensionContext.Provider value={{name, time,message,task, extensionDispatch}}>
        {children}
        </extensionContext.Provider>
    )
}

const useExtension = () => useContext(extensionContext);

export  { useExtension, BrowserProvider}