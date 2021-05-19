import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Button} from "@material-ui/core";
import {SystemResultsService} from '../../../../Service/SystemResultsService';
import {VideoService} from '../../../../Service/VideoService';
import {EncounterService} from '../../../../Service/EncounterService';

// import {speciesDetectionService} from '../../../../Service/DetectionService/speciesDetectionService';
import StatusDialog from '../../components/StatusDialog';
import LinearProgressWithLabel from './Progress'
import PermMediaIcon from '@material-ui/icons/PermMedia';

const useStyles = makeStyles(() => ({
  root: {
      flexGrow: 1,
      padding: 50,
      margin: `50px auto`,
      width: 800,
  },
  progress:{
    width: '400px',
    margin: '10px'
  }
}));

const UploadVideo = (props) => {
  const classes = useStyles();
  const { encounterid } = props
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [openRespons, setOpenRespons] = useState(false);
  const [status, setStatus] = useState('');

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  
  const handleCloseRespons = () => {
    setOpenRespons(false);
  };
  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', encounterid);

    try {
      const res = 
      // await speciesDetectionService
      // .detectSpeciesVideos(formData)
      // .then(res => console.log(res))
      await axios.post(`http://40.91.223.174:5000/uploadVideo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
          // Clear percentage
          setTimeout(() => setUploadPercentage(0), 10000);
        }
      })
      .then(res => {
        // console.log(res);
        VideoService.addVideo(encounterid, filename)
         .catch(err=>console.log(err));
         SystemResultsService.addVideoFirstSystemResults(res, encounterid)
         .then(res => {
           const data={ProfilePicture: res.photosResults[0].src, MediaType: 2 }
          EncounterService.updateEncounter(encounterid, data)
          .then(() =>{
            setStatus('Your video was succesfully uploaded. Thank you!')
            setOpenRespons(true);
          }) 
          .catch(err => {
            setStatus(`Failed updating encounter profile pic...` );
            setOpenRespons(true);
          });
         })
         .catch(err=>console.log(err));


      });

      // const { fileName, filePath } = res.data;
      // setUploadedFile({ fileName, filePath });

    } catch (err) {
      if(err.response){
        if (err.response.status === 500) {
          setStatus('There was a problem with the server');
          setOpenRespons(true);
  
        } 
        else if (err.response.status === 404) {
          // setMessage('There was a problem ....Try again');
          setStatus('Video upload faild....Try again');
          setOpenRespons(true);
        }
        else {
          setStatus("Unreachable please try later");
          setOpenRespons(true);
  
        }
      }
      else {
        setStatus("Server is unreachable... please try later");
        setOpenRespons(true);

      }
    }
  };

  return (
    <Fragment>
      {/* <Card className={classes.root}> */}
      {/* {message ? <Message msg={message} /> : null} */}
      <StatusDialog
         open={openRespons}
         status={status}
         id={encounterid}
         onClose={handleCloseRespons}
      />
      <form onSubmit={onSubmit}>
        <div className="videoForm">
        <div className='custom-file mb-4'>
        <Button
          variant="contained"
          component="label"
          className= "btn"
          startIcon={<PermMediaIcon />}

        >
          Open File
          <input
            type="file"
            hidden
            id='customFile'
            onChange={onChange}
          />
        </Button>
          <label className='custom-file-label'  htmlFor='customFile'>
            {filename}
          </label>
        </div>
        <div className={classes.progress}>
      <LinearProgressWithLabel percentage={uploadPercentage} value={uploadPercentage} />
    </div>
        <input
          type='submit'
          value='Upload'
          className='btn'
        />
        </div>
      </form>
      {uploadedFile ? (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <h3 className='text-center'>{uploadedFile.fileName}</h3>
            <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
          </div>
        </div>
      ) : null}
       {/* </Card>            */}
     </Fragment>
  );
};

export default UploadVideo;