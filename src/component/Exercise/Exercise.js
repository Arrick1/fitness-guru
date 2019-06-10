import React from 'react'
import parse from 'html-react-parser'



/* <------- React of styled components --------> */
import { Button, Col, Row, Container} from 'react-bootstrap'

const Exercise = (props) =>  {
    const exerciseList = props.exercise.map((e, i) =>
        <li key ={i}>
            {parse(e.description)}
            <Button onClick={() => props.deleteItem(i)}>Delete</Button>
            <Button onClick={() => props.addExercise(e)}>Add to Workout</Button>
        </li>    
    )
    return(
        <Container fluid> 
            <Row> Row 1 of 2  </Row> 
                <Col><h2>Exercise page</h2></Col>
            <Row> Row 2 of 2</Row>
                <Col> Row 2 Col 1</Col>
                <Col>Row 2 Col 2
                </Col>
                <Col> Row 2 Col 3
                    <div>     
                        {
                            props.exercise ?<ul>{exerciseList}</ul> : <div/>
                        }
                    </div>
                </Col>
          
        </Container>
    )

}




export default Exercise