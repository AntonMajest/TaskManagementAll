import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Modal from 'react-bootstrap/Modal'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import './task.css'
import {fetchAllTasks, dispatchGetAllTasks} from '../../../redux/actions/taskAction'
const initialState = {
  title: '',
  description: '',
  priority: '',
  dueDate: '',
  err: '',
  success: ''
}

function CompleteTask(props) {
  const auth = useSelector(state => state.auth)
  const token = useSelector(state => state.token)
    const [title, setTitle] = useState(props.task.title)
    const [description, setDescription] = useState(props.task.description)
    const [priority, setPriority] = useState(props.task.priority)
    const [dueDate, setDuedate] = useState(props.task.dueDate)
    const [isDone, setisDone] = useState(props.task.isDone)
    const [data, setData] = useState(initialState)
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
   
    const [callback, setCallback] = useState(false)
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);
    const dispatch = useDispatch()
    const [task, setTask] = useState(initialState)
    const editButtonClick = e => {
      e.stopPropagation();
      handleShowEdit()
    };

    useEffect(() => {
      setisDone(props.task.isDone)
    }, [props.task.isDone])

    const deleteButtonClick = async (e)  => {
      e.stopPropagation();
      try {
        if(props.task._id){
            if(window.confirm("Are you sure you want to delete this task?")){
                await axios.delete(`/task/delete/${props.task._id}`, {
                    headers: {Authorization: props.token}
                })
                fetchAllTasks(token,auth.user._id).then(res =>{    
                  dispatch(dispatchGetAllTasks(res))
              })
                setCallback(!callback)
            }
        }    
    } catch (err) {
        setData({...data, err: err.response.data.msg , success: ''})
    }
    }

 
    
    const updateTask = () => {
      try {
          axios.patch('/task/update', {
              id: props.task._id,
              title: title,
              description: description,
              isDone: !!isDone,
              priority: priority,
              dueDate: dueDate,
          },{
            headers: {Authorization: props.token}
        })
        
        fetchAllTasks(token,auth.user._id).then(res =>{    
          dispatch(dispatchGetAllTasks(res))
      })

          setTask({...task, err: '' , success: "Updated Success!"})
      } catch (err) {
          setTask({...task, err: err.response.data.msg , success: ''})
      }
      }

    const completeTask = (e) => {
      setisDone(e.target.checked)
      try {
        axios.patch('/task/update', {
            id: props.task._id,
            title: title,
            description: description,
            isDone: !isDone,
            priority: priority,
            dueDate: dueDate,
        },{
          headers: {Authorization: props.token}
      })
      
      fetchAllTasks(token,auth.user._id).then(res =>{    
                  dispatch(dispatchGetAllTasks(res))
              })

        setTask({...task, err: '' , success: "Updated Success!"})
    } catch (err) {
        setTask({...task, err: err.response.data.msg , success: ''})
    }
      
    }
  
    return (
      <>
        <div>
         
        <div id='task_title' variant="primary" onClick={handleShow} className={!props.task.isDone ? 'task-button' : 'task-button_completed'}>
          {props.task.title}  
          <div className="descr">
          <i className={'ed-dl-button'} onClick={editButtonClick}>Edit</i>    
          <i className={'ed-dl-button'}  onClick={deleteButtonClick}>Delete</i>  
          <input checked={isDone} onChange={e => completeTask(e)} onClick={e => {e.stopPropagation()}}type="checkbox"/>  
          </div>
        </div>
        </div>

        <Modal show={showEdit} onHide={handleCloseEdit}
         >
             <div className="login_page">
            <h2>Edit Task</h2>
                <div>
                    <label htmlFor="title">Title</label>
                    <input type="text" placeholder="Enter title" id="title"
                    value={title} name="title" onChange={e => setTitle(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="description">Descriprion</label>
                    <input type="text" placeholder="Enter description" id="description"
                    value={description} name="description" onChange={e => setDescription(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="priority">Priority</label>
                    <input type="text" placeholder="Enter priority" id="priority"
                    value={priority} name="priority" onChange={e => setPriority(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="duedate">Due Date</label>
                    <div>
                      <DatePicker selected={new Date(dueDate)} id="dueDate" onChange={date => setDuedate(date)} />
                    </div>
                </div>
                <div className="row">
                    <button onClick={updateTask}>Update</button>
                 </div>
                 </div>
            
         </Modal>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{props.task.title} </Modal.Title>
          </Modal.Header>
          <Modal.Body>Descriprion: {props.task.description}</Modal.Body>
          <Modal.Body>Priority: {props.task.priority}</Modal.Body>
          <Modal.Body>DueDate: <DatePicker selected={new Date(dueDate)} id="dueDate" onChange={date => setDuedate(date)} /></Modal.Body>
          <Modal.Footer>
            <button className='create-task_button' variant="secondary" onClick={handleClose}>
              Close
            </button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
  export default CompleteTask