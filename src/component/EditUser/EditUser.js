import React, { Component } from 'react'
import EditUserModal from './EditUserModal';

/* <------- React of styled components --------> */
import { Button, Form, Col, Row, Container} from 'react-bootstrap'



class EditUser extends Component {
    state={
        username:'',
        password: '',
        logged: false,
        EditUserModal: false,
    }
    showEditUserModal = () => {
      this.setState({ EditUserModal: true})
    }
    hideEditUserModal = () => {
      this.setState({ EditUserModal: false })
    }
    doEditUser = async (info) => {
        const { currentUser, doSetCurrentUser} = this.props 
        try {
          console.log(currentUser._id, "<-- this.state.user._id");
          const updateUser = await fetch(`/users/${currentUser._id}/edit`, {
            method: "PUT",
            credentials: "include",
            body: JSON.stringify(info),
            headers: {
              "Content-type": "application/json"
            }
          });
          const parsedUser = await updateUser.json();
          console.log(parsedUser, "<-- parsedUser in doEditUser function in ShowUser.js");
          if(parsedUser.data){
              doSetCurrentUser(parsedUser.data)
              localStorage.setItem("current", JSON.stringify(parsedUser.data))
              this.setState({
                  logged: true,
                  currentUser: parsedUser.data
              })
          }else{
            console.log('Update Failed')
            }
        } catch (err) {
          console.log(err);
        }
      };
    render(){
        return (
          <div> 

             <Button  onClick={this.showEditUserModal}>Edit</Button>
             {
               this.state.EditUserModal
               ? <EditUserModal 
                 isLogged={this.props.isLogged}
                 currentUser={this.props.currentUser}
                 doSetCurrentUser={this.props.doSetCurrentUser}
                 doEditUser={this.doEditUser}
                 hideEditUserModal={ this.hideEditUserModal }
                 showEditUserModal={this.showEditUserModal}
                 />
                 : <div></div>

             }

          </div>
        )
    }
} 

export default EditUser