import React, { useState, useEffect }  from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import {RadioGroup, Radio, FormControlLabel} from '@material-ui/core'
import {MenuItem, Card} from "@material-ui/core";
import {EncounterService} from '../../../Service/EncounterService';
import { useForm, Controller  } from 'react-hook-form';
import StatusDialog from '../components/StatusDialog';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

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
    const [value, setValue] = useState('unknown');
    const [pValue, setpValue] = useState(true);
    const [status, setStatus] = useState([]);
    const [openRespons, setOpenRespons] = useState(false);
    const [site, setSite] = useState('');
    const [sites, setSites] = useState([]);
    const { register, handleSubmit, control } = useForm();
    const [selectedDate, setSelectedDate] = useState(new Date('2020-01-01T00:00:00'));

   useEffect(() => {
    EncounterService.getIsraelSites().then(data => {
        console.log(data)
        setSites(data);
      })
      .catch(err => console.log(err));
      
  }, []);
  
  const handleDateChange = (date) => {
    setSelectedDate(new Date(date));
    console.log(selectedDate);

  };

  const handleChange = event => {
    setSite(event.target.value);
  };
  const handleCloseRespons = () => {
    setOpenRespons(false);
  };
  const onSubmit = data => {
    console.log(data);
    data.SiteID = site;
    data.EncounterDate = selectedDate;
    EncounterService
      .addEncounter(data)
      .then(result=>{
        setStatus('Encounter was added successfuly!');
        setOpenRespons(true);
        window.location.href = "/UploadPhoto?id=" + JSON.stringify(result.data.newEncounter.EncounterID);
      })
      .catch(err => {
        setStatus('Oops... Somthing went wrong, try again.');
        setOpenRespons(true);
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
          <div className="container">
          {/* <div className="row">
            <TextField
              required
              inputRef={register}
              name="EncounterDate"
              label="Date of the encounter"
              margin="normal"
              halfwidth="true"
              helperText="Example: 2021-01-30"
            />
          </div> */}
           <Controller 
          render={() => (
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="EncounterDate"
                  label="Encounter Date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />   
            </MuiPickersUtilsProvider>
                        
          )}
          name="EncounterDate"
          control={control}
          defaultValue={selectedDate}
            />
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
                  name="SpottedCountReported"
                  label="Number of Bluespotted"
                  margin="normal"
                  halfwidth="true"
                  helperText="Please enter number of Bluespotted"
                />
              </div>
              <br></br>
              <br></br>
              <div className="lowerContainer">
              <section>
              <label>Gender</label>
            <Controller
              as={
                <RadioGroup aria-label="gender" name="Gender" >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="unknown"
                    control={<Radio />}
                    label="Unknown"
                  />
                </RadioGroup>
              }
              name="Gender"
              control={control}
              defaultValue={value}
            />
            </section>
            <section>
              
            <label>Spotted Pregnancy?</label>
            <Controller
              as={
                <RadioGroup aria-label="isPregnant" name="IsPregnant"  >
                  <FormControlLabel
                    value = "Yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="No"
                    control={<Radio />}
                    label="No"
                  />

                </RadioGroup>
              }
              name="IsPregnant"
              control={control}
              defaultValue={pValue}
            />
            </section>
            </div>

              <div className="row">
                <TextField
                  inputRef={register}
                  name="Email"
                  label="Your Email"
                  margin="normal"
                  halfwidth="true"
                  helperText="Would you like to recieve updates?"

                />
              </div>
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