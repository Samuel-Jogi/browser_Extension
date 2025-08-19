import {createContext, useContext, useReducer} from 'react';


// initialising initialState here
const initialState={
    name:'',
    age:19
}


// creating context here and sending initialvaue into it so that initial values can be used in the app
const userContext = createContext(initialState);



const context = ({children}) =>{
    // initialising useReducer here
    const [{name, age}, userDispatch] = useReducer(reducer, initialState)
    return(

        // here were making this context  available for all the children which can use it
        <userContext.Provider value={{name, age, userDispatch}}>
            {{children}}
        </userContext.Provider>
    )
}

// here we are creating custom hook to export the context to entire app.
// if we send initialContext then all the children will initial values only the values wont be updated.

const finalContext = () => useContext(userContext)

return {context, finalContext};