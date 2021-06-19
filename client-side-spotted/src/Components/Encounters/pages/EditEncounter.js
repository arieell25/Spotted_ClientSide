/* eslint-disable react-hooks/exhaustive-deps */
import "date-fns";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  RadioGroup,
  Radio,
  FormControlLabel,
  InputAdornment,
} from "@material-ui/core";
import { TextField, Card } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { EncounterService } from "../../../Service/EncounterService";
import { useForm, Controller } from "react-hook-form";
import StatusDialog from "../components/StatusDialog";
import qs from "qs";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    padding: 50,
    width: 800,
    margin: `0 auto`,
  },
}));

export default function EditIdentifiedEncounter(props) {
  const classes = useStyles();
  const [status, setStatus] = useState([]);
  const [openRespons, setOpenRespons] = useState(false);
  const [mediatypes, setmediatypes] = useState([]);
  const [media, setmedia] = useState(`1`);
  const [encounter, setencounter] = useState([]);
  const [sites, setsites] = useState([]);
  const [site, setsite] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { register, handleSubmit, control, reset } = useForm();
  var id = qs.parse(props.location.search, { ignoreQueryPrefix: true }).id;
  const [values, setValues] = useState({
    Gender: "unknown",
    IsPregnant: "",
    SpottedCount: "",
    OriginalID: "",
    ProfilePicture: "",
    DW: "",
    DL: "",
    TL: "",
    MaxDepth: "",
    Distance: "",
    Temp: "",
    Description: "",
    Link: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      await EncounterService.getIsraelSites().then((res) => {
        setsites(res);
      });
      await EncounterService.getMediatypes().then((res) => setmediatypes(res));
      await EncounterService.getEncounterById(id).then((res) => {
        setencounter(res);
        reset({
          Gender:
            res.Gender === "unknown"
              ? "unknown"
              : res.Gender === "female"
              ? "female"
              : "male",
          IsPregnant: res.IsPregnant ? "yes" : "no",
          SpottedCount: res.SpottedCountReported,
          OriginalID: res.OriginalID,
          ProfilePicture: res.ProfilePicture,
          DW: res.DW,
          DL: res.DL,
          TL: res.TL,
          MaxDepth: res.MaxDepth,
          Distance: res.Distance,
          Temp: res.Temp,
          Description: res.Description,
          Link: res.Link,
        });
        setSelectedDate(new Date(res.EncounterDate));
        setmedia(res.MediaTypeID);
        setsite(res.SiteID > 0 ? res.SiteID : "");
      });
      console.log(selectedDate);
    };
    fetchData();
  }, []);

  const handleCloseRespons = () => {
    setOpenRespons(false);
  };

  const handleChange = (event) => {
    setsite(event.target.value);
  };
  const handleMediaChange = (event) => {
    setmedia(event.target.value);
  };

  const handleDateChange = (date) => {
    console.log(new Date(date).toLocaleDateString());
    setSelectedDate(date);
    // setValues({ ...values, EncounterDate: new Date(date).toLocaleDateString()});
  };
  const onSubmit = (data) => {
    console.log(data);
    data.EncounterDate = selectedDate;
    data.MediaType = media;
    data.SiteID = site;
    EncounterService.updateEncounter(id, data)
      .then((result) => {
        setStatus(`Updated succesfully encounter no. ${id}!`);
        setOpenRespons(true);
      })
      .catch((err) => {
        setStatus("Oops... Somthing went wrong, try again.");
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
                      "aria-label": "change date",
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
                control={control}
                name="SiteID"
                defaultValue={site}
                render={({ field }) => (
                  <TextField
                    select
                    label="Site"
                    name="SiteID"
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
                )}
              />
            </div>
            <div className="row">
              <Controller
                render={({ field }) => (
                  <TextField
                    select
                    label="Media Type"
                    // name="MediaTypeID"
                    value={media}
                    onChange={handleMediaChange}
                    helperText="Update type of media"
                    {...field}
                  >
                    {mediatypes.map((option) => (
                      <MenuItem
                        key={option.MediaTypeID}
                        value={option.MediaTypeID}
                      >
                        {option.Title}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
                control={control}
                name="MediaType"
                defaultValue={media}
              />
            </div>
            <div className="lowerContainer">
              <section>
                <label>Gender</label>
                <Controller
                  as={
                    <RadioGroup aria-label="Gender" name="Gender">
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
                  defaultValue={values.Gender}
                />
              </section>
              <section>
                <label>Spotted Pregnancy?</label>
                <Controller
                  as={
                    <RadioGroup aria-label="IsPregnant" name="IsPregnant">
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
                      <FormControlLabel
                        value="unknown"
                        control={<Radio />}
                        label="Unknown"
                      />
                    </RadioGroup>
                  }
                  name="IsPregnant"
                  control={control}
                  defaultValue={values.IsPregnant}
                />
              </section>
            </div>
            <div className="row">
              <TextField
                inputRef={register}
                name="SpottedCount"
                label="Bluespotted count"
                margin="normal"
                defaultValue={values.SpottedCount}
                helperText={`Number of Bluespotted reported`}
                style={{ width: 250 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <div className="row">
              <TextField
                inputRef={register}
                name="OriginalID"
                label="Original ID"
                margin="normal"
                InputLabelProps={{
                  shrink: values? true : false,
                }}
              />
            </div>
            <div className="row">
              <TextField
                inputRef={register}
                name="ProfilePicture"
                label="Profile picture link"
                margin="normal"
                halfwidth="true"
                InputLabelProps={{
                  shrink: values ? true : false,
                }}
              />
            </div>
            <div className="lowerContainer">
              <section>
                <TextField
                  inputRef={register}
                  name="DW"
                  label="Disc width"
                  margin="normal"
                  halfwidth="true"
                  helperText="Please enter DW"
                  InputLabelProps={{
                    shrink: values ? true : false,
                  }}
                  InputProps={{
                    endAdornment: <InputAdornment position="start">cm</InputAdornment>,
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
                  InputLabelProps={{
                    shrink: values ? true : false,
                  }}
                  InputProps={{
                    endAdornment: <InputAdornment position="start">cm</InputAdornment>,
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
                  InputLabelProps={{
                    shrink: values ? true : false,
                  }}
                  InputProps={{
                    endAdornment: <InputAdornment position="start">cm</InputAdornment>,
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
                  InputLabelProps={{
                    shrink: values ? true : false,
                  }}
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
                  InputLabelProps={{
                    shrink: values ? true : false,
                  }}
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
                  InputLabelProps={{
                    shrink: values ? true : false,
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">℃</InputAdornment>
                    ),
                  }}
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
                InputLabelProps={{
                  shrink: values ? true : false,
                }}
              />
            </div>
            <TextField
              inputRef={register}
              name="Link"
              label="Link to source"
              margin="normal"
              fullWidth={true}
              InputLabelProps={{
                shrink: values ? true : false,
              }}
            />
            <button className="btn" type="submit">
              SAVE
            </button>
          </form>
        </Card>
      </div>
      <StatusDialog
        open={openRespons}
        status={status}
        onClose={handleCloseRespons}
        id={id}
      />
    </div>
  );
}
