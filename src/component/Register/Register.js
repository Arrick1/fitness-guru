import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import * as routes from '../../constants/routes'
import './Register.css'


class Register extends Component {
    state={
        username:'',
        password:'',
        logged: false
    }

    changeHandler = e => {
        this.setState({
          [e.target.name]: e.target.value
        })
      }

      onSubmit = async (e) => {
        e.preventDefault();
        const registerResponse = await fetch('/users/',{
          method: "POST",
          credentials: 'include',
          body: JSON.stringify(this.state),
          headers: {
            "Content-Type" : 'application/json'
          }
        })

         const parsedResponse = await registerResponse.json();
            console.log(parsedResponse)
            if(parsedResponse.user){
              console.log(parsedResponse)
                this.props.doSetCurrentUser(parsedResponse.data)
                this.setState({
                  logged: true
                })
            }
    }

      
    render() {
        const {username, password} = this.state
        return( 
            <div>
                {
                    this.state.logged
                    ? <Redirect to={routes.ROOT}/>
                    : <RegisterForm
                        changeHandler ={this.changeHandler}
                        onSubmit ={this.onSubmit}
                        username={username}
                        password={password}
                        />
                }
            </div>
        )
    }
}

const RegisterForm = ({ changeHandler, onSubmit, username, password }) =>
                <form onSubmit ={e => onSubmit(e)}>
                    <label htmlFor='username'> USERNAME</label>
                    <input onChange={e => changeHandler(e)} type='text' name="username"  value={username} /> <br/>
                    <label htmlFor='password'> PASSWORD</label>
                    <input onChange={e => changeHandler(e)} type='password' name="password" value={password}/><br/>
                    <button className="navButton" type="submit">Register</button>
                </form>


export default Register