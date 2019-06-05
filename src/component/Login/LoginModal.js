import React, {Component}  from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'

/* <----------- styled components -----------> */
const Modal = styled.div`

position: absolute;
  left: 31%;
  top: 11%;
  font-family: 'Roboto', sans-serif;
  background-color: rgb(0, 0, 0, .96);
  border-top: 5px solid orange;
  height: 85vh;
  width: 36.8em;
  h3 {
    margin-left: .7em;
    color: white;
    font-weight: 300;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 76vh;
    p {
      color: white;
      text-decoration: underline;
      text-align: center;
      cursor: pointer;
    }
    button {
      position: relative;
      background-color: orange;
      border: 4px solid orange;
      color: white;
      padding-left: 1em;
      padding-right: 1em;
      margin-top: .5em;
      margin-bottom: .5em;
      &:hover {
        border: 4px solid orange;
        color: orange;
        background-color: rgb(0, 0, 0, 0.5);
        cursor: pointer;
      }
    }
    .button {
        top: -2%;
        margin-left: 20px;
        background-color: rgb(0,0,0, .0);
        &:hover {
          border: 4px solid orange;
          background-color: orange;
          color: white;
        }
      }
  input {
    width: 70%;
    padding-top: 5%;
    display: block;
    background: 0;
    border: 0;
    border-bottom: 2px solid white;
    color: #fff;
    font-weight: 600;
    font-size: 2em;
    padding-bottom: 8px;
    outline: 0;
    text-align: center;
    }
  }
`
const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-size: 3em;
  top: 3%;
  margin-top: .5em;
`
/* <------- end of styled components --------> */


class LoginModal extends Component {
    state = {
        username:'',
        password: '',
        // currentUser: {},
        logged: false
      }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    doLoginUser = async (e) => {
        e.preventDefault()
        const loginResponse = await fetch('users/login', {
            method: "POST",
            credentials: 'include',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type' : 'application/json'
            }
        }) 
        const parsedResponse = await loginResponse.json()
            if(parsedResponse.data){
                this.props.doSetCurrentUser(parsedResponse.data)
                localStorage.setItem('current', JSON.stringify(parsedResponse.user))
                this.setState({
                    logged: true,
                    currentUser: parsedResponse.user
                })
            } else {
                this.setState({
                    message: 'Invalid Login Credentials'
                })
            }

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
            :
            <Modal>
                <Header> LOGIN</Header>
                {/* <form onSubmit={e => this.doLoginUser}> */}
                    <form>
                    <input
                        name="username" type="text" placeholder="USERNAME" value={username} onChange={this.handleChange}
                    />
                    <input
                         name="password" type="password" placeholder="PASSWORD" value={password} onChange={this.handleChange}
                    />
                    <div>
                        <button 
                            onClick={this.loginHandler} className="button"> Login
                        </button>
                    </div>
                    <div>
                        <button 
                            onClick={this.props.hideLoginModal} className="button"> Cancel
                        </button>
                    </div>
                </form>
            </Modal>
            
        )
    }
}

export default LoginModal