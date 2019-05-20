import React from 'react'
import { NavLink } from 'react-router-dom'

import * as routes from '../../constants/routes'
import './NavBar.css'
import 'materialize-css/dist/css/materialize.min.css'



const Nav = ({currentUser, doLogout}) => 

<nav>
<div class="nav-wrapper">
  <a href="/" class="brand-logo center">Fitness-Guru</a>
  <div className='nav black'  >
          {
            currentUser && <NavLink to={`${routes.PROFILE}/${currentUser._id}`} exact activeClassName='selected' ><button className="navButton">Profile</button></NavLink> 
          }
          {
          currentUser && <NavLink to={`${routes.EDIT}/${currentUser._id} `}exact activeClassName='selected' ><button className="navButton">Edit</button></NavLink> 
          }
          <NavLink to={routes.EXERCISE} exact activeClassName='selected'><button className="navButton">Exercises</button></NavLink>  
          {
        currentUser
          ? (<span> {currentUser.username} <button className="navButton" onClick={doLogout}>Logout</button></span>)
          : [<NavLink  key={1} to={routes.REGISTER} exact activeClassName='selected'><button   className="navButton">Register</button></NavLink>,
          <NavLink key={2} to={routes.LOGIN} activeClassName="selected"><button className="navButton">Login</button> </NavLink>]
          }
    </div>
</div>
</nav>


 

export default Nav
