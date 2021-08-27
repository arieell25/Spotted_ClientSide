import React, { useState, forwardRef } from "react";
import { TextField, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { userService } from "../Service/UserService";

const Signup = forwardRef((props, ref) => {
  const { onSubmitC } = props;
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    userService
      .register(data)
      .then(() => {
        onSubmitC();
        console.log("SUCCESS!");
      })
      .catch((err) => {
        setError("Faild Please: " + err);
      });
  };

  return (
    <div className="Login">
      <form className="form_login" onSubmit={handleSubmit(onSubmit)}>
        <h2>Signup</h2>
        <TextField fullWidth inputRef={register} label="Email" name="email" />
        <TextField
          fullWidth
          inputRef={register}
          label="Password"
          name="password"
        />
        <TextField
          fullWidth
          inputRef={register}
          label="First Name"
          name="firstName"
        />
        <TextField
          fullWidth
          inputRef={register}
          label="Last Name"
          name="lastName"
        />
        <Button type="submit">Signup</Button>
      </form>
      {error && <div className="info info-danger">{error}</div>}
    </div>
  );
});
export default Signup;
