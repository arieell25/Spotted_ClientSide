import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import PhotosGrid from '../../Photos/PhotosGrid';
import StatusDialog from './StatusDialog';
import GradientCircularProgress from './CircularProgress';
import {EncounterService} from '../../../Service/EncounterService';
// import {userService} from '../../../Service/UserService';
import { PhotoService } from '../../../Service/PhotoService';

import qs from 'qs';

import { IconButton, Typography, Card,CardMedia, CardContent, CardActions  } from '@material-ui/core';

const useStyles = makeStyles(() => ({
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
  image: {
    width: 30,
    height: 30,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 20,
    margin: 'auto'
  },
}));

export default function EncounterProfile(props) {
    // const { index } = 5;
  const classes = useStyles();
  const [status, setStatus] = useState([]);
  const [open, setOpen] = useState(false);
  const [linkpath, setlinkpath] = useState('')
  const [edit, setEdit] = useState(false);
  const [date, setDate] = useState('');
  const [openPhotos, setOpenPhotos] = useState(false);
  const [photos, setPhotos] = useState([]);
    const [encounter, setEncounter] = useState([]);
    var id = qs.parse(props.location.search, { ignoreQueryPrefix: true }).id;

    useEffect(() => {
        const fetchData = async () => {
          const encounterData = await EncounterService.getEncounterById(id);
          const photosData = await PhotoService.getEncounterPhotos(id);
          
          let date = new Date(encounterData.EncounterDate);
          setDate(date.toLocaleDateString());
          setPhotos(photosData);
          setEncounter(encounterData)
        };
        fetchData();        
          // console.log(photos[0]);
      }, []);

  const handleDelete = (e) => {
    console.log('deleting')
    try {
        EncounterService.deleteEncounter(id)
      .then(response => {
          console.log(response)
          setStatus('Deleted Successfully.');
          setlinkpath('EncountersBoard');
          setOpen(true);});
    } catch (err) {
      console.log('error fetching...:', err);
      setStatus('Something went wrong... try again');
      setOpen(true);
    }
  };

  const handleClose = () => {
    setEdit(false);
    setOpen(false);
    setOpenPhotos(false);
  };
  // const handleEdit = () => {
  //   setEdit(true);
  // };
  // const handleSave = (title, couponName, link, discount) => {
  //   var body = {

  //   //   publisherImg: api.getLocalStorageUser().img,
  //   };
  //   try {
  //       EncounterService.updateEncounter(index, body).then(response => console.log(response));
  //     setStatus('All changes were saved');
  //     setOpen(true);
  //   } catch (err) {
  //     console.log('error fetching...:', err);
  //     setStatus('Something is wrong... try again');
  //     setOpen(true);
  //   }
  // };

if (!encounter) return <GradientCircularProgress />
else {
  return (
    <div className="animated slideInUpTiny animation-duration-3">
    <div className="m-5">
      <div className="d-flex justify-content-center title">
        <div>
          <h2>Encounter Profile</h2>
        </div>
        <StatusDialog
        open={open}
        status={status}
        link={linkpath}
        onClose={handleClose}/>

        <Card className={classes.root}>
        {encounter.ProfilePicture? <CardMedia
          component="img"
          className={classes.media}
          image={encounter.ProfilePicture}
          title="Contemplative Reptile"
        /> :
        <GradientCircularProgress />
        }
        {openPhotos &&
        <PhotosGrid photos={photos}  />
          }
        <CardContent>
            <Typography gutterBottom className={classes.cardtitle} component="h2">
              Encounter #{encounter.EncounterID}
            </Typography>
            <CardActions className={classes.actions}>
              {/* edit event listner */}
                <p>{photos.length}</p>
                <IconButton color="secondary" onClick={ () => setOpenPhotos(openPhotos => !openPhotos)}><PhotoLibraryIcon/></IconButton>
                <IconButton color="secondary" onClick={ () =>  window.location.href=`/EditEncounter?id=${encounter.EncounterID}`}><EditIcon /></IconButton>
                <IconButton color="secondary" onClick={ handleDelete }><DeleteIcon  /></IconButton>
            </CardActions>
            <div className ="detailsEncounter">
            <p>Spotted At: {date}</p>
            <p>Encounter no.: {encounter.EncounterID}</p>
            <p>Original ID: {encounter.OriginalID}</p>
            <p>Total Bluespotted Reported: {encounter.SpottedCountReported}</p>
            <p>BlueSpotted Count: {encounter.SpottedCount? encounter.SpottedCount : 'Not detected yet'}</p>
            <p>MediaType: {encounter.MediaType === 1 ? 'Photos' : 'Video'}</p>
            <p>Reported By: {encounter.ReporterEmail}</p>
            <p>{encounter.UpdateBy ? 'Last Updates By: '+encounter.UpdateBy : ''}{encounter.UpdateAt ? ' at: ' + encounter.UpdateAt : ''}</p>
            </div>
          </CardContent>
          <button className='btn'onClick={event =>  window.location.href=`/IdentifyPhoto?id=${encounter.EncounterID}`} >
                  IDENITFY
          </button> 


    </Card>
      </div>
    
    </div>
</div>
  );
}
}

