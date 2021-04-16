import React from 'react'
import {Switch, Route } from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import ActivationEmail from './auth/ActivationEmail'
import {useSelector} from 'react-redux'
import NotFoundPage from '../utils/NotFountPage/NotFoundPage'
import TaskBody from '../body/task/TaskBody'

function Body() {
    const auth = useSelector(state => state.auth)
    const {isLogged,} = auth
    return (
        <section>
            <Switch>
                <Route path="/" component={isLogged ? TaskBody : Login} exact/>
                <Route path="/login" component={isLogged ? NotFoundPage : Login} exact />
                <Route path="/register" component={isLogged ? NotFoundPage : Register} exact />      
                <Route path="/user/activate/:activation_token" component={ActivationEmail} exact />   
            </Switch>
        </section>
    )
}

export default Body