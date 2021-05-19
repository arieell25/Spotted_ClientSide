import 'date-fns';
import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import {RadioGroup, Radio, FormControlLabel} from '@material-ui/core'
import {TextField, Card} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import {EncounterService} from '../../../Service/EncounterService';
import { useForm, Controller  } from 'react-hook-form';
import StatusDialog from '../components/StatusDialog';
import qs from 'qs';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';


const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    padding: 50,
    width: 800,
    margin: `0 auto`
  },
 }));

export default function EditIdentifiedEncounter(props) {
  const classes = useStyles();
  const [status, setStatus] = useState([]);
  const [openRespons, setOpenRespons] = useState(false);
  const [mediatypes, setmediatypes] = useState([]);
  const [media, setmedia] = useState("");
  const [count, setcount] = useState([]);
  const [encounter, setencounter] = useState([]);
  const [verified, setVerified] = useState('no');
  const [pvalue, setpvalue] = useState("no");
  const [gender, setgender] = useState('unknown');
  const [sites, setsites] = useState([]);
  const [site, setsite] = useState('');
  const [originalid, setoriginalid] = useState('');
  const [profile, setprofile] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date('2020-01-01T21:11:54'));
  const { register, handleSubmit, control } = useForm();
  var id = qs.parse(props.location.search, { ignoreQueryPrefix: true }).id;

  useEffect(() => {
    const fetchData = async () => {
      const sitesData = await EncounterService.getIsraelSites();
      const mediatypeData = await EncounterService.getMediatypes();
      const encounter = await EncounterService.getEncounterById(id);
      console.log(encounter.SpottedCountReported);
      setsites(sitesData);
      setSelectedDate(new Date(encounter.EncounterDate));
      setgender(encounter.Gender)
      setpvalue(encounter.IsPregnant ? 'yes' : 'no');
      setsite(encounter.SiteID);
      setmedia(encounter.MediaType);
      setcount(encounter.SpottedCountReported);
      setprofile(encounter.ProfilePicture);
      setoriginalid(encounter.OriginalID);
      setVerified(encounter.Verified === true ? 'yes' : 'no');
      setmediatypes(mediatypeData);
      setencounter(encounter);

    };
    fetchData();        
  }, []);

  const handleCloseRespons = () => {
    setOpenRespons(false);
  };

  const handleChange = (event) => {
    setsite(event.target.value);
  }
  const handleMediaChange = (event) => {
    setmedia(event.target.value);
  }
  
  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(date);
  };
  const onSubmit = data => {
    console.log(data);
    // data.SiteID = site;
    EncounterService
      .updateEncounter(id, data)
      .then(result=>{
        setStatus(`Updated succesfully encounter #${id}!`);
        setOpenRespons(true);
      })
      .catch(err => {
        setStatus('Oops... Somthing went wrong, try again.');
        setOpenRespons(true);
        console.log(err);
      });
  };

    return (

      <div className="animated slideInUpTiny animation-duration-3">
        <div className="m-5">
          <div className="d-flex justify-content-center title">
            <div>
              <h2>Edit Encounter #{id}</h2>
            </div>
          </div>
          <Card className={classes.root}>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                        name = "SiteID"
                        value={site}
                        onChange={handleChange}
                        helperText="Update site of encounter"
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
            <Controller
                      render={
                      ({field}) => <TextField
                        select
                        label="Media Type"
                        name = "MediaType"
                        value={media}
                        onChange={handleMediaChange}
                        helperText="Update type of media"
                        {...field}
                      >
                        {mediatypes.map((option) => (
                          <MenuItem key={option.MediaTypeID} value={option.MediaTypeID}>
                            {option.Title}
                          </MenuItem>
                        ))}
                      </TextField>
                      }
                      control={control}
                      name="MediaType"
                      defaultValue={media}

                    />
              </div>
              <div className='lowerContainer'>
            <section>
              <label>Sex</label>
            <Controller
              as={
                <RadioGroup aria-label="Gender" name="Gender" >
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
              defaultValue={gender}
            />
            </section>
            <section>
              <label>Spotted Pregnancy?</label>
            <Controller
              as={
                <RadioGroup aria-label="isAlive" name="isAlive" >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="no"
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              }
              name="IsPregnant"
              control={control}
              defaultValue={pvalue}
            />
            </section>
            <section>
              <label>Verified by Resercher?</label>
            <Controller
              as={
                <RadioGroup aria-label="Verified" name="Verified" >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="no"
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              }
              name="Verified"
              control={control}
              defaultValue={verified}
            />
            </section>
            </div>
          <div className="row">
            <TextField
              inputRef={register}
              name="SpottedCount"
              label="Bluespotted count"
              margin="normal"
              defaultValue={count}
              helperText={`Was reported ${count} Bluespotted`}
              style = {{width: 250}}             
              />
          </div>

          <div className="row">
            <TextField
              inputRef={register}
              name="OriginalID"
              label="Original ID"
              margin="normal"
              defaultValue={originalid}
            />
          </div>
          <div className="row">
            <TextField
              inputRef={register}
              name="ProfilePicture"
              label="Profile picture link"
              margin="normal"
              halfwidth="true"
            />
          </div>
            <button className='btn' type="submit" >
                  SAVE
                </button>
              </form>
              </Card>
              </div>
              <StatusDialog
                open={openRespons}
                status={status}
                onClose={handleCloseRespons}
        />
          </div>
    );
  }


