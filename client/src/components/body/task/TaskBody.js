import React ,{ useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Modal from 'react-modal'
import './task.css'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import {isEmpty} from '../../utils/validation/Validation'
import TaskView from './TaskView'

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import {fetchAllTasks, dispatchGetAllTasks} from '../../../redux/actions/taskAction'
const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

  const initialState = {
    title: '',
    description: '',
    priority: '',
    dueDate: '',
    err: '',
    success: ''
}

function TaskBody() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const dispatch = useDispatch()
  const [task, setTask] = useState(initialState)
    
  const token = useSelector(state => state.token)
  const {title, description, priority,  err, success} = task
  const [dueDate, setStartDate] = useState(new Date());
  const handleChangeInput = (e) => {
      const {name,value} = e.target
      setTask({...task, [name]: value, err: '', success: ''})
  }
  const auth = useSelector(state => state.auth)
  const handleSubmit = async e => {

    const userId = auth.user._id
    e.preventDefault()
    if(isEmpty(title) || isEmpty(description) || isEmpty(priority) || isEmpty(dueDate))
            return setTask({...task, err: "Please fill in all fields.", success: ''})

    try {
        const res = await axios.post('/task/create', {
            userId ,title, description, priority, dueDate
        })
        fetchAllTasks(token,auth.user._id).then(res =>{    
            dispatch(dispatchGetAllTasks(res))
        })
        setTask({...task, err: '', success: res.data.msg})
    } catch (err) {
        err.response.data.msg && 
        setTask({...task, err: err.response.data.msg, success: ''})
    }
}



    return (
     <div>
         
         <div className='create-task'>
         <button className='create-task_button' onClick={() => setModalIsOpen(true)}>Create Task</button>
         </div>
            

         <Modal isOpen={modalIsOpen} 
                onRequestClose={() => setModalIsOpen(false)}
                style={customStyles}
                ariaHideApp={false}
         >
             <div className="login_page">
            <h2>Add Task</h2>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input type="text" placeholder="Enter title" id="title"
                    value={title} name="title" onChange={handleChangeInput}/>
                </div>
                <div>
                    <label htmlFor="description">Descriprion</label>
                    <input type="text" placeholder="Enter description" id="description"
                    value={description} name="description" onChange={handleChangeInput}/>
                </div>
                <div>
                    <label htmlFor="priority">Priority</label>
                    <input type="text" placeholder="Enter priority" id="priority"
                    value={priority} name="priority" onChange={handleChangeInput}/>
                </div>
                <div>
                    <label htmlFor="duedate">Due Date</label>
                    <div><DatePicker selected={dueDate} id="dueDate" onChange={date => setStartDate(date)} /></div>
                    
                </div>
                <div className="row">
                    <button type="submit">Create</button>
                </div>
            </form>


        </div>
             {/* <button onClick={() => setModalIsOpen(false)}>Close modal</button> */}
         </Modal>
         <TaskView/>
     </div>
    );
  }

export default TaskBody