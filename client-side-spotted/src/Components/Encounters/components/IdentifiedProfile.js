import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import StatusDialog from './StatusDialog';
import GradientCircularProgress from './CircularProgress';
import {IdntEncService} from '../../../Service/IdentifiedEncounterService';
import {userService} from '../../../Service/UserService';
import { PhotoService } from '../../../Service/PhotoService';
import PhotosGrid from './Photos/PhotosGrid';
import qs from 'qs';
import { IconButton, Typography,  Card, CardMedia, CardContent, CardActions} from '@material-ui/core';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: '0px 50px',
    maxWidth: 800,
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
  update: {
    fontSize: 12,
    color: '#96a299',
    float: 'right',
 
  }
}));

export default function IdentifiedProfile(props) {
//   const { index } = props;
  const classes = useStyles();
  const [status, setStatus] = useState([]);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [openPhotos, setOpenPhotos] = useState(false);
  const [photos, setPhotos] = useState([]);
  var id = qs.parse(props.location.search, { ignoreQueryPrefix: true }).id;
  const [encounter, setEncounter] = useState([]);
  const [date, setDate] = useState();


  useEffect(() => {
    IdntEncService.getIdentifiedEncounter(id).then(encounter => {
        let date = new Date(encounter.CreatedAt);
        setDate(date.toLocaleDateString());
        setEncounter(encounter);
      })
      .catch(err => console.log(err));
    
    PhotoService.getIdntEncounterPhotos(id)
      .then(photos => setPhotos(photos))
      .catch(err=> console.log(err));
  }, []);

  const handleClose = () => {
    setEdit(false);
    setOpen(false);
  };

  // const handleDelete = () => {
  //   setOpen(true);
  //   setStatus('Deleted coupon succesfully');
  //   try {
  //       IdntEncService.deleteIdentified(id)
  //     .then(response => {
  //         console.log(response)
  //         setStatus('Deleted Successfully.');
  //         setOpen(true);});
  //   } catch (err) {
  //     console.log('error fetching...:', err);
  //     setStatus('Something is wrong... try again');
  //     setOpen(true);
  //   }
  // };

  // const handleEdit = () => {
  //   setEdit(true);
  // };
  // const handleSave = (title, couponName, link, discount) => {
  //   var body = {
  //   //   title: title,
  //   //   couponName: couponName,
  //   //   discount: discount,
  //   //   link: link,
  //   //   publisherImg: api.getLocalStorageUser().img,
  //   };
  //   try {
  //       IdntEncService.updateIdentified(id, body).then(response => console.log(response));
  //     setStatus('All changes were saved');
  //     setOpen(true);
  //   } catch (err) {
  //     console.log('error fetching...:', err);
  //     setStatus('Something is wrong... try again');
  //     setOpen(true);
  //   }
  // };

if (!encounter) return <GradientCircularProgress/>
else {
  return (
    <div className="animated slideInUpTiny animation-duration-3">
    <div className="m-5">
      <div className="d-flex justify-content-center title">
        <StatusDialog
        open={open}
        status={status}
        onClose={handleClose}/>
        <div>
          <h2>Identified Encounter Profile</h2>
        </div>
        <Card className={classes.root}>

          {encounter.ProfilePicture?
          <CardMedia
            className={classes.media}
            image={encounter.ProfilePicture}
            title="Contemplative Reptile"
          /> :
          <GradientCircularProgress/>
          }
          {openPhotos &&
            <PhotosGrid photos={photos}  />
          }

        <CardContent>
          <Typography gutterBottom className={classes.cardtitle} component="h2">
            BlueSpotted ID no. {encounter.IdentifiedEncounterID}
          </Typography>
          <CardActions className={classes.actions}>
            <p>{photos.length}</p>
            <IconButton color="secondary" onClick={ () => setOpenPhotos(openPhotos => !openPhotos)}><PhotoLibraryIcon/></IconButton>
            <IconButton color="secondary" onClick={event =>  window.location.href=`/EditIdentifiedEncounter?id=${encounter.IdentifiedEncounterID}`}><EditIcon /></IconButton>
            <IconButton color="secondary"><DeleteIcon  /></IconButton>
          </CardActions>
          <div className ="detailsEncounter">
            <p>Observed by: {encounter.Photographer}</p>
            <p>{encounter.isAlive? 'Considerd as Alive' : 'Considerd as Dead'}</p>
            <p>First reported on Encounter no. {encounter.EncounterID}</p>
            <p>Created at {date}</p>
            <p>Gender: {encounter.Sex}</p>
            <p>{encounter.TL ? `TL: ${encounter.TL} cm` : '' }   </p>
            <p>{encounter.DL ? `DL: ${encounter.DL} cm` : '' }   </p>
            <p>DW: {encounter.DW}</p>
            <p>Max depth: { `${encounter.MaxDepth} meter`}</p>
            <p>Water temperature: {encounter.Temp} </p>
            <p> {encounter.Link ? 'Link to source:' + encounter.Link : ''}</p>
            <p className={classes.update}>{encounter.UpdatedBy ? 'Updated by: ' + encounter.User.firstName : ''}{encounter.UpdatedAt ? ' on ' + (new Date(encounter.UpdatedAt)).toLocaleDateString("he-IL") : ''}</p> 
          </div>
          </CardContent>
      </Card>
      </div>
    
    </div>
</div>
)}
  }

