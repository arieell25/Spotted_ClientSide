import React, { Fragment, useState }  from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import {EncounterService} from '../../Service/EncounterService';
import { Link, history } from 'react-router-dom';
import { useForm, Controller  } from 'react-hook-form';
import StatusDialog from './StatusDialog';

// import {
//   Dialog,
//   DialogContent,
//   DialogContentText,
//   IconButton,
//   DialogTitle,
//   Grid,
// } from '@material-ui/core';


const sitesName = [
  {
    value: "Eilat",
    label: "Eilat"
  },
  {
    value: "Katzaa",
    label: "Katzaa"
  },
  {
    value: "Reserve",
    label: "Reserve"
  },
  {
    value: "almogBeach",
    label: "Almog Beach"
  }
];

// class AddEncounter extends React.Component {
  export default function AddEncounter(){
  //  var state = {
  //   nickName: "",
  //   dateOfTheEncounter: "",
  //   // timeOfTheEncounter: "",
  //   site: "",
  //   email: "",
  //   spottedCount: ""
  // };
  const [status, setStatus] = useState([]);
  const [openRespons, setOpenRespons] = useState(false);

  const [site, setSite] = useState("Eilat");
   const { register, handleSubmit, errors, control } = useForm();

  // const handleChange = prop => event => {
  //   this.setState({ [prop]: event.target.value });
  // };
  const handleCloseRespons = () => {
    setOpenRespons(false);
  };
  const onSubmit = data => {
    console.log(data);
    EncounterService
      .addEncounter(data)
      .then(result=>{
        console.log('added auccesfully new encounter!')
        setStatus('Encounter was added successfuly!');
        setOpenRespons(true);
        window.location.href = "/UploadPhoto?id=" + JSON.stringify(result.data.newEncounter.EncounterID);
      })
      .catch(err => {
        // setState({ message: err.toString() });
        setStatus('Oops... Somthing went wrong, try again.');
        setOpenRespons(true);
        console.log(err);
      });
  };

  
    // console.log("state", this.state);
    return (
      <div className="animated slideInUpTiny animation-duration-3">
        <div className="m-5">
          <div className="d-flex justify-content-center title">
            <div>
              <Link to='/' style={{ 'textDecoration': 'none' }}><h2>New Encounter Info</h2></Link>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <TextField
              required
              inputRef={register}
              name="EncounterDate"
              label="Date of the encounter*"
              margin="normal"
              halfwidth="true"
            />
          </div>
          <div className="row">
            <TextField
               inputRef={register}
              select
              required
              name="SiteID"
              value={site}
              halfwidth="true"
              label="Site"
              // onChange={event => {
              //   setSite(event.target.value);
              // }}
              // InputProps={{
              //   startAdornment: (
              //     <InputAdornment position="start">
              //       Site*
              //     </InputAdornment>
              //   )
              // }}
            >
              {sitesName.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <div className="row">
            <TextField
              inputRef={register}
              name="Email"
              label="Your Email*"
              margin="normal"
              halfwidth="true"
            />
          </div>

          <div className="row">
            <TextField
              inputRef={register}
              name="SpottedCountReported"
              label="How many bluespotted?"
              margin="normal"
              halfwidth="true"
            />
          </div>
          
              {/* <Link to='/UploadPhoto'> */}
                <button className='btn' type="submit" >
                  NEXT
                  {/* <Link to='/UploadPhoto'/>  */}
                  </button>
              {/* </Link> */}
              </form>
              </div>
              <StatusDialog
                open={openRespons}
                status={status}
                onClose={handleCloseRespons}
        />
          </div>
    );
}

// export default AddEncounter;