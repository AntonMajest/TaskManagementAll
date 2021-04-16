import React, {useState, useEffect} from 'react'

import {useSelector, useDispatch} from 'react-redux'

import {showSuccessMsg, showErrMsg} from '../../utils/notification/Notification'
import {fetchAllTasks, dispatchGetAllTasks} from '../../../redux/actions/taskAction'
import './task.css'

import CompleteTask from './CompleteTask'
import axios from 'axios'
import 'react-calendar/dist/Calendar.css';

const initialState = {
    title: '',
    description: '',
    priority: '',
    isDone:'',
    dueDate: '',
    err: '',
    success: ''
  }

function TaskView() {
    const [, setTask] = useState(initialState)
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
  
    const tasks = useSelector(state => state.tasks)
    
    const {user, } = auth
    const [data, ] = useState(initialState)
    const {err, success} = data
    
    const [loading, ] = useState(false)
    const [callback, ] = useState(false)
    const [filter, setFilter] = useState(1)
    const dispatch = useDispatch()
    
    useEffect(() => {
        if(user){
            fetchAllTasks(token,auth.user._id).then(res =>{    
                dispatch(dispatchGetAllTasks(res))
            })
        }
    },[token, user, dispatch, callback])

    

   
    
    let allTask = []
    const markAll = () => {
            tasks.map(task => {
                if(task.isDone){
                    allTask = [task.isDone]
                } else {
                    allTask = [!task.isDone]
                    try {
                        axios.patch('/task/update', {
                            id: task._id,
                            title: task.title,
                            description: task.description,
                            isDone: !!allTask,
                            priority: task.priority,
                            dueDate: task.dueDate,
                        },{
                          headers: {Authorization: token}
                      })
                
                      fetchAllTasks(token,auth.user._id).then(res =>{    
                        dispatch(dispatchGetAllTasks(res))
                    })
                        setTask({...task, err: '' , success: "Updated Success!"})
                    } catch (err) {
                        setTask({...task, err: err.response.data.msg , success: ''})
                    }
                }
               
                return allTask
                
            })         
    }

    const unmarkAll = () => {
        tasks.map(task => {
            if(task.isDone){
                allTask = [!task.isDone]
                try {
                    axios.patch('/task/update', {
                        id: task._id,
                        title: task.title,
                        description: task.description,
                        isDone: !allTask,
                        priority: task.priority,
                        dueDate: task.dueDate,
                    },{
                      headers: {Authorization: token}
                  })
                  fetchAllTasks(token,auth.user._id).then(res =>{    
                    dispatch(dispatchGetAllTasks(res))
                })
                    setTask({...task, err: '' , success: "Updated Success!"})
                } catch (err) {
                    setTask({...task, err: err.response.data.msg , success: ''})
                }
            } else {
                allTask = [task.isDone]
            }
            
            return allTask
        })         
}


// const sortByDone = () => {
//     tasks.sort((a, b) => b.isDone - a.isDone)
//     setTask({...tasks, err: '' , success: "Updated Success!"})
// }

const sortCompleteFirst = () => {
    setFilter(1)
}

const sortByPriority = () => {
    tasks.sort((a, b) => a.priority - b.priority)
    setTask({...tasks, err: '' , success: "Updated Success!"})
}

const sortByLessPriority = () => {
    tasks.sort((a, b) => b.priority - a.priority)
    setTask({...tasks, err: '' , success: "Updated Success!"})
}

// const sortByDoneFirst = () => {
//     tasks.sort((a, b) => a.isDone - b.isDone)
//     setTask({...tasks, err: '' , success: "Updated Success!"})
// }

const sortUncompleteFirst = () => {
    setFilter(0)
}



 

    return (
        <>
    <div>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        {loading && <h3>Loading.....</h3>}
    </div>
    <div className={'markUnmarkAll'}>
    <button onClick={markAll} className='create-task_button'>Mark All</button>
    <button onClick={unmarkAll} className='create-task_button'>Unmark All</button>
    </div>
        <div className={'sort-button_block'}>
        <div ><b>Sort By</b></div>   
        <div className={'sort-button'}>
        <button onClick={sortByPriority} className='sort-by_button'>Priority</button>
        <button onClick={sortByLessPriority} className='sort-by_button'>Less priority</button>
        <button onClick={sortCompleteFirst} className='sort-by_button'>Done</button>
        <button onClick={sortUncompleteFirst} className='sort-by_button'>Not Done</button>
         </div>
        </div>
    <div className="tasks_page">
        {
            filter ? <><div className="task-view">
            {
            tasks.map(task => {
                if(!task.isDone){
                    return (
                        <div className='complete_task'><CompleteTask task={task} token={token} key={task._id}/></div>
                     )
                }
            })
            }
        </div>
        <div className="task-view_complete">
            {
            tasks.map(task => {
                if(task.isDone){
                    return (
                        <div className='complete_task'><CompleteTask task={task} token={token} key={task._id}/>             </div>
                     )
                }
            })
            }
        </div></> : <>
        <div className="task-view_complete">
            {
            tasks.map(task => {
                if(task.isDone){
                    return (
                        <div className='complete_task'><CompleteTask task={task} token={token} key={task._id}/>             </div>
                     )
                }
            })
            }
        </div>
        <div className="task-view">
            {
            tasks.map(task => {
                if(!task.isDone){
                    return (
                        <div className='complete_task'><CompleteTask task={task} token={token} key={task._id}/></div>
                     )
                }
            })
            }
        </div>
        </>
        }
    </div>
</>
    )
}

export default TaskView

