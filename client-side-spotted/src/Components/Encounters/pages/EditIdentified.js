/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { RadioGroup, Radio, FormControlLabel } from "@material-ui/core";
import { TextField, Card } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { IdntEncService } from "../../../Service/IdentifiedEncounterService";
import { useForm, Controller } from "react-hook-form";
import StatusDialog from "../components/StatusDialog";
import qs from "qs";

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
  const [lifeStage, setstage] = useState(1);
  const [stages, setstages] = useState([]);

  const { register, handleSubmit, control, reset } = useForm();
  var id = qs.parse(props.location.search, { ignoreQueryPrefix: true }).id;
  const [values, setValues] = useState({
    Gender: "unknown",
    IsAlive: "yes",
    ProfilePicture: "",
  });

  useEffect(() => {
    IdntEncService.getIdentifiedEncounter(id).then((res) => {
      reset({
        IsAlive: res.IsAlive ? "yes" : "no",
        Gender:
          res.Gender === "unknown"
            ? "unknown"
            : res.Gender === "female"
            ? "female"
            : "male",
        ProfilePicture: res.ProfilePicture,
      });
      setstage(res.LifeStageID);
    });

    IdntEncService.getLifeStages()
      .then((data) => {
        setstages(data);
      })
      .catch((err) => {
        setStatus(err);
        openRespons(true);
      });
  }, [openRespons, id]);

  const handleCloseRespons = () => {
    setOpenRespons(false);
  };

  const handleChange = (event) => {
    setstage(event.target.value);
  };
  const onSubmit = (data) => {
    data.LifeStageID = lifeStage;
    IdntEncService.updateIdentified(id, data)
      .then((result) => {
        setStatus(`Updated succesfully identified encounter #${id}!`);
        setOpenRespons(true);
      })
      .catch((err) => {
        setStatus("Oops... Somthing went wrong, try again.");
        setOpenRespons(true);
      });
  };

  return (
    <div className="animated slideInUpTiny animation-duration-3">
      <div className="m-5">
        <div className="d-flex justify-content-center title">
          <div>
            <h2>Edit Identified Encounter #{id}</h2>
          </div>
        </div>
        <Card className={classes.root}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <Controller
                render={({ field }) => (
                  <TextField
                    select
                    label="Life Stage"
                    value={lifeStage}
                    onChange={handleChange}
                    helperText="Please select life stage"
                    {...field}
                  >
                    {stages.map((option) => (
                      <MenuItem
                        key={option.LifeStageID}
                        value={option.LifeStageID}
                      >
                        {option.Stage}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
                control={control}
                name="LifeStageID"
                defaultValue={lifeStage}
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
                <label>Is Alive?</label>
                <Controller
                  as={
                    <RadioGroup aria-label="IsAlive" name="IsAlive">
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
                  name="IsAlive"
                  control={control}
                  defaultValue={values.IsAlive}
                />
              </section>
            </div>
            <div className="row">
              <TextField
                inputRef={register}
                name="ProfilePicture"
                label="Profile Picture link"
                margin="normal"
                halfwidth="true"
                InputLabelProps={{
                  shrink: values ? true : false,
                }}
              />
            </div>
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
        idntId={id}
      />
    </div>
  );
}
