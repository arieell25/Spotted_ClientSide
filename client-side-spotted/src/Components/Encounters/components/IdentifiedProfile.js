import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import StatusDialog from './StatusDialog';
import EditiDialog from './EditDialog';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import {IdntEncService} from '../../../Service/IdentifiedEncounterService';
import {userService} from '../../../Service/UserService';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import qs from 'qs';
import { IconButton, Typography, Grid, Avatar, Card, CardActionArea,CardMedia, CardContent, Button, CardActions  } from '@material-ui/core';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: 50,
    width: 800,
    margin: `0 auto`
  },
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

export default function IdentifiedProfile(props) {
//   const { index } = props;
  const classes = useStyles();
  const [status, setStatus] = useState([]);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  var id = qs.parse(props.location.search, { ignoreQueryPrefix: true }).id;
  const [encounter, setEncounter] = useState([]);

//   const [bestPrice, setBestPrice] = useState('not available');

  useEffect(() => {
    IdntEncService.getIdentifiedEncounter(id).then(encounter => {
        console.log(encounter)
        setEncounter(encounter);
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = () => {
    setOpen(true);
    setStatus('Deleted coupon succesfully');
    try {
        IdntEncService.deleteIdentified(id)
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
    //   title: title,
    //   couponName: couponName,
    //   discount: discount,
    //   link: link,
    //   publisherImg: api.getLocalStorageUser().img,
    };
    try {
        IdntEncService.updateIdentified(id, body).then(response => console.log(response));
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
          <h2>Identified Encounter Profile</h2>
        </div>
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image={encounter.ProfilePicture}
            title="Contemplative Reptile"
          />
        <CardContent>
          <Typography gutterBottom className={classes.cardtitle} component="h2">
            BlueSpotted #{encounter.EncounterID}
          </Typography>
          <CardActions className={classes.actions}>
            <IconButton color="secondary" onClick={event =>  window.location.href=`/EditIdentifiedEncounter?id=${encounter.IdentifiedEncounterID}`}><EditIcon /></IconButton>
            <IconButton color="secondary"><DeleteIcon  /></IconButton>
          </CardActions>
          <div className ="detailsEncounter">
          <p>SpottedBy: {encounter.Photographer}</p>
          <p> Status: is {encounter.isAlive? 'Alive' : 'Dead'}</p>
          <p>Encounter ID: {encounter.EncounterID}</p>
          <p>TL: {encounter.TL} cm</p>
          <p>DL: {encounter.DL} cm</p>
          <p>DW: {encounter.DW}</p>
          <p>Max Depth: {encounter.MaxDepth} meter</p>
          <p>Water temperature: {encounter.Temp} </p>
          <p>Link to source: {encounter.Link ? encounter.Link : ''}</p>
          <p> {encounter.UpdateBy ? 'Last Updates By: ' + encounter.UpdateBy : ''}{encounter.UpdateAt ? ' at ' + encounter.UpdateAt : ''}</p>
          </div>
          </CardContent>
            <button className='iconbtn' >
             <div ><PhotoLibraryIcon color="secondary"/></div>
              PHOTOS
          </button> 
      </Card>
      </div>
    
    </div>
</div>
)}
  }
    // <Grid container className={classes.root} spacing={3}>
    //   <Grid item xs={12} lg={6}>
    //     {/* <ListItem>
    //       <ListItemAvatar>
    
    //       </ListItemAvatar>
    //       <ListItemText primary={coupon.title} secondary={coupon.couponName} />
    //     </ListItem> */}
    //   </Grid>

      // {userService.isLoggedIn() && (
      //   <Grid item xs={12} lg={6}>
      //     <IconButton onClick={handleEdit} style={{ cursor: 'pointer' }}>
      //       <EditIcon />
      //     </IconButton>
      //     <IconButton onClick={handleDelete} style={{ cursor: 'pointer' }}>
      //       <DeleteIcon />
      //     </IconButton>
      //   </Grid>
      // )}

      // <Grid item container>
      //   <Typography>
      //     Status: {encounter.isAlive? 'Alive' : 'Dead'}
      //   </Typography>
      // </Grid>
      // <Grid item>
      //   <Typography>SpottedBy: {encounter.Photographer}</Typography>
      // </Grid>
      // <Grid item>
      //   <Typography>Encounter ID: {encounter.EncounterID}</Typography>
      // </Grid>
      // <Grid item>
      //   <Typography>TL: {encounter.TL}</Typography>
      // </Grid>
      // <Grid item>
      //   <Typography>DL: {encounter.DL}</Typography>
      // </Grid>
      // <Grid item>
      //   <Typography>DW: {encounter.DW}</Typography>
      // </Grid>
      // <Grid item>
      //   <Typography>Max Depth: {encounter.MaxDepth}</Typography>
      // </Grid>
      // <Grid item>
      //   <Typography>Water temperature: {encounter.Temp}</Typography>
      // </Grid>
      // <Grid item>
      //   <Typography>Link to source: {encounter.Link ? encounter.Link : ''}</Typography>
      // </Grid>
      // <Grid item>
      //   <Typography>Last Updates By: {encounter.UpdateBy ? encounter.UpdateBy : ''} at:  {encounter.UpdateAt ? encounter.UpdateAt : ''} </Typography>
      // </Grid>
      // <StatusDialog open={open} status={status} onClose={handleClose} /> */}
  
    // </Grid>
//   // );
// }
// }
