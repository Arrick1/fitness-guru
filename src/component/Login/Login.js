import React, { Component } from 'react'
import styled from 'styled-components'

import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'

import { Button, Container } from 'react-bootstrap'

/* <----------- styled components -----------> */
// const Container = styled.div`
//   background-image: url('https://i.imgur.com/ZtdwQ6Z.jpg');
//   background-size: cover;
//   height:100vh;
// `
// const Main = styled.div`
//   // background-color: rgb(0,0,0,.8);
//   height: 100vh;
//   width: 100vw;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   color: white;
//   `




/* <------- end of styled components --------> */

class Login extends Component {
    state={
        registerModal: false,
        loginModal: false
    }
    showRegisterModal = () => {
      this.setState({ registerModal: true, loginModal:false })
    }
    hideRegisterModal = () => {
      this.setState({ registerModal: false })
    }
    showLoginModal = () => {
      this.setState({ loginModal: true})
    }
    hideLoginModal = () => {
      this.setState({ loginModal: false })
    }
    render() {
      console.log(this.props.currentUser)
     return (
       <Container>
          
            <Button  onClick={this.showRegisterModal}>
              Register
            </Button>
            <Button onClick={this.showLoginModal}>
              Login
            </Button>
          
         
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
            {
              this.state.loginModal
              ? <LoginModal
                  isLogged={this.props.isLogged}
                  currentUser={this.props.currentUser}
                  doSetCurrentUser={this.props.doSetCurrentUser}
                  doLoginUser={this.props.doLoginUser}
                  hideLoginModal={ this.hideLoginModal }
                  showLoginModal={ this.showLoginModal }
                 />
              : < div />
            }
          
        </Container>
        )
      }
}
export default Login 