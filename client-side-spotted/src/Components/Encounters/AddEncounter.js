import React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormLabel from "@material-ui/core/FormLabel";
import { Link } from 'react-router-dom';



const site = [
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

class AddEncounter extends React.Component {
  state = {
    nickName: "",
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
              <Link to='/' style={{ 'textDecoration': 'none' }}><h2>New Encounter Info</h2></Link>
            </div>
          </div>
          <div className="row">
            <TextField
              id="nickName"
              label="Nick Name*"
              value={this.state.nickName}
              onChange={this.handleChange("nickName")}
              margin="normal"
              halfWidth
            />
          </div>
          <div className="row">
            <TextField
              id="dateOfTheEncounter"
              label="Date of the encounter*"
              value={this.state.dateOfTheEncounter}
              onChange={this.handleChange("dateOfTheEncounter")}
              margin="normal"
              halfWidth
            />
          </div>
          <div className="row">
            <TextField
              id="timeOfTheEncounter"
              label="Time of the encounter*"
              value={this.state.timeOfTheEncounter}
              onChange={this.handleChange("timeOfTheEncounter")}
              margin="normal"
              halfWidth
            />
          </div>
          <div className="row">
            <TextField
              select
              value={this.state.site}
              onChange={this.handleChange("site")}
              halfWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    Site
                  </InputAdornment>
                )
              }}
            >
              {site.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <FormLabel component="legend">
              *Required
            </FormLabel>
          </div>

          <div className="row">
            <TextField
              id="email"
              label="Your Email*"
              value={this.state.email}
              onChange={this.handleChange("email")}
              margin="normal"
              halfWidth
            />
          </div>
          {/* add checkbox */}

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
              <Link to='/TypeUpload'>
                <button className='btn' type="button">NEXT</button>
              </Link>
              </div>

          </div>
       


    );
  }
}

export default AddEncounter;