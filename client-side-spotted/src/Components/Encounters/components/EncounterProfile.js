import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';

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
    padding: 50,
    width: 800,
    margin: `0 auto`
  },
  // img:{
  //   height: '300px',
  //   width: '300px'
  // },
  media:{
    flex: 1,
    width: 500,
    height: 300,
    margin: `0 auto`,
    borderRadius: 10
  },
  actions:{
    justifyContent: 'flex-end'
  },
  cardtitle :{
    fontSize:30
  },
}));

export default function EncounterProfile(props) {
  const { index } = props;
  const classes = useStyles();
  const [status, setStatus] = useState([]);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
    const [encounter, setEncounter] = useState([]);
    var id = qs.parse(props.location.search, { ignoreQueryPrefix: true }).id;

    useEffect(() => {
    EncounterService
          .getEncounterById(id)
          .then(encounter => {
            setEncounter(encounter);
          })
          .catch(err => console.log(err));
      }, []);

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
            <Typography gutterBottom className={classes.cardtitle} component="h2">
              Encounter #{encounter.EncounterID}
            </Typography>
            <CardActions className={classes.actions}>
              {/* edit event listner */}
              
              <IconButton color="secondary"><PhotoLibraryIcon/></IconButton>
                <IconButton color="secondary" onClick={event =>  window.location.href=`/EditIdentifiedEncounter?id=${encounter.IdentifiedEncounterID}`}><EditIcon /></IconButton>
                <IconButton color="secondary"><DeleteIcon  /></IconButton>
            </CardActions>
            <div className ="detailsEncounter">
            <p>Encounter Date: {encounter.EncounterDate}</p>
            <p>Spotted At:</p>
            <p>Encounter ID: {encounter.EncounterID}</p>
            <p>Original ID: {encounter.OriginalID}</p>
            <p>Total Bluespotted Reported: {encounter.SpottedCountReported}:</p>
            <p>Actually Detected: {encounter.SpottedCount? encounter.SpottedCount : ''}</p>
            <p>MediaType:</p>
            <p>Reported By: {encounter.ReporterEmail}</p>
            <p>{encounter.UpdateBy ? 'Last Updates By: '+encounter.UpdateBy : ''}{encounter.UpdateAt ? ' at: ' + encounter.UpdateAt : ''}</p>
            </div>
          </CardContent>
          <button className='btn'onClick={event =>  window.location.href='/IdentifyPhoto'} >
                  IDENITFY
          </button> 


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