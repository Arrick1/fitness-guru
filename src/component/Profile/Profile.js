import React, { Component } from 'react'
import parse from 'html-react-parser'


class Profile extends Component {
    state ={
        workouts: []
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
    componentDidMount () {
        this.getWorkouts()
        console.log(this.state.workouts)

    }
    getWorkouts =  async () => {
        const workouts = await fetch('/users/profile')
        const parsedWorkouts = await workouts.json()
        console.log(parsedWorkouts)
        this.setState({
            workouts: parsedWorkouts.workouts
        })

    }

    deleteItem = async i => {
        const workouts = await fetch('/users/profile')
        const deleteItem = await fetch(`/users/delete/${i}`, {
             method: 'DELETE'
         })
        const parsedWorkouts = await workouts.json()
        const parsedResponse = await deleteItem.json()
        this.setState({
            currentUser: parsedResponse.user,
            workouts: parsedWorkouts.workouts
            })
    }
    render () {
        return(
            <div>
                    <h1> Hello {this.props.currentUser.username && this.props.currentUser.username}</h1>
                {this.state.workouts.map((w, i) => {
                    const videoLink = w.description.split('https')[1] && `https${w.description.split('https')[1].replace('watch?v=', 'embed/').replace('</p>', '')}`
                    return (
                        <div key={i}>
                            
                            <h1>{w.name}</h1>
                            <h4>{parse(w.description)}</h4>
                            {
                                videoLink
                                    && <iframe title="display"  width='400px' height='300px' src={ videoLink } />
                            }
                            
                            <button>Delete</button>

                        </div>
                    )
                })}
            </div>

        )
    }
}

export default Profile 