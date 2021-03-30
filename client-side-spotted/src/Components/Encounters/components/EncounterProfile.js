import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import StatusDialog from './StatusDialog';
import EditiDialog from './EditDialog';
import { Link } from 'react-router-dom';
import {EncounterService} from '../../../Service/EncounterService';
import {userService} from '../../../Service/UserService';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import qs from 'qs';

import { IconButton, Typography, Grid, Avatar, Card, CardActionArea,CardMedia, CardContent, Button, CardActions  } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: 20,
  },
  img:{
    height: '300px',
    width: '300px'
  },
  media:{
    height: '300px',
    width: '300px'
  }
}));

export default function EncounterProfile(props) {
  const { index } = props;
  const classes = useStyles();
  const [status, setStatus] = useState([]);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
    const [encounter, setEncounter] = useState([]);
    var id = qs.parse(props.location.search, { ignoreQueryPrefix: true }).id;

  // const [coupon, setCoupon] = useState();

//   useEffect(() => {
    useEffect(() => {
    EncounterService
          .getEncounterById(id)
          .then(encounter => {
            setEncounter(encounter);
          })
          .catch(err => console.log(err));
        // eslint-disable-next-line
      }, []);
//   }, [encounter]);

  const handleDelete = () => {
    setOpen(true);
    setStatus('Deleted coupon succesfully');
    try {
        EncounterService.deleteEncounter(index)
      .then(response => {
          console.log(response)
          setStatus('Deleted Successfully.');
          setOpen(true);});
    } catch (err) {
      console.log('error fetching...:', err);
      setStatus('Something is wrong... try again');
      setOpen(true);
    }
  };

  const handleClose = () => {
    setEdit(false);
    setOpen(false);
  };
  const handleEdit = () => {
    setEdit(true);
  };
  const handleSave = (title, couponName, link, discount) => {
    var body = {

    //   publisherImg: api.getLocalStorageUser().img,
    };
    try {
        EncounterService.updateEncounter(index, body).then(response => console.log(response));
      setStatus('All changes were saved');
      setOpen(true);
    } catch (err) {
      console.log('error fetching...:', err);
      setStatus('Something is wrong... try again');
      setOpen(true);
    }
  };

//   const addAlert = () => {
//     try {
//         IdntEncService.couponNotify(index).then(response => console.log(response));
//       setStatus(
//         'Alert was created, you will be notified when we find a better price.'
//       );
//       setOpen(true);
//     } catch (err) {
//       console.log('error fetching...:', err);
//       setStatus('Something is wrong... try again');
//       setOpen(true);
//     }
//   };

if (!encounter) return <div>Loading...</div>
else {
  return (
    <div className="animated slideInUpTiny animation-duration-3">
    <div className="m-5">
      <div className="d-flex justify-content-center title">
        <div>
          <h2>Encounter Profile</h2>
        </div>
        <Card className={classes.root}>
    <CardMedia
      className={classes.media}
      image={encounter.ProfilePicture}
      title="Contemplative Reptile"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="h2">
        BlueSpotted
      </Typography>
      <div className ="detailsEncounter">
      <h4>Encounter Date: {encounter.EncounterDate}</h4>
      <h4>Spotted At:</h4>
      <h4>Encounter ID: {encounter.EncounterID}</h4>
      <h4>Original ID: {encounter.OriginalID}</h4>
      <h4>Total Bluespotted Reported: {encounter.SpottedCountReported}:</h4>
      <h4>Actually Detected: {encounter.SpottedCount? encounter.SpottedCount : ''}</h4>
      <h4>MediaType:</h4>
      <h4>Reported By: {encounter.ReporterEmail}</h4>
     <h4> Last Updates By: {encounter.UpdateBy ? encounter.UpdateBy : ''} at:  {encounter.UpdateAt ? encounter.UpdateAt : ''}</h4>
      </div>

    <IconButton><EditIcon /></IconButton>
    <IconButton><DeleteIcon /></IconButton>
    <button className='btn'     onClick={event =>  window.location.href='/IdentifyPhoto'} >
            Identify
    </button> 
    </CardContent>
    <CardActionArea>
  </CardActionArea>
  <CardActions>
  </CardActions>
</Card>
      </div>
    
    </div>
</div>
    // <Grid container className={classes.root} spacing={3}>
    //   <Grid item xs={12} lg={6}>
    //     {/* <ListItem>
    //       <ListItemAvatar>
    
    //       </ListItemAvatar>
    //       <ListItemText primary={coupon.title} secondary={coupon.couponName} />
    //     </ListItem> */}
    //   </Grid>

    //   {userService.isLoggedIn() && (
    //     <Grid item xs={12} lg={6}>
    //       <IconButton onClick={handleEdit} style={{ cursor: 'pointer' }}>
    //         <EditIcon />
    //       </IconButton>
    //       <IconButton onClick={handleDelete} style={{ cursor: 'pointer' }}>
    //         <DeleteIcon />
    //       </IconButton>
    //     </Grid>
    //   )}

    //   <Grid item container>
    //     <Typography>
    //       Status:
    //     </Typography>
    //   </Grid>
    //   <Grid item>
    //     <Typography>SpottedAt: {encounter.EncounterDate}</Typography>
    //   </Grid>
    //   <Grid item>
    //     <Typography>Encounter ID: {encounter.EncounterID}</Typography>
    //   </Grid>
    //   <Grid item>
    //     <Typography>Total Bluespotted: {encounter.SpottedCountReported}</Typography>
    //   </Grid>
    //   <Grid item>
    //     <Typography>Actually Detected: {encounter.SpottedCount}</Typography>
    //   </Grid>
    //   <Grid item>
    //     <Typography>Reported By: {encounter.ReporterEmail}</Typography>
    //   </Grid>
    //   {/* <Grid item>
    //     <Typography>Original ID: {encounter.MaxDepth}</Typography>
    //   </Grid> */}
    //   <Grid item>
    //     <Typography>Last Updates By: {encounter.UpdateBy ? encounter.UpdateBy : ''} at:  {encounter.UpdateAt ? encounter.UpdateAt : ''} </Typography>
    //   </Grid>
    //   <StatusDialog open={open} status={status} onClose={handleClose} />
    //   {/* <EditiDialog
    //     encounter={encounter}
    //     open={edit}
    //     onChange={handleSave}
    //     onClose={handleClose}
    //   /> */}
    // </Grid>
  );
}
}