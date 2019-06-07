import React, {Component}  from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'

/* <----------- styled components -----------> */
import {Modal, Button, ModalBody, Form} from 'react-bootstrap'

class LoginModal extends Component {
    state = {
        username:'',
        password: '',
        logged: false
      }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    loginHandler = (e) =>{
        e.preventDefault();
        this.props.doLoginUser(this.state)
    }
    render(){
        const { username, password } = this.state
        console.log(this.props.currentUser)
        return(
            this.props.isLogged
            ? <Redirect to={`/profile/${this.props.currentUser._id}`}/>
            : <Modal 
                size="sm" 
                aria-labelledby="example-modal-sizes-title-sm"
                show={this.props.showLoginModal} 
                onHide={this.props.hideRegisterModal}
                >
                <Modal.Header>
                    <Modal.Title id="example-modal-sizes-title-sm">
                      Login
                    </Modal.Title>
                  </Modal.Header>
                  <ModalBody>
                    <Form>
                      <Form.Group>
                        <Form.Label>Username</Form.Label>
                          <input
                            name="username" 
                            type="text" 
                            placeholder="Enter Username" 
                            value={username} 
                            onChange={this.handleChange}/>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Password</Form.Label>
                          <input
                            name="password" 
                            type="password" 
                            placeholder="Enter Password" 
                            value={password} 
                            onChange={this.handleChange}/>
                      </Form.Group>
                      <Button onClick={this.loginHandler}>Login</Button>
                      <Button onClick={this.props.hideLoginModal}>Cancel</Button>
                  </Form>
                </ModalBody>
            </Modal>  
        )
    }
}

export default LoginModal