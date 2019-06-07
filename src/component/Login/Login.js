import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'


/* <------- Components --------> */
import RegisterModal from './RegisterModal'


/* <------- React of styled components --------> */
import { Button, Form, Col, Row, Container} from 'react-bootstrap'




class Login extends Component {
    state={
      username:'',
      password: '',
      logged: false,
      registerModal: false,
    }
    showRegisterModal = () => {
      this.setState({ registerModal: true, loginModal:false })
    }
    hideRegisterModal = () => {
      this.setState({ registerModal: false })
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
    render() {
      const { username, password } = this.state
      console.log(this.props.currentUser)
     return (
      this.props.isLogged
      ? <Redirect to={`/profile/${this.props.currentUser._id}`}/>
      : <div>
        <Row xs={5}> Row 1 of 3</Row>
        <Row>Row 2
        <Col>1 of 3</Col>Row 2
        <Col> 2 of 3
        <Form > 
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
            {
              this.props.message
           }
      </Form>
        <Button  onClick={this.showRegisterModal}>Register</Button>
        </Col>
        Row 2<Col>3 of 3</Col>
        </Row>Row 3
        <Row>
      

        </Row>
          {
            this.state.registerModal
          ? <RegisterModal
              isLogged={this.props.isLogged}
              currentUser={this.props.currentUser}
              registerModal={this.RegisterModal}
              doSetCurrentUser={this.props.doSetCurrentUser}
              doRegisterUser={this.props.doRegisterUser}
              hideRegisterModal={ this.hideRegisterModal }
              showRegisterModal={this.showRegisterModal}
            />
          : <div/>
          }
  
        </div>
        )
      }
}
export default Login 