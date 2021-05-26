import React, { Component } from 'react'

export class HeaderTitle extends Component {
    render() {
        return (
            <div className="d-flex justify-content-center title">
                 <h1 style={{textTransform: 'uppercase'}}>Spotted</h1>
                <div className="blueSpotted"><img src= "https://spottedphotos.blob.core.windows.net/apphotos/blueSpotted.png" width= "80%" alt="blueSpotted"/></div>
            </div>
        )
    }
}
