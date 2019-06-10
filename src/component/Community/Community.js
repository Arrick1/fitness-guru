import React, { Component } from 'react'

class Community extends Component {
     state={
         people: {}
     }
    getUsers = async () => {
        const people = await fetch('users/index')
        const parsedPeople = people.json()
        console.log(parsedPeople)
        this.setState({
            people: parsedPeople.foundUser
        })
    }
    render(){
        return (
            <div> This is the community page</div>
        )
    }
}

export default Community 