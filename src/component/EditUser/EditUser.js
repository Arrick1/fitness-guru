import React, { Component } from 'react'

class EditUser extends Component {
    render(){
        return (
            <div>
                <form onSubmit={e => this.props.submitEdit(e)}>
                    <input value={this.props.username}type="username" name="username" onChange={e => this.props.changeHandler(e)}/>
                    <input value={this.props.password} type="password" name="password" onChange={e => this.props.changeHandler(e)}/>
                    <button type="submit"> Update</button>
                </form>
            </div>

        )
    }
} 

export default EditUser