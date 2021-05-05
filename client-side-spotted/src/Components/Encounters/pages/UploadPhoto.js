import React, {useState} from 'react';
import ImageUploader from 'react-images-upload';
import {EncounterService} from '../../../Service/EncounterService';
import {speciesDetectionService} from '../../../Service/DetectionService/speciesDetectionService';
import {PhotoService} from '../../../Service/PhotoService';
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

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
// class UploadPhoto extends Component {
    function UploadPhoto(){
        const classes = useStyles();
        const [expanded, setExpanded] = useState(false);
        const [pictures, setPictures] = useState([]);
        const [status, setStatus] = useState('');
        const [openRespons, setOpenRespons] = useState(false);
        const [newId, setId] = useState(null);

        let query = useQuery();
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

        // const uploadHandler= async () =>{
        //     console.log(pictures);
        //     var id = query.get("id");
        //     setId(id);
        //     console.log(id);
        //     const fd = new FormData();
        //     fd.append('image', pictures[0][0], pictures[0][0].name);
        //     try{
        //         // await speciesDetectionService
        //         // .detectSpecies(fd)
        //         // .then( res => {
        //             //Check if confidence > 70%
        //             // console.log(res);
        //             // var bBox = res.data;
        //             var url, photoId;
        //             // var count = res.counts;
        //             // var confidence = (res.data[0][0].confidences).toString().substring(0,4);
        //             // if(res.counts > 0 && confidence > 0.61){
        //                 PhotoService
        //                 .uploadRawPhoto(fd, id)
        //                 .then(data => {
        //                     console.log('Added photo: ' + data.url);
        //                     url = data.url;
        //                     // PhotoService.addPhoto(id, url, count)
        //                     // .then(res=>{
        //                     //     photoId = res.data.newPhoto.PhotoID;
        //                     //     EncounterService.addBoundingBox(bBox, photoId)
        //                     //     .then(res=> console.log('added bounding box status: '+ JSON.stringify(res) ))
        //                     // } )
        //                     // .catch(err=> console.log(err));
        //                     // setStatus(`Detected ${count} BlueSpotted with ${confidence} and saved photo!`);
        //                     // setOpenRespons(true);
        //                 })
        //                 .catch(err => {
        //                     console.log(err);
        //                     setStatus('Photo upload faild');
        //                     setOpenRespons(true);
        //                 });
        //             // }else if(res.counts == 0){
        //             //     setStatus('Sorry we did not detect any BlueSpotted.... try with a diffrent photo.');
        //             //     setOpenRespons(true)
        //             // }
                
        //         // )
        //         // .catch(err=>{
        //         //         console.log(err);
        //         //         setStatus('Oops...Something went wrong....');
        //         //         setOpenRespons(true)
        //         // }); 
               
        //     // }
        // }catch(err){
        //     console.log(err)
        // }}
     
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
                        <UploadVideo/>
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
    

// const UploadPhoto = () => {
//    return (
//       <div className="d-flex justify-content-center title">
//       <div>
//         <Link to='/' style={{ 'textDecoration': 'none' }}><h2>UPLOAD PHOTO</h2></Link>
//       </div>
//       <div>
//       <div className="chooseFile">
//       <input className="FilePath" id="FilePath" label="File Path" name="FilePath" placeholder="Type here..."/>
//             <button className='btn' type="button">Choose a file</button>
//     </div>
//     <div className="button">
//         <Link to='/'>
//                 <button className='btn' type="button">UPLOAD</button>
//         </Link>
//         </div>
//         <div className="button">
//          <Link to='/'>
//                 <button className='btn' type="button">NEXT</button>
//         </Link>
//         </div>
//       </div>
//       </div>
//    )
// }
    
export default UploadPhoto