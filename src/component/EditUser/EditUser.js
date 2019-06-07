import React, { Component } from 'react'
import EditUserModal from './EditUserModal';


class EditUser extends Component {
    state={
        username:'',
        password: '',
        logged: false
    }
    changeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    doEditUser = async (e) => {
        e.preventDefault()
        const { currentUser, doSetCurrentUser} = this.props 
        try {
          console.log(currentUser._id, "<-- this.state.user._id");
          const updateUser = await fetch(`/users/${currentUser._id}/edit`, {
            method: "PUT",
            credentials: "include",
            body: JSON.stringify(this.state),
            headers: {
              "Content-type": "application/json"
            }
          });
          const parsedUser = await updateUser.json();
          console.log(parsedUser, "<-- parsedUser in doEditUser function in ShowUser.js");
          if(parsedUser.data){
              doSetCurrentUser(parsedUser.data)
              this.setState({
                  logged: true
              })
          }
          return parsedUser;
        } catch (err) {
          console.log(err);
        }
      };
    //   submitEdit = e => {
    //     e.preventDefault();
    //     this.doEditUser().then(response => {
    //       console.log(
    //         response,
    //         "<-- response in submitEdit function in ShowUser.js"
    //       );
    //       this.props.doSetCurrentUser(response.updateUser)
    //       localStorage.setItem("current", JSON.stringify(response.updateUser))
    //       this.setState({
    //         user: response.updateUser
    //       });
    //     });
    //   };
    render(){
        return (
            <EditUserModal 
                isLogged={this.props.isLogged}
                doEditUser={this.doEditUser}/>



            // <div className="container">
            //     <form onSubmit={e => this.doEditUser(e)}>
            //         <input 
            //             value={this.props.username}
            //             type="username" 
            //             name="username" 
            //             onChange={e => this.changeHandler(e)}/>
            //         <input 
            //             value={this.props.password}
            //             type="password" 
            //             name="password" 
            //             onChange={e => this.changeHandler(e)}/>
            //         <button
            //             type="submit"
            //             > Update
            //         </button>
            //     </form>
            // </div>

        )
    }
} 

export default EditUser