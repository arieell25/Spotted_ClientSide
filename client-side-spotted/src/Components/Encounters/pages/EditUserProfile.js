/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import clsx from 'clsx';
import { useForm} from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Typography, CardActions, Collapse, Card, InputLabel, InputAdornment, Input, IconButton, FormControl} from "@material-ui/core";
import {userService} from '../../../Service/UserService';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import StatusDialog from '../components/StatusDialog';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 50,
    width: 800,
    margin: `0 auto`
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: '25ch',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  passwordbtn: {
      flex:1
  }
 }));

export default function EditUserProfile(props) {
    const classes = useStyles();
    const [profile, setProfile] = useState(null);
    const [status, setStatus] = useState('');
    const [openRespons, setOpenRespons] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const [values, setValues] = useState({
        oldPassword: '',
        newPassword: '',
        showOldPassword: false,
        showNewPassword: false,
        
      });

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    useEffect( () => {
        const user = userService.isLoggedIn();
         userService.getUserName(user.id)
        .then(res => {
            setProfile(res)
            console.log(res);
            reset({
                firstName: profile? profile.firstName : res.firstName,
                lastName: res.lastName,
                email: res.email,
              });
        })

    }, [reset]);
  
    const handleCloseRespons = () => {
        setOpenRespons(false);
      };
  
    const onSubmit = data => {
        userService
        .updateUser(data)
        .then(res => {
            setStatus(res);
            setOpenRespons(true);       
         })
        if(values.oldPassword){
            userService.changePassword(values.oldPassword, values.newPassword )
            .then(res=>{
                setStatus(res);
                setOpenRespons(true);
            })
        }
    };
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
    
      const handleClickShowOldPassword = () => {
        setValues({ ...values, showOldPassword: !values.showOldPassword });
      };
      const handleClickShowNewPassword = () => {
        setValues({ ...values, showNewPassword: !values.showNewPassword });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
  
    return (
        <div className="animated slideInUpTiny animation-duration-3">
        <div className="m-5">
          <div className="d-flex justify-content-center title">
            <div>
              <h2>Edit Profile </h2>
            </div>
          </div>
          <Card className={classes.root}>
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <TextField
              inputRef={register}
              name="firstName"
              label="First Name"
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="row">
            <TextField
              inputRef={register}
              name="lastName"
              label="Last Name"
              margin="normal"
              halfwidth="true"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="row">
            <TextField
              inputRef={register}
              name="email"
              label="Email"
              margin="normal"
              halfwidth="true"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          {/* <div className="row">
            <TextField
              inputRef={register}
              name="profilePic"
              label="Profile picture"
              margin="normal"
              halfwidth="true"
            />
          </div> */}
      <CardActions>
          <Typography>Change Password</Typography>
          <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
           <FormControl className={clsx(classes.margin, classes.textField)}>
          <InputLabel htmlFor="standard-adornment-oldpassword">Old password</InputLabel>
          <Input
            id="standard-adornment-oldpassword"
            type={values.showOldPassword ? 'text' : 'password'}
            value={values.oldPassword}
            onChange={handleChange('oldPassword')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle oldPassword visibility"
                  onClick={handleClickShowOldPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showOldPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
         </FormControl>
         <FormControl className={clsx(classes.margin, classes.textField)}>
          <InputLabel htmlFor="standard-adornment-newpassword">New password</InputLabel>
          <Input
            id="standard-adornment-newpassword"
            type={values.showNewPassword ? 'text' : 'password'}
            value={values.newPassword}
            onChange={handleChange('newPassword')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowNewPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showNewPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        </Collapse>
        <button className='btn' type="submit" >
           SAVE
        </button>
        </form>
       </Card>
     </div>
        <StatusDialog
            open={openRespons}
            status={status}
            onClose={handleCloseRespons}
        />           
 </div>
    );
  }