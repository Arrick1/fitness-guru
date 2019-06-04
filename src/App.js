import React,{ Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
import styled from 'styled-components'


// Components 
import NavBar from './component/NavBar/Navbar'
import Login from './component/Login/Login'
import Exercise from './component/Exercise/Exercise'
import Profile from "./component/Profile/Profile"
import Home from './component/Home/Home'

import * as routes from './constants/routes'
import EditUser from './component/EditUser/EditUser';

class App extends Component {
  state = {
    currentUser: {},
    exercise: []
  }

  componentDidMount(){
    this.getExercise()
    .then(data=>{
        this.setState({
          exercise: data.data.results
        })
    })
  }

  doSetCurrentUser = (user) =>
  this.setState({
    currentUser: user
  })

  doLogout = async () =>{
    await fetch('/users/logout')
    this.setState({
      currentUser: null
    })
    this.props.history.push(routes.LOGIN)
  }

  getExercise = async() => {
    try {
      const exercise = await fetch('/api/exercise')
      const exerciseJson = await exercise.json()
      console.log(exerciseJson)

      return exerciseJson
      
    } catch (err) {
      console.log(err, 'err in the catch block')
      return err
    }

  }
  deleteItem = i => 
  this.setState({
    exercise: this.state.exercise.filter((exercise, index) =>
    index !== i
    )
  })

  addExercise = async (obj) =>{
    const response = await fetch('/users/add',{
      method:"POST",
      credentials: "include",
      body: JSON.stringify(obj),
      headers:{
        "Content-Type": "application/json"
      }
    })
    const parsedResponse = await response.json()
    if (parsedResponse.success){
      this.setState({
      exercise: this.state.exercise.filter((exercise, index) => exercise.id !== obj.id)
    })
    }

  }

  render() {
    console.log(this.state.exercise)
    const{ exercise, currentUser } = this.state
    return (
      <div className="container">
        <div>
          <NavBar 
              doLogout={this.doLogout} 
              currentUser={currentUser}
          />
          <Switch>
            <Route exact path={routes.LOGIN} 
              render={()=> <Login 
              currentUser={currentUser} 
              doSetCurrentUser={this.doSetCurrentUser}/>}
            />

            {/* <Route exact path={routes.REGISTER} render={()=> <Register currentUser={currentUser}  doSetCurrentUser={this.doSetCurrentUser}/>}/> */}

            <Route exact path={routes.ROOT} render={()=> <Home/>}/> 

            <Route exact path= {`${routes.PROFILE}/:id`} render={() => <Profile currentUser={currentUser}/>}/>

            <Route exact path={`${routes.EDIT}/:id`}  render={() => <EditUser currentUser={currentUser}/>} 
            />

            <Route exact path={routes.EXERCISE} render={() => <Exercise exercise={exercise} deleteItem={this.deleteItem} addExercise={this.addExercise}/> } />
          
            <Route render={() => <div>NotFound</div>} />
          </Switch>
        </div>
      </div> 
    );
  } 
}

export default withRouter(App);
