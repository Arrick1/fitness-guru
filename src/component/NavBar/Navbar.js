import React from 'react'
import { NavLink } from 'react-router-dom'

import * as routes from '../../constants/routes'

// -----------> Reactstap Styling 
import { Navbar, Nav, Button, NavDropdown, Container } from 'react-bootstrap'



const Navi  = ({currentUser, doLogout}) => {
return(
<Navbar bg="dark" variant="dark" fixed="top">
  <NavLink to={routes.ROOT}><Navbar.Brand>Fitness-Guru</Navbar.Brand></NavLink>
  <Nav className="mr-auto">
    <Nav.Link className="link"><NavLink to={routes.EXERCISE}>Exercises</NavLink>  </Nav.Link>
    <Nav.Link className="link"><NavLink to={routes.COMMUNITY}>Community</NavLink>  </Nav.Link>
    <Nav.Link></Nav.Link>
      
    <Nav.Link>
      
      {
        currentUser.username
        ? <NavDropdown title="Dashboard" id="basic-nav-dropdown">
             <NavDropdown.Item>
              <NavLink className="nav-link" exact to={`${routes.PROFILE}/${currentUser._id}`}>Profile</NavLink>
            </NavDropdown.Item>
            <NavDropdown.Divider/>

            <NavDropdown.Item>
              <NavLink className="nav-link" to={`${routes.EDIT}/${currentUser._id} `}>Account Settings</NavLink> 
            </NavDropdown.Item>
            <NavDropdown.Divider/>

            <NavDropdown.Item>
              <NavLink className="nav-link" onClick={doLogout}>Logout {currentUser.username}</NavLink> 
            </NavDropdown.Item>
            <NavDropdown.Divider/>
      
          </NavDropdown>
        : <NavLink to={routes.LOGIN}>Login</NavLink>

      }
    </Nav.Link>
  </Nav>
</Navbar>
)
}



 

export default Navi
