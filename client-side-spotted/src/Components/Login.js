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
      }).catch(err => {
        setError('Wrong username or password')
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
            id="standard-password-input"
            type="password"
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


