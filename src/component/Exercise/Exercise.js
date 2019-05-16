import React from 'react'
import parse from 'html-react-parser'


const Exercise = (props) =>  {


    const exerciseList = props.exercise.map((e, i) =>
        <li key ={i}>
            {parse(e.description)}
            <button onClick={() => props.deleteItem(i)}>Delete</button>
            <button onClick={() => props.addExercise(e)}>Add to Workout</button>
         </li>
        
    )
    return(
        <div> 
            <h2>Exercise page</h2>
            <div className="eList">     {props.exercise
                ? <ul>{exerciseList}</ul>
                : <h1>Loading...</h1>
            }
            </div>
        </div>
    )

}




export default Exercise