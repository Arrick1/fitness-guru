import React, {Component}  from 'react'
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
    .cancel-button {
      top: -2%;
      margin-left: 20px;
      background-color: rgb(0,0,0, .0);
      &:hover {
        border: 4px solid orange;
        background-color: orange;
        color: white;
      }
    }
    .button {
      font-size: 2em;
      height: 2.5em;
      width: 5em;
      margin-bottom: .5em;
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


class RegisterModal extends Component {
    state = {
        username:'',
        password: '',
        verify_Password:'',
        logged: false,
      }
      
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    doRegisterUser = async (e) => {
        e.preventDefault()
        const registerResponse = await fetch('/users/', {
            method: "POST",
            credentials: 'include',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type' : 'application/json'
            }
        }) 
        const parsedResponse = await registerResponse.json()
            if(parsedResponse.user){
                this.props.doSetCurrentUser(parsedResponse.data)
                this.setState({
                    logged: true
                })
            }
    }

    render(){
        const { username, password } = this.state
        return(
            <Modal>
                <div> This is the Register Modal</div>
                <form onSubmit={e => this.doRegisterUser(e)}>
                    <input
                        name="username" 
                        type="text" placeholder="USERNAME" 
                        value={username} 
                        onChange={e => this.handleChange(e)}
                    />
                    <input
                         name="password" type="password" placeholder="PASSWORD" 
                         value={password} 
                         onChange={e => this.handleChange(e)}
                    />
                    <div>
                        <button 
                            onClick={this.doLoginUser} className="button"> Register
                        </button>
                    </div>
                    <div>
                        <button 
                            onClick={this.props.hideLoginModal} className="cancel-button button"> Cancel
                        </button>
                    </div>
                </form>
            </Modal>
        )
    }
}


// const RegisterForm =

export default RegisterModal