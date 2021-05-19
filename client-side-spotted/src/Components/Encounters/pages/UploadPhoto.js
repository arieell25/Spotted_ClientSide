import React, {useState} from 'react';
import qs from 'qs';
import ImageUploader from 'react-images-upload';
import {EncounterService} from '../../../Service/EncounterService';
import {speciesDetectionService} from '../../../Service/DetectionService/speciesDetectionService';
import { Link, useLocation, BrowserRouter as Router } from "react-router-dom";
import StatusDialog from '../components/StatusDialog';
import { makeStyles } from '@material-ui/core/styles';
import {Card, Button} from "@material-ui/core";
import PhotosUploader from '../../Photos/PhotosUploader';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import UploadVideo from './video/UploadVideo';
const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        padding: 50,
        margin: `50px auto`,
        width: 800,
    },

}));


// class UploadPhoto extends Component {
    function UploadPhoto(props){
        const classes = useStyles();
        const [expanded, setExpanded] = useState(false);
        const [pictures, setPictures] = useState([]);
        const [status, setStatus] = useState('');
        const [openRespons, setOpenRespons] = useState(false);
        const [newId, setId] = useState(null);
        var id = qs.parse(props.location.search, { ignoreQueryPrefix: true }).id;

        const handleExpandClick = () => {
            setExpanded(!expanded);
          };

        const onDrop = (picture) => {
            console.log(picture);
            // setPictures(picture);
            setPictures(prevState=>[picture, ...prevState]);
            // const newState = [picture];
            // setPictures(newState);
        }

        const handleCloseRespons = () => {
            setOpenRespons(false);
          };
          const handleOpenRespons = (status) => {
              setStatus(status);
            setOpenRespons(true);
          };

    
            return (
                <Card className={classes.root}>
                    <div>
                        <h2>Upload Media</h2>
                    </div>
                    <Button
                        onClick={handleExpandClick}
                        aria-expanded={!expanded}
                        aria-label="upload video"
                        endIcon={<ExpandMoreIcon />}
                        >
                        Upload Photos
                        
                    </Button>
                    <Collapse in={!expanded} timeout="auto" unmountOnExit>
                        <PhotosUploader 
                          handleOpenRespons={handleOpenRespons}
                          setId = {setId}
                          status={status}/>
                    </Collapse>
                    <Button
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="upload video"
                        endIcon={<ExpandMoreIcon />}
                        >
                        Upload Video                       
                    </Button>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <UploadVideo encounterid={id}/>
                    </Collapse>
                    <StatusDialog
                        open={openRespons}
                        status={status}
                        id={newId}
                        onClose={handleCloseRespons}
                    />
                </Card>           
                );
        }
        
export default UploadPhoto