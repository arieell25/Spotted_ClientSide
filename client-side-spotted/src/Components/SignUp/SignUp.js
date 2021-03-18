import React, { Component } from 'react';
import { userService } from '../../Service/UserService'

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FirstName: '',
      LastName: '',
      Email: '',
      Password: '',
      message: null,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleClick(e) {
    e.preventDefault();
    let data = {
      FirstName: this.state.FirstName,
      LastName: this.state.LastName,   
      Email: this.state.Email,
      Password: this.state.Password,
    };
    userService
      .register(data)
      .then(result => {
        console.log('SUCCESS!');
        this.props.history.push('/'); // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }));
  }

  render() {
    return (
      <div className="Signup">
        <h2>Signup</h2>
        <form>
        FirstName:{' '}
          <input
            type="text"
            value={this.state.FirstName}
            name="FirstName"
            onChange={this.handleInputChange}
          />{' '}
          <br />
          LastName:{' '}
          <input
            type="text"
            value={this.state.LastName}
            name="LastName"
            onChange={this.handleInputChange}
          />{' '}
          <br />
          Email:{' '}
          <input
            type="text"
            value={this.state.Email}
            name="Email"
            onChange={this.handleInputChange}
          />{' '}
          <br />
          Password:{' '}
          <input
            type="Password"
            value={this.state.password}
            name="Password"
            onChange={this.handleInputChange}
          />{' '}
          <br />
          <button onClick={e => this.handleClick(e)}>Signup</button>
        </form>
        {this.state.message && (
          <div className="info info-danger">{this.state.message}</div>
        )}
      </div>
    );
  }
}
