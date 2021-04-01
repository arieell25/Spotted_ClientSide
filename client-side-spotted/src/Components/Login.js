import React, { useState, forwardRef } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { userService } from '../Service/UserService'

const Login = forwardRef((props, ref) => {
  const { onSubmitC } = props;
  const [error, setError] = useState('');
  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    userService
      .login(data.email, data.password)
      .then( () => {
        onSubmitC();
        console.log('SUCCESS!');
      })

  };

  return (
    // <MuiThemeProvider >
      <div className="Login">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Login</h2>
          <TextField
            fullWidth
            inputRef={register}
            label="Email"
            name="email"
          />
          <TextField
            fullWidth
            inputRef={register}
            label="Password"
            name="password"
          />
          <Button type="submit">Login</Button>
        </form>
        {error && <div className="info info-danger">{error}</div>}
      </div>
    // </MuiThemeProvider>
  );
});
export default Login;

// import PropTypes from "prop-types";
// import React, { Component } from "react";
// import GoogleButton from 'react-google-button'


// export default class Login extends Component {
//   static propTypes = {
//     authenticated: PropTypes.bool.isRequired
//   };

//   render() {
//     const { authenticated } = this.props;
//     return (
//       <ul className="menu loginOut">
//         {authenticated ? (
//           <li className="logOut" onClick={this._handleLogoutClick}>Logout</li>
//         ) : (
//             <li className="googleButten" onClick={this._handleSignInClick}><GoogleButton></GoogleButton></li>
//           )}
//       </ul>
//     );
//   }

//   _handleSignInClick = () => {
//     window.open("https://lochalhost:8080/auth/google", "_self");
//   };

//   _handleLogoutClick = () => {
//     // Set authenticated state to false in the HomePage component
//     window.open("https://lochalhost:8080/auth/logout", "_self");
//     this.props.handleNotAuthenticated();
//   };
// }


