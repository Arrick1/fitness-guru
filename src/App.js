import React,{ Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'


// Components 
import Layout from './component/Layout'
import NavBar from './component/NavBar/Navbar'
import Login from './component/Login/Login'
import Exercise from './component/Exercise/Exercise'
import Profile from "./component/Profile/Profile"
import Home from './component/Home/Home'


import * as routes from './constants/routes'
import EditUser from './component/EditUser/EditUser';


import { Col, Row, Container} from 'react-bootstrap'

import './App.css'

class App extends Component {
  state = {
    currentUser: {},
    exercise: [],
    message: '',
    logged: false
  }
  
  async componentDidMount(){
    const user = await localStorage.getItem("current")
    const parsedUser=  await JSON.parse(user)
    this.getExercise()
    .then(data=>{
      if(user){
        this.setState({
          exercise: data.data.results,
          currentUser: parsedUser
        })
      }else{
          this.setState({
            exercise: data.data.results
          })
        }
      }
    )
  }

  doSetCurrentUser = (user) =>
    this.setState({
      currentUser: user
    })

  doRegisterUser = async (info) => {
    const registerResponse = await fetch('/users/register', {
          method: "POST",
          credentials: 'include',
          body: JSON.stringify(info),
          headers: {
            'Content-Type' : 'application/json'
          }
    }) 
    const parsedResponse = await registerResponse.json()
    if(parsedResponse.data){
      this.doSetCurrentUser(parsedResponse.data)
      localStorage.setItem("current", JSON.stringify(parsedResponse.data))
      this.setState({
        logged: true,
        currentUser: parsedResponse.data
      })
    } else{
      console.log('not logged in')
        this.setState({
            message: 'Invalid Login Credentials'
        })
      }
     
  
    }

  doLoginUser = async (info) => {
    const loginResponse = await fetch('/users/login', {
           method: "POST",
           credentials: 'include',
           body: JSON.stringify(info),
           headers: {
            'Content-Type' : 'application/json'
          }
    }) 
    const parsedResponse = await loginResponse.json()
        if(parsedResponse.data){
            this.doSetCurrentUser(parsedResponse.data)
            localStorage.setItem("current", JSON.stringify(parsedResponse.data))
            console.log("logged in")
            console.log(parsedResponse.data)
            this.setState({
                logged: true,
                currentUser: parsedResponse.data
            })
        } else{
          console.log('not logged in')
            this.setState({
                message: 'Invalid Login Credentials'
            })
        }
  }

  doLogout = async () =>{
    await fetch('/users/logout')
    localStorage.clear()
    this.setState({
      currentUser: {},
      logged:false
    })
    this.props.history.push(routes.LOGIN)
  }
  resetHandler = ()=>{
    this.setState({
      currentUser: {},
      logged: false
    })
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

  deleteItem = i => 
  this.setState({
    exercise: this.state.exercise.filter((exercise, index) =>
    index !== i
    )
  })
  render() {
    console.log(this.state.exercise)
    const{ exercise, currentUser, message } = this.state
    return (
        <div>
          <Layout></Layout>
          <NavBar 
              doLogout={this.doLogout} 
              currentUser={currentUser}
          />
          <Layout/>
          <Switch>
            <Route exact path={routes.ROOT} render={()=> <Home/>}/> 
            <Route exact path={routes.LOGIN} render={()=> 
              <Login 
                isLogged={this.state.logged}
                doLoginUser={this.doLoginUser}
                doRegisterUser={this.doRegisterUser}
                currentUser={currentUser} 
                doSetCurrentUser={this.doSetCurrentUser}
                message={message}
              />}
            />
            <Route exact path={`${routes.PROFILE}/:id`} render={()=> 
              <Profile 
                currentUser={currentUser}
              />}
            />
            <Route exact path={`${routes.EDIT}/:id`} render={(props)=> 
              <EditUser 
                {...props}
                isLogged={this.isLogged}
                currentUser={currentUser}
                doSetCurrentUser={this.doSetCurrentUser}
                reset={this.resetHandler}
              />} 
            />
            <Route exact path={routes.EXERCISE} render={() => 
              <Exercise 
                exercise={exercise} 
                deleteItem={this.deleteItem} 
                addExercise={this.addExercise}
              />} 
            />
            <Route render={() => <div>NotFound</div>} />
          </Switch>
        </div>
    );
  } 
}

export default withRouter(App);
