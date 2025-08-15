import { useState, useEffect } from 'react'
import {images} from './utils/images';
import { quotes } from './utils/quotes';
import {Home} from './Pages/Home/Home';
import {useExtension} from './context/Browser-context'
import Task from './Pages/task/Task'
import './App.css'

  const index = Math.floor(Math.random() * images.length);
  console.log(index)
  const bgImage = images[index].image;

function App() {

  const [count, setCount] = useState();

  const {name, time, extensionDispatch} = useExtension();


  useEffect(()=>{
    const userName = localStorage.getItem('name')
    extensionDispatch({
      type:'Name',
      value: userName
    })
    

  },[time])

  return (
    <div className="images" style={{backgroundImage:`url("${bgImage}")`}}>
      {
        name ? <Task value={{name, time}}/> :   <Home />
      }
    
    </div>
  )
}

export default App
