import {useState, useEffect} from 'react';
import {v4 as uuidv4} from 'uuid';
import './Todo.css';

const Todo = () => {
    const [todo, setTodo] = useState('');
    const [todoList, setTodoList] = useState([]);
    const [errorMessage, setErrorMessage] = useState("")
    // const [isCompleted, setIsCompleted] = useState(false)

useEffect(() => {
    const stored = localStorage.getItem('todo');
    let userTodo = [];
    if (stored) {
        try {
            userTodo = JSON.parse(stored);
            if (!Array.isArray(userTodo)) {
                userTodo = [];
            }
        } catch (e) {
            userTodo = [];
        }
    }
    setTodoList(userTodo);
}, []);
    const handleChangeTodo = (e) =>{
            setTodo(e.target.value);
            if(e.target.value.trim() === ""){
                setErrorMessage("")
            }  
    } 
    
    
    const handleTodoEnterKey = (e) => {
        if(e.key === "Enter" ){
            // setIsCompleted(false)
            if(todoList.length > 6){
                setErrorMessage("Max limit is reached")
            }else{
            const updatedTodoList = [...todoList,{_id:uuidv4(), todo, isCompleted:false}]
            setTodoList(updatedTodoList);  
             e.target.value = ""
            localStorage.setItem('todo', JSON.stringify(updatedTodoList))
            setTodo('')
            setErrorMessage('')
            }
        }
    }

    const handleFormSubmit = (e) =>{
        e.preventDefault();
    }

    const handleTodoCheck= (id) => {
          const updatedTodoList = todoList.map((t) => id === t._id ? {...t, isCompleted: !t.isCompleted} : t)
          setTodoList(updatedTodoList);
          localStorage.setItem('todo', JSON.stringify(updatedTodoList))
    }

    const handleTodoClear= (id) =>{
        const updatedTodoList = todoList.filter((t)=> id !== t._id)
        if(updatedTodoList.length <=7){
            setErrorMessage("")
        }
        setTodoList(updatedTodoList);
        localStorage.setItem('todo', JSON.stringify(updatedTodoList))
    }      
    return (
        <div className="todoContainer"> 

        <div className="todoList" >
            {todoList && todoList.map(({_id, isCompleted, todo})=>{
                return(
                        <div className="todoLabel" key={_id}>
                            <label className="cursor"><input onChange={ ()=>handleTodoCheck(_id)} checked={isCompleted} className="cursor todoCheck"  type="checkbox"></input>
                            <span style={{textDecoration:isCompleted ? "line-through" : 'none'}} >{todo}</span></label>
                            <p>{isCompleted}</p>
                            <button className="todoClear-btn" onClick={()=>handleTodoClear(_id)}>
                            <span  className="material-icons-outlined cursor">
                                clear
                            </span>
                            </button>
                        </div>
                )
            })}
        </div>
            <div className="inputDiv">
                <form onSubmit={handleFormSubmit}>
                <input className="todoBar" type="text" maxLength={30} onChange={handleChangeTodo} onKeyUp={handleTodoEnterKey}/>
                </form>
                {errorMessage && <p style={{color:"red"}}>{errorMessage}</p>}
            </div>
        </div>
    )
}

export default Todo;