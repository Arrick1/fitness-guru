import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

class EditUser extends Component {
    render(){
        return (
            <div className="container">
                <form onSubmit={e => this.props.submitEdit(e)}>
                    <label htmlFor='username'> USERNAME</label>
                        <input value={this.props.username}
                               type="username" 
                               name="username" 
                               onChange={e => this.props.changeHandler(e)}/>
                    <label htmlFor='password'> PASSWORD</label>
                        <input value={this.props.password} 
                               type="password" 
                               name="password" 
                               onChange={e => this.props.changeHandler(e)}/>
                    <button type="submit"> Update</button>
                </form>
            </div>

        )
    }
} 

export default EditUser