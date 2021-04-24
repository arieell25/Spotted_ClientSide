import React, { Fragment, useState } from 'react';
import Message from './Message';
// import Progress from './Progress';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {Card, Button} from "@material-ui/core";
// import {speciesDetectionService} from '../../../../Service/DetectionService/speciesDetectionService';
import StatusDialog from '../../components/StatusDialog';
import LinearProgressWithLabel from './Progress'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

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

const UploadVideo = () => {
  const classes = useStyles();

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

    try {
      const res = 
      // await speciesDetectionService
      // .detectSpeciesVideos(formData)
      // .then(res => console.log(res))
      await axios.post('http://40.91.223.174:5000/uploadVideo', formData, {
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
      });

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

      
      setMessage('File Uploaded');
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
      <Card className={classes.root}>
      {/* {message ? <Message msg={message} /> : null} */}
      <StatusDialog
         open={openRespons}
         status={status}
         onClose={handleCloseRespons}
      />
      <form onSubmit={onSubmit}>
        <div className="videoForm">
        <div className='custom-file mb-4'>
        <Button
          variant="contained"
          component="label"
          className= "btn"
          startIcon={<CloudUploadIcon />}

        >
          Upload
          <input
            type="file"
            hidden
            id='customFile'
            onChange={onChange}
          />
        </Button>
          {/* <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={onChange}
          /> */}
          <label className='custom-file-label'  htmlFor='customFile'>
            {filename}
          </label>
        </div>

        {/* <Progress percentage={uploadPercentage} /> */}
        <div className={classes.progress}>
      <LinearProgressWithLabel percentage={uploadPercentage} value={uploadPercentage} />
    </div>
        <input
          type='submit'
          value='Save'
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
       </Card>           
     </Fragment>
  );
};

export default UploadVideo;