import React, {useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import './task.css'

function EditTask(props) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const editButtonClick = e => {
      e.stopPropagation();
      e.cancelBubble = true
      setShow(true)
    };

    

    const deleteButtonClick = e => {
      e.stopPropagation();
      
    }
  
    return (
      <>
        

          <i className="fas fa-edit hover-icons" onClick={editButtonClick} ></i>    
          
         
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>asdasdasdasdasdasd</Modal.Title>
          </Modal.Header>
          <Modal.Body>{props.task.description}</Modal.Body>
          <Modal.Body>{props.task.dueDate}</Modal.Body>
          <Modal.Footer>
            <button variant="secondary" onClick={handleClose}>
              Close
            </button>
            <button variant="primary" onClick={handleClose}>
              Save Changes
            </button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
  export default EditTask