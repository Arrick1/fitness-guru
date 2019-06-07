import React, {Component}  from 'react'
import { Redirect } from 'react-router-dom'

// /* <----------- styled components -----------> */
import {Modal, Button, Form, FormGroup} from 'react-bootstrap'



class EditUserModal extends Component {
    state = {
      name: '',
      username:'',
      email: '',
      password: '',
      logged: false, 
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    editHandler = (e) =>{
        e.preventDefault();
        this.props.doEditUser(this.state)
        this.props.hideEditUserModal()
    }
    render(){
        const { username, password, name, email } = this.state
        console.log(this.props.currentUser)
        return(
            this.props.isLogged
            ? <Redirect to={`/profile/${this.props.currentUser._id}`}/>
            : <Modal 
                size="sm"
                show={this.props.showEditUserModal} 
                onHide={this.props.EditUserModal}
              >
               <Modal.Header>
                  <Modal.Title>Edit your info</Modal.Title>
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
              <Button onClick={this.editHandler}>Save</Button>
              <Button onClick={this.props.hideEditUserModal}>Cancel</Button>
            </Modal.Footer>
            </Modal>  
        )
    }
}
export default EditUserModal