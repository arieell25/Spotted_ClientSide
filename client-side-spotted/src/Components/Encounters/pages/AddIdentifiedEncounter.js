import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import {IdntEncService} from '../../../Service/IdentifiedEncounterService';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import StatusDialog from '../components/StatusDialog';

export default function AddIdentifiedEncounter() {
  const [status, setStatus] = useState([]);
  const [openRespons, setOpenRespons] = useState(false);
  const [stage, setstage] = useState("Eilat");
  const { register, handleSubmit, control } = useForm();

  const handleCloseRespons = () => {
    setOpenRespons(false);
  };

  const onSubmit = data => {
    console.log(data);
    IdntEncService
      .addIdentifiedEncounter(data)
      .then(result=>{
        console.log('added auccesfully new encounter!')
        setStatus('Identified Encounter was added successfuly!');
        setOpenRespons(true);
        JSON.stringify(result.data.newIdentifiedEncounter.IdentifiedEncounterID);
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
              <Link to='/' style={{ 'textDecoration': 'none' }}><h2>Edit Identified Encounter Info</h2></Link>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <TextField
              required
              inputRef={register}
              name="Photographer"
              label="Photographer"
              margin="normal"
              fullWidth="true"
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
          {/* <div className="row">
            <TextField
              inputRef={register}
              select
              required
              name="lifeStage"
              value={stage}
              fullWidth="true"
              label="Stage"
            >
              {lifeStage.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div> */}
          {/* <div className="row">
            <TextField
              inputRef={register}
              name="Sex"
              label="Sex"
              margin="normal"
              fullWidth="true"
            />
          </div> */}

          <div className="row">
            <TextField
              inputRef={register}
              name="isAlive"
              label="Is Alive?"
              margin="normal"
              fullWidth="true"
            />
          </div>

          <div className="row">
            <TextField
              inputRef={register}
              name="TL"
              label="TL"
              margin="normal"
              halfWidth="true"
            />
          </div>

          <div className="row">
            <TextField
              inputRef={register}
              name="DL"
              label="DL"
              margin="normal"
              halfWidth="true"
            />
          </div>

          <div className="row">
            <TextField
              inputRef={register}
              name="DW"
              label="DW"
              margin="normal"
              halfWidth="true"
            />
          </div>

          <div className="row">
            <TextField
              inputRef={register}
              name="MaxDepth"
              label="Max Depth (m)"
              margin="normal"
              halfWidth="true"
            />
          </div>

          <div className="row">
            <TextField
              inputRef={register}
              name="Distance"
              label="Distance (m)"
              margin="normal"
              halfWidth="true"
            />
          </div>

          <div className="row">
            <TextField
              inputRef={register}
              name="Temp"
              label="Temp (C)"
              margin="normal"
              halfWidth="true"
            />
          </div>

          <div className="row">
            <TextField
              inputRef={register}
              name="Description"
              label="Description"
              margin="normal"
              halfWidth="true"
            />
          </div>

          {/* <div className="row">
            <TextField
              inputRef={register}
              name="Comments"
              label="Comments"
              margin="normal"
              halfWidth="true"
            />
          </div> */}

          {/* <div className="row">
              <FormLabel component="legend">
              inputRef={register}
                Gender
                  </FormLabel>
              <div onChange={this.onChangeValue}>
                <input type="radio" value="Male" name="Male" /> Male
                <input type="radio" value="Female" name="Female" /> Female
                <input type="radio" value="Other" name="Other" /> Other
              </div>
            </div>

            <div className="row">
              <FormLabel component="legend">
              inputRef={register}
              Pregnancy
                  </FormLabel>
              <div onChange={this.onChangeValue}>
                <input type="radio" value="spotted" name="isSpotted" /> Spotted
                <input type="radio" value="notSpotted" name="isSpotted" /> NotSpotted
              </div>
            </div> */}

            <div className="row">
            <TextField
              inputRef={register}
              name="Link"
              label="Facebook link"
              margin="normal"
              halfWidth="true"
            />
            </div>

            <button className='btn' type="submit" >
                  SAVE
                </button>
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


