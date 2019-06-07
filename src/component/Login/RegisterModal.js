import React, {Component}  from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'

/* <----------- styled components -----------> */
import {Modal, Button, Form, FormGroup} from 'react-bootstrap'
/* <------- end of styled components --------> */


class RegisterModal extends Component {
    state = {
      username:'',
      email: '',
      password: '',
      // verify_Password:'',
      logged: false
    }
      
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    registerHandler = (e) =>{
      e.preventDefault();
      this.props.doRegisterUser(this.state)
  }
  render(){
        const { username, password, email } = this.state
        console.log(this.props.currentUser)
        return(
          this.props.isLogged
            ? <Redirect to={`/profile/${this.props.currentUser._id}`}/>
            : <Modal 
                size="sm"
                show={this.props.showRegisterModal} 
                onHide={this.props.hideRegisterModal}
              >
                <Modal.Header>
                  <Modal.Title>Register</Modal.Title>
                </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Username</Form.Label>
                    <input
                      name="username" 
                      type="text" 
                      placeholder="Enter Username" 
                      value={username} 
                      onChange={e => this.handleChange(e)}
                    />
                </Form.Group>
                <FormGroup>
                  <Form.Label>Email</Form.Label>
                    <input
                      name="email" 
                      type="email" 
                      placeholder="Enter Email" 
                      value={email} 
                      onChange={e => this.handleChange(e)}
                    />
                </FormGroup>
                <FormGroup>
                  <Form.Label>Password</Form.Label>
                    <input
                      name="password" 
                      type="password" 
                      placeholder="Enter Password" 
                      value={password} 
                      onChange={e => this.handleChange(e)}
                    />
                </FormGroup>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.registerHandler}>Register</Button>
              <Button onClick={this.props.hideRegisterModal}>Cancel</Button>
            </Modal.Footer>
          </Modal>
        )
      } 
}


export default RegisterModal