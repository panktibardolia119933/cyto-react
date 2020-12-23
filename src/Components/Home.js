import React, { Component } from 'react'
import Cyto from './Cyto'
class Home extends Component {
    constructor() {
        super()

        this.state = {
        }
    }

    render() {
        return (
            <div>
                Home works
                <Cyto/>    
            </div>            
        );
    }
}

export default Home;