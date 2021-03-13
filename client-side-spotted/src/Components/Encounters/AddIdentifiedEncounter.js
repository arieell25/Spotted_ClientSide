import React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormLabel from "@material-ui/core/FormLabel";
import { Link } from 'react-router-dom';



const lifeStage = [
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

class AddIdentifiedEncounter extends React.Component {
  state = {
    Photographer: "",
    dateOfTheEncounter: "",
    timeOfTheEncounter: "",
    site: "",
    email: ""
  };
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  render() {
    console.log("state", this.state);
    return (
      <div className="animated slideInUpTiny animation-duration-3">
        <div className="m-5">
          <div className="d-flex justify-content-center title">
            <div>
              <Link to='/' style={{ 'textDecoration': 'none' }}><h2>New Identified Encounter Info</h2></Link>
            </div>
          </div>
          <div className="row">
            <TextField
              id="Photographer"
              label="Photographer"
              value={this.state.photographer}
              onChange={this.handleChange("photographer")}
              margin="normal"
              halfWidth
            />
          </div>
          <div className="row">
            <TextField
              id="ReportType"
              label="ReportType"
              value={this.state.timeOfTheEncounter}
              onChange={this.handleChange("timeOfTheEncounter")}
              margin="normal"
              halfWidth
            />
          </div>
          <div className="row">
            <TextField
              select
              value={this.state.lifeStage}
              onChange={this.handleChange("lifeStage")}
              halfWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    LifeStage
                  </InputAdornment>
                )
              }}
            >
              {lifeStage.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <div className="row">
            <TextField
              id="isAlive"
              label="Is Alive?"
              value={this.state.isAlive}
              onChange={this.handleChange("isAlive")}
              margin="normal"
              halfWidth
            />
          </div>

          <div className="row">
            <TextField
              id="tl"
              label="TL"
              value={this.state.tl}
              onChange={this.handleChange("tl")}
              margin="normal"
              halfWidth
            />
          </div>

          <div className="row">
            <TextField
              id="dl"
              label="DL"
              value={this.state.dl}
              onChange={this.handleChange("dl")}
              margin="normal"
              halfWidth
            />
          </div>

          <div className="row">
            <TextField
              id="dw"
              label="DW"
              value={this.state.dw}
              onChange={this.handleChange("dw")}
              margin="normal"
              halfWidth
            />
          </div>

          <div className="row">
            <TextField
              id="maxDepth"
              label="Max Depth (m)"
              value={this.state.maxDepth}
              onChange={this.handleChange("maxDepth")}
              margin="normal"
              halfWidth
            />
          </div>

          <div className="row">
            <TextField
              id="distance"
              label="Distance (m)"
              value={this.state.distance}
              onChange={this.handleChange("distance")}
              margin="normal"
              halfWidth
            />
          </div>

          <div className="row">
            <TextField
              id="temp"
              label="Temp (C)"
              value={this.state.temp}
              onChange={this.handleChange("temp")}
              margin="normal"
              halfWidth
            />
          </div>

          <div className="row">
            <TextField
              id="description"
              label="Description"
              value={this.state.description}
              onChange={this.handleChange("description")}
              margin="normal"
              halfWidth
            />
          </div>

          <div className="row">
            <TextField
              id="comments"
              label="Comments"
              value={this.state.comments}
              onChange={this.handleChange("comments")}
              margin="normal"
              halfWidth
            />
          </div>

          <div className="row">
            <TextField
              id="count"
              label="How many bluespotted?"
              value={this.state.count}
              onChange={this.handleChange("count")}
              margin="normal"
              halfWidth
            />
          </div>

          <div className="row">
              <FormLabel component="legend">
                Gender
                  </FormLabel>
              <div onChange={this.onChangeValue}>
                <input type="radio" value="Male" name="gender" /> Male
                <input type="radio" value="Female" name="gender" /> Female
                <input type="radio" value="Other" name="gender" /> Other
              </div>
            </div>

            <div className="row">
              <FormLabel component="legend">
              Pregnancy
                  </FormLabel>
              <div onChange={this.onChangeValue}>
                <input type="radio" value="spotted" name="isSpotted" /> Spotted
                <input type="radio" value="notSpotted" name="isSpotted" /> NotSpotted
              </div>
            </div>

            <div className="row">
            <TextField
              id="facebookLink"
              label="Facebook link"
              value={this.state.facebookLink}
              onChange={this.handleChange("facebookLink")}
              margin="normal"
              halfWidth
            />
            </div>

              <Link to='/TypeUpload'>
                <button className='btn' type="button">NEXT</button>
              </Link>
              </div>

          </div>
       


    );
  }
}

export default AddIdentifiedEncounter;