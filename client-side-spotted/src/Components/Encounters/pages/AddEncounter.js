import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import GradientCircularProgress from "../components/CircularProgress";

import {
  RadioGroup,
  Radio,
  FormControlLabel,
  InputAdornment,
} from "@material-ui/core";
import { MenuItem, Card } from "@material-ui/core";
import { EncounterService } from "../../../Service/EncounterService";
import { userService } from "../../../Service/UserService";
import { useForm, Controller } from "react-hook-form";
import StatusDialog from "../components/StatusDialog";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    padding: 50,
    margin: `2px auto`,
    width: 800,
  },
}));

export default function AddEncounter() {
  const classes = useStyles();
  const [value, setValue] = useState("unknown");
  const[ loading, setLoading] = useState(false);
  const [pValue, setpValue] = useState(true);
  const [status, setStatus] = useState([]);
  const [openRespons, setOpenRespons] = useState(false);
  const [site, setSite] = useState("");
  const [sites, setSites] = useState([]);
  const { register, handleSubmit, control } = useForm();
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    EncounterService.getIsraelSites()
      .then((data) => {
        console.log(data);
        setSites(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(new Date(date));
    console.log(selectedDate);
  };

  const handleChange = (event) => {
    setSite(event.target.value);
  };
  const handleCloseRespons = () => {
    setOpenRespons(false);
  };
  const onSubmit = (data) => {
    console.log(data);
    setLoading(true);
    data.SiteID = site;
    data.EncounterDate = selectedDate;
    EncounterService.addEncounter(data)
      .then((result) => {
        setStatus("Encounter was added successfuly!");
        // setOpenRespons(true);
        setTimeout(() => {
          window.location.href =
            "/UploadPhoto?id=" +
            JSON.stringify(result.data.newEncounter.EncounterID);
        }, 2000);
      })
      .catch((err) => {
        setStatus("Oops... Somthing went wrong, try again.");
        setOpenRespons(true);
      });
  };
 if(loading) return <GradientCircularProgress />;
 else return (
    <div className="m-5">
      <Card className={classes.root}>
        <div className="d-flex justify-content-center title">
          <div>
            <h2>Report Encounter</h2>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container">
            <div className="lowerContainer">
              <Controller
                render={() => (
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="EncounterDate"
                      label="Encounter Date*"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                )}
                name="EncounterDate"
                control={control}
                defaultValue={selectedDate}
              />
              <section>
                <TextField
                  inputRef={register}
                  name="Photographed by"
                  label="Photographer name"
                  margin="normal"
                  halfwidth="true"
                />
              </section>
              <section>
                <div className="row">
                  <Controller
                    render={({ field }) => (
                      <TextField
                        select
                        label="Site*"
                        name="Site"
                        value={site}
                        id="filled-required"
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
                    )}
                    control={control}
                    name="SiteID"
                    defaultValue={site}
                  />
                </div>
              </section>

              <div className="row">
                <TextField
                  inputRef={register}
                  name="SpottedCountReported"
                  label="Number of Bluespotted*"
                  margin="normal"
                  halfwidth="true"
                  helperText="Please enter number of Bluespotted"
                />
              </div>
            </div>
            <div className="lowerContainer">
              {userService.isAdmin() && (
                <section>
                  <TextField
                    inputRef={register}
                    name="OriginalID"
                    label="SII ID"
                    margin="normal"
                    halfwidth="true"
                    helperText="Researchers only"
                  />
                </section>
              )}
              <section>
                <TextField
                  inputRef={register}
                  name="DW"
                  label="Disc width"
                  margin="normal"
                  halfwidth="true"
                  helperText="Please enter DW"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">cm</InputAdornment>
                    ),
                  }}
                />
              </section>
              <section>
                <TextField
                  inputRef={register}
                  name="DL"
                  label="Disc length"
                  margin="normal"
                  halfwidth="true"
                  helperText="Please enter DL"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">cm</InputAdornment>
                    ),
                  }}
                />
              </section>
              <section>
                <TextField
                  inputRef={register}
                  name="TL"
                  label="Total length"
                  margin="normal"
                  halfwidth="true"
                  helperText="Please enter TL"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">cm</InputAdornment>
                    ),
                  }}
                />
              </section>
              <section>
                <TextField
                  inputRef={register}
                  name="MaxDepth"
                  label="Maximum depth"
                  margin="normal"
                  halfwidth="true"
                  helperText="Please enter diving depth"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">m</InputAdornment>
                    ),
                  }}
                />
              </section>
              <section>
                <TextField
                  inputRef={register}
                  name="Distance"
                  label="Distance"
                  margin="normal"
                  halfwidth="true"
                  helperText="Please enter distance"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">m</InputAdornment>
                    ),
                  }}
                />
              </section>
              <section>
                <TextField
                  inputRef={register}
                  name="Temp"
                  label="Water temperature "
                  margin="normal"
                  halfwidth="true"
                  helperText="Please enter water temperature"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">℃</InputAdornment>
                    ),
                  }}
                />
              </section>
            </div>

            <TextField
              inputRef={register}
              name="Link"
              label="Link to source"
              margin="normal"
              fullWidth={true}
            />
            <br></br>

            <br></br>
            <div className="lowerContainer">
              <section>
                <label>Gender</label>
                <Controller
                  as={
                    <RadioGroup aria-label="gender" name="Gender">
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
                    <RadioGroup aria-label="isPregnant" name="IsPregnant">
                      <FormControlLabel
                        value="Yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="No"
                        control={<Radio />}
                        label="No"
                      />
                      <FormControlLabel
                        value="null"
                        control={<Radio />}
                        label="Unknown"
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
                name="Description"
                label="Additional info "
                margin="normal"
                fullWidth={true}
              />
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
          <button className="btn" type="submit">
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
