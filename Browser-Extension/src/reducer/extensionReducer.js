export const extensionReducer = (state, {type, value}) => {
    switch(type){
        case "Name" : 
            return {
                ...state,
                name : value,
            }
        case "Time" : 
            return{
                ...state,
                time : value
            }
        case "Message":
            return{
                ...state,
                message : value
            }
        case "Task":
            return {
                ...state,
                task : value
            }
        case "Clear":
            return{
                ...state,
                task:null
            }
        default : 
            return state
    }
}