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
            <div class="row">
                <div class="col s12">
                    <h2>Exercise page</h2>
                </div>
                <div class="col s6">User Information goes here</div>
                <div class="col s6">
                    <div className="eList">     
                    {props.exercise
                ?<ul>{exerciseList}</ul>
                : <div></div>
                    }
                    </div>
                </div>
            </div> 
        </div>
    )

}




export default Exercise