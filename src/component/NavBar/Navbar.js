import React from 'react'
import { NavLink } from 'react-router-dom'
// import { Button } from 'reactstrap';


import * as routes from '../../constants/routes'
import './NavBar.css'



const Nav = ({currentUser, doLogout}) => 
    <div className='nav'>
          {
            currentUser && <NavLink to={`${routes.PROFILE}/${currentUser._id}`} exact activeClassName='selected' ><button className="navButton">Profile</button></NavLink> 
          }
          <NavLink to={routes.POSTS} exact activeClassName='selected' ><button className="navButton">POSTS</button></NavLink> 
          <NavLink to={routes.EXERCISE} exact activeClassName='selected'><button className="navButton">EXERCISE</button></NavLink>  
          <NavLink to={routes.ROOT} exact activeClassName='selected'><button className="navButton">ROOT</button></NavLink>  
          {
        currentUser
          ? (<span> hello {currentUser.username} <button className="navButton" onClick={doLogout}>LOGOUT</button></span>)
          : [<NavLink  key={1} to={routes.REGISTER} exact activeClassName='selected'><button   className="navButton">Register</button></NavLink>,
          <NavLink key={2} to={routes.LOGIN} activeClassName="selected"><button className="navButton">LOGIN</button> </NavLink>]
          }
    </div>

export default Nav
