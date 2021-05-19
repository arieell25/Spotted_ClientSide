import React, { Fragment, useState, useEffect } from 'react';
// import { MuiThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import PhotosGrid from '../../Photos/PhotosGrid';
import GradientCircularProgress from './CircularProgress';
import {userService} from '../../../Service/UserService';
import { PhotoService } from '../../../Service/PhotoService';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';

import { Dialog, CardContent, Card, Typography,CardActions, IconButton, CardMedia} from '@material-ui/core';
// import { StyledButton } from '../Theme/Button.styled';

const useStyles = makeStyles(theme => ({
  root: {
    maxHeight: 800,
    maxWidth: 1000,
    flexGrow: 1,
    margin: 'auto',
  },
  cardtitle:{
    textAlign: 'center',
    fontSize:30

  },
  actions:{
    justifyContent: 'flex-end'
  },
  media:{
    flex: 1,
    width: 500,
    height: 300,
    margin: `0 auto`,
    borderRadius: 10
  },
}));

export default function ProfileDialog(props) {
  const classes = useStyles();
  const { open, onClose, encounter } = props;
  const [openPhotos, setOpenPhotos] = useState(false);
  const [date, setDate] = useState('');
  const [photos, setPhotos] = useState([]);
  const [userName, setUserName] = useState();

  useEffect(() => {
    console.log(encounter);
    const fetchData = async () => {
      // const encounterData = await EncounterService.getEncounterById(id);
      const photosData = await PhotoService.getIdntEncounterPhotos(encounter[0].IdentifiedEncounterID);
      const user = await userService.getUserName(encounter[0].UpdatedBy);
      let date = new Date(encounter[0].CreatedAt);
      setUserName(user);
      console.log(user[1]);
      setDate(date.toLocaleDateString());
      setPhotos(photosData);
      // setEncounter(encounterData)
    };
    fetchData();        
      // console.log(photos[0]);
  }, []);

  return (
      <Fragment>
        <Dialog
          className={classes.root}
          open={open}
          onClose={onClose}
          aria-labelledby="form-dialog-title"

        >
          <Card>
        {encounter[0].ProfilePicture? 
        <CardMedia  
          component="img"
          className={classes.media}
          image={encounter[0].ProfilePicture}
          title="Contemplative Reptile"
        /> 
        : 
        <GradientCircularProgress />

        }
        {openPhotos &&
        <PhotosGrid photos={photos}  />
          }
        <CardContent >
            <Typography gutterBottom className={classes.cardtitle} component="h2">
              Identity no. {encounter[0].IdentifiedEncounterID}
            </Typography>
            <CardActions className={classes.actions}>
              {/* edit event listner */}
                <p>{photos.length}</p>
                <IconButton color="secondary" onClick={ () => setOpenPhotos(openPhotos => !openPhotos)}><PhotoLibraryIcon/></IconButton>
                {/* <IconButton color="secondary" onClick={ () =>  window.location.href=`/EditEncounter?id=${encounter.EncounterID}`}><EditIcon /></IconButton> */}
            </CardActions>
            <div className ="detailsEncounter">
            <p>Spotted by: {encounter[0].Photographer}</p>
            <p>{encounter[0].isAlive? 'Considerd as Alive' : 'Considerd as Dead'}</p>
            <p>{encounter[0].EncounterID ? `First reported on Encounter no. ${encounter[0].EncounterID}` : ''}</p>
            <p>Created at {date}</p>
            <p>Gender: {encounter[0].Sex}</p>
            <p>{encounter[0].TL ? `TL: ${encounter[0].TL} cm` : '' }   </p>
            <p>{encounter[0].DL ? `DL: ${encounter[0].DL} cm` : '' }   </p>
            <p>DW: {encounter[0].DW}</p>
            <p>Max depth: { `${encounter[0].MaxDepth} meter`}</p>
            <p>Water temperature: {encounter[0].Temp} </p>
            <p> {encounter[0].Link ? `Link to source: ${encounter[0].Link}` : ''}</p>
            {userName &&
            <p>{encounter[0].UpdatedBy ? 'Last Updates By: ' + userName.firstName : ''} {encounter[0].UpdatedAt ? ' at ' + (new Date(encounter[0].UpdatedAt)).toLocaleDateString() : ''}</p> 
  }
    </div>
          </CardContent >
          </Card>
        </Dialog>
      </Fragment>
  );
}
