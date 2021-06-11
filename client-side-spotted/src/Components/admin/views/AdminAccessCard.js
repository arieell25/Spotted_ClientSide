import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {userService} from '../../../Service/UserService';

export default function AdminAccessCard(props) {
  const {open, handleClose, openResponsStatus, setStatus} = props;
  const [email, setEmail] = useState(null);

  const handleChange = (e)  => {
    console.log(`chosen side: ${e}`)
    setEmail(e.target.value);
};
  const handleSave = () => {
    userService.setAdmin(email).then(res => {
      if(res){
        setStatus('Successfully added admin user')
        openResponsStatus(true);
        handleClose();
      }else{
        setStatus('User email not found')
        openResponsStatus(true);
      }

    }).catch(err => {
      setStatus('Faild to add admin user, please try again later...')
      openResponsStatus(true);
    })
  }
  return (
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Grant Admin Access</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To grant admin access to this website, please enter user email address here. 
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
  );
}
