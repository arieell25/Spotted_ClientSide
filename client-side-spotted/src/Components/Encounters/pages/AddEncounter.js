import React, { useState, useEffect }  from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import {MenuItem, Card} from "@material-ui/core";
import {EncounterService} from '../../../Service/EncounterService';
import { useForm, Controller  } from 'react-hook-form';
import StatusDialog from '../components/StatusDialog';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    padding: 50,
    margin: `50px auto`,
    width: 800,
  },
}));

  export default function AddEncounter(){
    const classes = useStyles();
    const [status, setStatus] = useState([]);
    const [openRespons, setOpenRespons] = useState(false);
    const [site, setSite] = useState('');
    const [sites, setSites] = useState([]);
    const { register, handleSubmit, control } = useForm();

   useEffect(() => {
    EncounterService.getIsraelSites().then(data => {
        console.log(data)
        setSites(data);
      })
      .catch(err => console.log(err));
      
  }, []);
  
  const handleChange = event => {
    console.log("event: ", event.target.value);
    setSite(event.target.value);
    console.log("site: ", site);

  };
  const handleCloseRespons = () => {
    setOpenRespons(false);
  };
  const onSubmit = data => {
    console.log(data);
    data.SiteID = site;
    console.log("after: ", data);
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
        <div className="m-5">
         <Card className={classes.root}>

          <div className="d-flex justify-content-center title">

            <div>
              <h2>Report Encounter</h2>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <TextField
              required
              inputRef={register}
              name="EncounterDate"
              label="Date of the encounter"
              margin="normal"
              halfwidth="true"
              helperText="Example: 2021-01-30"
            />
          </div>
          <div className="row">
            <Controller
                      render={
                      ({field}) => <TextField
                        select
                        label="Site"
                        name = "Site"
                        value={site}
                        onChange={handleChange}
                        helperText="Please select site of encounter"
                        {...field}
                      >
                        {sites.map((option) => (
                          <MenuItem key={option.SiteID} value={option.SiteID}>
                            {option.SiteName}
                          </MenuItem>
                        ))}
                      </TextField>
                      }
                      control={control}
                      name="SiteID"
                      defaultValue={site}

                    />
              </div>
              <div className="row">
                <TextField
                  inputRef={register}
                  name="Email"
                  label="Your Email"
                  margin="normal"
                  halfwidth="true"
                />
              </div>

              <div className="row">
                <TextField
                  inputRef={register}
                  name="SpottedCountReported"
                  label="Number of Bluespotted"
                  margin="normal"
                  halfwidth="true"
                  helperText="Please enter number of Bluespotted"
                />
              </div>
                <button className='btn' type="submit" >
                  NEXT
                </button>
              </form>
              <StatusDialog
                open={openRespons}
                status={status}
                onClose={handleCloseRespons}
              />
           </Card>
          </div>
    );
}

// export default AddEncounter;