import {combineReducers} from 'redux'
import auth from './authReducer'
import token from './tokenReducer'
import tasks from './taskReducer'

export default combineReducers({
    auth,
    token,
    tasks
})