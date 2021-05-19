import React, { Component } from 'react'
// import Title from './Title'
import blueSpotted from './Images/blueSpotted.png'

export class HeaderTitle extends Component {
    render() {
        return (
            <div className="d-flex justify-content-center title">
                 <h1 style={{textTransform: 'uppercase'}}>Spotted</h1>
                <div className="blueSpotted"><img src={blueSpotted} width= "80%" alt="blueSpotted"/></div>
            </div>
        )
    }
}
