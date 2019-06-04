import React, { Component } from 'react'
// import './Home.css'
import 'materialize-css/dist/css/materialize.min.css'

class Home extends Component {
    render(){
        return(
            <div className="container">
                <div> <br/>
                    <h3 className="col s6">The Importance of Fitness!</h3> <br/>
                    <p className="col s6">Regular exercise and physical activity promotes strong muscles and bones. It improves respiratory, cardiovascular health, and overall health. Staying active can also help you maintain a healthy weight, reduce your risk for type 2 diabetes, heart disease, and reduce your risk for some cancers.</p>
                </div> 
                <div className="view, col s6 ">
                    <iframe title="home" width='560' height='315' src='https://www.youtube.com/embed/-IeRUtqzKGI'
                    frameBorder='0'
                    allow='autoplay; encrypted-media'
                    allowFullScreen
                    titles='video'/> 
                </div>
            </div> 
        )
    }
}

export default Home 