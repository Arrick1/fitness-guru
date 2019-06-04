import React, { Component } from 'react'


class EditUser extends Component {
    changeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render(){
        return (
            <div className="container">
                <form onSubmit={e => this.props.submitEdit(e)}>
                        <input 
                            value={this.props.username}
                            type="username" 
                            name="username" 
                            onChange={e => this.changeHandler(e)}/>
                        <input 
                            value={this.props.password}type="password" 
                            name="password" 
                            onChange={e => this.changeHandler(e)}/>
                        <button type="submit"> Update</button>
                </form>
            </div>

        )
    }
} 

export default EditUser