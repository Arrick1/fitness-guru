import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'

import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'

/* <----------- styled components -----------> */
const Container = styled.div`
  // background-image: url('https://i.imgur.com/ZtdwQ6Z.jpg');
  background-size: cover;
  height:100vh;
`
const Main = styled.div`
  background-color: rgb(0,0,0,.8);
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  `

const Buttons = styled.section`
  width: 41em;
  display: flex;
  justify-content: space-evenly;
  position: relative;
  top: 14%;
  margin-bottom: 12em;
  .login-button {
    background-color: rgb(255, 255, 255, 0);
    color: orange;
    &:hover {
      border: 3px solid orange;
      color: white;
      background-color: orange;
    }
  }
  `


/* <------- end of styled components --------> */


class Login extends Component {
    state={
        // username:'',
        // password:'',
        // logged: false,
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
      const {username, password, message, logged} = this.state
      console.log(this.props)
     return (
       logged
       ? <Redirect to={`/profile/${this.props.currentUser._id}`} />
       :
       <Container>
          <Buttons>
            <button type="button" onClick={this.showRegisterModal}>
              Register
            </button>
            <button className="login-button" type="button" onClick={this.showLoginModal}>
              Login
            </button>
          </Buttons>

          <Main>
          {
          this.state.registerModal
          ? <RegisterModal
              doSetCurrentUser={this.props.doSetCurrentUser}
              handleRegister={this.props.handleRegister}
              hideRegisterModal={ this.hideRegisterModal }
              registerModal={ this.registerModal }
              showLoginModal={ this.showLoginModal }
            />
          : <div />
        }
        {
          this.state.loginModal
          ? <LoginModal
              doSetCurrentUser={this.props.doSetCurrentUser}
              handleLogin={this.props.handleLogin}
              hideLoginModal={ this.hideLoginModal }
              showRegisterModal={ this.showRegisterModal }
            />
          : < div />
        }
         </Main>

        </Container>
        )
    }
}
export default Login 