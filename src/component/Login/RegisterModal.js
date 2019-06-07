import React, {Component}  from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'

/* <----------- styled components -----------> */
import {Modal, Button, Form, FormGroup} from 'react-bootstrap'
/* <------- end of styled components --------> */


class RegisterModal extends Component {
    state = {
      name: '',
      username:'',
      email: '',
      password: '',
      verify_Password:'',
      logged: false,
    }
      
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    loginHandler = (e) =>{
      e.preventDefault();
      this.props.doRegisterUser(this.state)
  }
    // doRegisterUser = async (e) => {
    //     e.preventDefault()
    //     const registerResponse = await fetch('/users/', {
    //           method: "POST",
    //           credentials: 'include',
    //           body: JSON.stringify(this.state),
    //           headers: {
    //             'Content-Type' : 'application/json'
    //           }
    //     }) 
    //     const parsedResponse = await registerResponse.json()
    //         if(parsedResponse.user){
    //           this.props.doSetCurrentUser(parsedResponse.data)
    //           this.setState({
    //             logged: true,
    //           })
    //         }
    // }
    render(){
        const { username, password, name, email } = this.state
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
              <FormGroup>
                  <Form.Label>Name</Form.Label>
                    <input
                      name="name" 
                      type="text" 
                      placeholder="Enter Name" 
                      value={name} 
                      onChange={e => this.handleChange(e)}
                    />
                </FormGroup>
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
              <Button onClick={this.props.doRegisterUser}>Register</Button>
              <Button onClick={this.props.hideRegisterModal}>Cancel</Button>
            </Modal.Footer>
          </Modal>
        )
      } 
}


export default RegisterModal