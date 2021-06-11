import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import {RadioGroup, Radio, FormControlLabel} from '@material-ui/core'
import {TextField, Card} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import {IdntEncService} from '../../../Service/IdentifiedEncounterService';
import { useForm, Controller  } from 'react-hook-form';
import StatusDialog from '../components/StatusDialog';
import qs from 'qs';

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
  const [stage, setstage] = useState([]);
  const [alivevalue, setalivevalue] = useState("");
  const [stages, setstages] = useState([]);
  const [sex, setsex] = useState("female");

  const { register, handleSubmit, control } = useForm();
  var id = qs.parse(props.location.search, { ignoreQueryPrefix: true }).id;

  useEffect(() => {
    IdntEncService.getLifeStages().then(data => {
        console.log(data)
        setstages(data);
      })
      .catch(err => {
        setStatus(err);
        openRespons(true);
      });
      
  }, [openRespons]);

  const handleCloseRespons = () => {
    setOpenRespons(false);
  };

  const handleChange = (event) => {
    setstage(event.target.value);

  }
  const onSubmit = data => {
    console.log(data);
    IdntEncService
      .updateIdentified(id, data)
      .then(result=>{
        setStatus(`Updated succesfully identified encounter #${id}!`);
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
              <h2>Edit Identified Encounter #{id}</h2>
            </div>
          </div>
          <Card className={classes.root}>
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <TextField
              required
              inputRef={register}
              name="Photographer"
              label="Photographer"
              margin="normal"
            />
          </div>
          {/* <div className="row">
            <TextField
              required
              inputRef={register}
              name="ReportType"
              label="ReportType"
              margin="normal"
              fullWidth="true"
            />
          </div> */}
          <div className="row">
            <Controller
                      render={
                      ({field}) => <TextField
                        select
                        label="Life Stage"
                        name = "lifeStage"
                        value={stage}
                        onChange={handleChange}
                        helperText="Please select life stage"
                        {...field}
                      >
                        {stages.map((option) => (
                          <MenuItem key={option.LifeStageID} value={option.LifeStageID}>
                            {option.Stage}
                          </MenuItem>
                        ))}
                      </TextField>
                      }
                      control={control}
                      name="lifeStage"
                      defaultValue={stage}

                    />
              </div>
              <div className='lowerContainer'>
              <section>
              <label>Sex</label>
            <Controller
              as={
                <RadioGroup aria-label="Sex" name="Sex" >
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
              name="Sex"
              control={control}
              defaultValue={sex}
            />
            </section>
            <section>
              <label>Is Alive?</label>
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
              name="isAlive"
              control={control}
              defaultValue={alivevalue}
            />
            </section>
            </div>
          <div className="row">
            <TextField
              inputRef={register}
              name="TL"
              label="TL"
              margin="normal"
            />
          </div>

          <div className="row">
            <TextField
              inputRef={register}
              name="DL"
              label="DL"
              margin="normal"
            />
          </div>

          <div className="row">
            <TextField
              inputRef={register}
              name="DW"
              label="DW"
              margin="normal"
              halfwidth="true"
            />
          </div>

          <div className="row">
            <TextField
              inputRef={register}
              name="MaxDepth"
              label="Max Depth (m)"
              margin="normal"
              halfwidth="true"
            />
          </div>

          <div className="row">
            <TextField
              inputRef={register}
              name="Distance"
              label="Distance (m)"
              margin="normal"
              halfwidth="true"
            />
          </div>

          <div className="row">
            <TextField
              inputRef={register}
              name="Temp"
              label="Temp (C)"
              margin="normal"
              halfwidth="true"
            />
          </div>

          <div className="row">
            <TextField
              inputRef={register}
              name="Description"
              label="Description"
              margin="normal"
              halfwidth="true"
            />
          </div>
          <div className="row">
            <TextField
              inputRef={register}
              name="ProfilePicture"
              label="Profile Picture link"
              margin="normal"
              halfwidth="true"
            />
          </div>
            <div className="row">
            <TextField
              inputRef={register}
              name="Link"
              label="Facebook link"
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


