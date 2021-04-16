import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'

function Header() {
    const auth = useSelector(state => state.auth)
    
    const {user, isLogged} = auth

    const handleLogout = async () => {
        try {
            await axios.get('/user/logout')
            localStorage.removeItem('firstLogin')
            window.location.href = "/";
        } catch (err) {
            window.location.href = "/";
        }
    }

    const userLink = () => {
        return <li className="drop-nav">
            <Link to="#">
            {user.name}
            </Link>
         
           
                <div><Link to="/" onClick={handleLogout}>Logout</Link></div>
      
        </li>
    }

    return (
        <header>
            <div>
                <h1><Link to="/">Task Management</Link></h1>
            </div>
            <div>
         <div className='create-task'>
         <div className='header-task-button' >Uncompleted Task</div>
         </div>
         
         <div className='create-task'>
         <div className='header-task-button_completed' >Completed Task</div>
         </div>
         </div>
            <ul>
               
                {
                    isLogged
                    ? userLink()
                    :<li><Link to="/login"><i className="fas fa-user"></i> Sign in</Link></li>
                }
            </ul>
        </header>
    )
}

export default Header