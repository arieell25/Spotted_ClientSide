import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Title extends Component {
    render() {
        return (
            <div className="d-flex justify-content-center title">
                <div>
                    <Link to='/' style={{ 'textDecoration': 'none' }}><h1>Spotted</h1></Link>
           
                </div>
            </div>
        );
    }
}
export default Title;