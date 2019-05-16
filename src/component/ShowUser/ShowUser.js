import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import EditUser from '../EditUser/EditUser'

class ShowUser extends Component {
    state = {
        user: {}
      }

    componentDidMount(){
        this.doGetUser()
        .then(({user})=> this.setState({user: user}))

    }

    changeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    doGetUser = async () => {
        try {
            const user = await fetch(`/users/${this.props.match.params.id}`)
            const parsedUser = await user.json()
            return parsedUser
        } catch (err) {
            console.log(err)
        }
    }
    doEditUser = async () => {
        try {
          console.log(this.state.user._id, "<-- this.state.user._id");
          const updateUser = await fetch(`/users/update/${this.state.user._id}`, {
            method: "PUT",
            credentials: "include",
            body: JSON.stringify(this.state),
            headers: {
              "Content-type": "application/json"
            }
          });
          const parsedUser = await updateUser.json();
          console.log(
            parsedUser,
            "<-- parsedUser in doEditUser function in ShowUser.js"
          );
          return parsedUser;
        } catch (err) {
          console.log(err);
        }
      };
      submitEdit = e => {
        e.preventDefault();
        this.doEditUser().then(response => {
          console.log(
            response,
            "<-- response in submitEdit function in ShowUser.js"
          );
          this.setState({
            user: response.updateUser
          });
        });
      };
    render (){
        return(
            <div>
                <h1> Hello {this.state.user && this.state.user.username}</h1>
                <div>
                <h2>Edit User Info</h2>
                    {
                        this.props.currentUser
                            && (this.props.currentUser._id === this.props.match.params.id)
                                &&  <EditUser 
                                        submitEdit={this.submitEdit}
                                        changeHandler={this.changeHandler}
                                        username={this.state.user.username}
                                        password={this.state.password}
                                    />
                    }

                </div>
             </div>
        )
    }
}

export default withRouter(ShowUser)