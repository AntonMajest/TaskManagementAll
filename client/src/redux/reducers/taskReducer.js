import ACTIONS from '../actions/'

const tasks =[]

const tasksReducer = (state = tasks, action) => {
    switch(action.type){
        case ACTIONS.GET_ALL_TASKS:
            return action.payload
        default:
            return state
    }
}

export default tasksReducer