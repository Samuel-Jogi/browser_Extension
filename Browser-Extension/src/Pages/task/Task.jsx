import './Task.css'
import React,{useEffect,useState, useRef} from 'react';
import {useExtension} from '../../context/Browser-context';
import {quotes} from '../../utils/quotes';
import Todo from '../../components/Todo/Todo.jsx';


const index = Math.floor(Math.random() * quotes.length);
const quote = quotes[index].quote;

const Task = () => {
    const myRef = useRef(null);
    // const booleanChecking = JSON.parse(localStorage.getItem("checkedStatus"))
    const [isChecked, setIsChecked] = useState(false);
    const {name, time,message,task, extensionDispatch} = useExtension();
    const[isTodoOpen, setIsTodoOpen]  = useState(false);

    useEffect(()=>{
        if(isTodoOpen){
            setIsTodoOpen(true)
        }
        else setIsTodoOpen(false)
        if(new Date().getDate() !== localStorage.getItem('date')){
            localStorage.removeItem('date')
            localStorage.removeItem("task")
            localStorage.removeItem('checkedStatus')
        }
    },[])
    useEffect(()=>{
        const booleanChecking = localStorage.getItem('checkedStatus');
        if(booleanChecking === "true"){
            setIsChecked(true)
        }else setIsChecked(false) 
    },[])
    useEffect(()=>{
        myRef.current.focus();
        const userTask = localStorage.getItem("task")
         extensionDispatch({
                type:'Task',
                value : userTask
            });
    },[])
    useEffect(() => {
        getPresentTime()
},[time])
    const getPresentTime = () => {
        const today = new Date();
        const hours = today.getHours();
        const minutes = today.getMinutes();
        const hour = hours < 10 ? `0${hours}` : hours
        const minute = minutes < 10 ? `0${minutes}` : minutes
        const currentTime = `${hour} : ${minute}`

        setTimeout(getPresentTime,1000)
        const message = hour < 12 ? "Good Morning" : hour > 12 && hour < 17 ? "Good Afternoon" : "Good Evening"

        extensionDispatch({
            type:'Time',
            value : currentTime
        })

        extensionDispatch({
            type : 'Message',
            value : message
        })


    }

    const handleTaskPage = (e) => {
        e.preventDefault();
    }

    const handleTaskChange = (e) => {
        if(e.key === "Enter" && e.target.value.trim().length > 0){
            extensionDispatch({
                type:'Task',
                value : e.target.value
            })
            
            //  task[task.length + 1] = e.target.value
            //  const formattedTasks = task
            setIsChecked(false)
            localStorage.setItem("task",e.target.value)
            localStorage.setItem("Date", new Date().getDate())
            localStorage.setItem('checkedStatus', isChecked)
            e.target.value = ""
       
        }
    }

    const handleCheckBox = (e) => {
        const check = e.target.checked
        setIsChecked(check)
        // if(e.target.checked){
        //     setIsChecked(isChecked =>!isChecked)
        // }
        // else setIsChecked(isChecked => !isChecked)

        localStorage.setItem('checkedStatus', check)
    }

    const handleClearButton = () => {
        extensionDispatch({
            type : "Clear"
        })
        setIsChecked(false)
        localStorage.removeItem('task')
        localStorage.removeItem('checkedStatus')
    }


    const handleTodoButton = () =>{
        console.log(isTodoOpen);
        setIsTodoOpen(isTodoOpen => !isTodoOpen)
        // console.log(isTodoOpen);
    }

    const handleNameChangeBtn = () => {
            extensionDispatch({
                type:'Name',
                payload:''
            })
            localStorage.setItem('name','')
    }

    return(
        <div className="task-Container">
            <h1>{time}</h1>
        <h1>{message} {name} </h1>

        <form onSubmit={handleTaskPage}>
            <span>What's your main focus today ?</span>
            <input  ref={myRef}  className="inputTag" type="text" onKeyUp={handleTaskChange} />
            <div className="btnDiv">
            <button className="changerBtn" onClick={handleNameChangeBtn}>Change Name</button>
            </div>
            {name !== null &&  task !== null ? (           
            <div>
                <h3>Today's tasks</h3>
                <div className="tasks">

                    <label className="heading">
                        <input  className="check cursor" checked={isChecked} type="checkbox" onChange={handleCheckBox} ></input>
                        <span style={{textDecoration:isChecked ? "line-through" : "none"}} className="spantag cursor">{task}</span>
                        </label>
                    <button className="button cursor" onClick={handleClearButton}>
                        <span className="material-icons-outlined">
                                clear
                        </span>
                    </button>
            
                </div>
   
            </div>) :"" }
           

        </form>
        
         <footer className="quotes"><span>{quote}</span></footer>

         {isTodoOpen && <Todo />}

         <div className="todoButtonContainer">
            <button className="todoButton cursor " onClick={handleTodoButton}>ToDo</button>
         </div>
        
        </div>
    )
}

export default Task