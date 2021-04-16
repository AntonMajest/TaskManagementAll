import ACTIONS from './index'
import axios from 'axios'

export const fetchAllTasks = async (token,userId) => {
    const res = await axios.get('/task/all_tasks', {
        headers: {Authorization: userId},
    })
    return res
}

export const dispatchGetAllTasks = (res) => {
    return {
        type: ACTIONS.GET_ALL_TASKS,
        payload: res.data
    }
}