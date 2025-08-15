import  './Home.css';
import {useExtension} from '../../context/Browser-context'


export const Home = () => {

    const {name, extensionDispatch} = useExtension();

    const handleFormSubmit = (e) => {   
            e.preventDefault();
    }

    const handleNameChange = (e) => {
        if(e.key === "Enter" && e.target.value.trim().length > 0){
                extensionDispatch({
                    type:'Name',
                    value : e.target.value
                })
        }
        localStorage.setItem('name', e.target.value)
       
    }


    return(
        <div className="main-container">
            <h2>Browser Extension</h2>
            <div className="content">
                <span>Hello! What's your Name ?</span>
                <form onSubmit={handleFormSubmit}>
                    <input required className="inputTag" type="text" onKeyUp={handleNameChange}/>
                </form>
            </div>
        </div>
        
    )
}