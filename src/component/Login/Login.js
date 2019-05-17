import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import './Login.css'

class Login extends Component {
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
        const loginResponse = await fetch('/users/login',{
          method: "POST",
          credentials: 'include',
          body: JSON.stringify(this.state),
          headers: {
            "Content-Type" : 'application/json'
          }
        })

         const parsedResponse = await loginResponse.json();
            if(parsedResponse.data){
              console.log(parsedResponse)
                this.props.doSetCurrentUser(parsedResponse.data)
                this.setState({
                  logged: true
                })
            } else {
              this.setState({
                message: 'Try again'
              })
            }
    }

    render() {
      const {username, password} = this.state
      console.log(this.props)
     return (
       this.state.logged
       ? <Redirect to={`/profile/${this.props.currentUser._id}`} />
       :
       <form onSubmit={this.onSubmit}>
        <label htmlFor='username'> USERNAME</label>
        <input type='text' name="username" value={username} onChange={this.changeHandler}/>
        <label htmlFor='password'> PASSWORD</label>
        <input type='password' name="password" value={password} onChange={this.changeHandler}/>
        <button className="navButton" type="submit">Login</button> 
            {
              this.state.message
            }
        </form>
        )
    }
}
export default Login 