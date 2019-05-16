import React,{ Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';



// Components 
import NavBar from './component/NavBar/Navbar'
import Login from './component/Login/Login'
import Register from './component/Register/Register'
import Exercise from './component/Exercise/Exercise'
import Profile from "./component/Profile/Profile"

import * as routes from './constants/routes'
import './App.css';

class App extends Component {
  state = {
    currentUser: null,
    exercise: []
  }

  doSetCurrentUser = user =>
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

  async componentDidMount(){
    await fetch('/users/logout')
    this.getExercise().then(data =>
      this.setState({
        exercise: data.data.results
      })
    ) 
  }

  getExercise = async() => {
    try {
      const exercise = await fetch('/api/exercise')
      if(!exercise.ok){
        throw Error(exercise.response.statusText)
      }
      const exerciseJson = await exercise.json()
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
    const{ exercise } = this.state
    return (
      <div className="body">
      <div className="grid-container">
        <div className='grid-header'><h1>FITNESS GURU</h1></div>
        <div className='grid-nav'><NavBar doLogout={this.doLogout} currentUser={this.state.currentUser}/>
          <Switch>
          <Route exact path={routes.LOGIN} render={()=> <Login currentUser={this.state.currentUser} doSetCurrentUser={this.doSetCurrentUser}/>}/>
          <Route exact path={routes.REGISTER} render={()=> <Register currentUser={this.state.currentUser} doSetCurrentUser={this.doSetCurrentUser} />}/>
          <Route exact path={routes.ROOT} render={() => <div>This is the Root page</div>} />     
          <Route exact path= {`${routes.PROFILE}/:id`} render={() => <div><Profile currentUser={this.state.currentUser}/> </div> } />
          <Route exact path={routes.POSTS}  render={() => <div>This is the posts page  </div>} />
          <Route exact path={routes.EXERCISE} render={() => <div className='grid-left'>This is the Exercise page <br/> <Exercise exercise={exercise} deleteItem={this.deleteItem} addExercise={this.addExercise}/></div> } />
          <Route render={() => <div>NotFound</div>} />
          </Switch>
        </div>
        {/* <div className='grid-right'>This is the text</div>
        <div className='grid-left'>This is the image</div>
        <div className='grid-footer'>this is the footer</div> */}
      </div>
      </div>
    );

  }
  
}

export default withRouter(App);
