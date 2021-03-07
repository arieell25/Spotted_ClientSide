import React from "react";

import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";

import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TypeUpload from './TypeUpload'

const level = [
  {
    value: "Easy",
    label: "Easy"
  },
  {
    value: "Mid",
    label: "Mid"
  },
  {
    value: "Difficult",
    label: "Difficult"
  }
];
const category = [
  {
    value: "Science",
    label: "Science"
  },
  {
    value: "Islam",
    label: "Islam"
  },
  {
    value: "Other",
    label: "Other"
  }
];
class Form extends React.Component {
  state = {
    question: "",
    level: "",
    category: "",
    option1: "",
    option2: "",
    option3: "",
    option4: ""
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  render() {
    
    console.log("state", this.state);
    return (
      <div className="animated slideInUpTiny animation-duration-3">
        <div className="m-5">

          <div className="row">
            <TextField
              id="question"
              label="Question"
              value={this.state.question}
              onChange={this.handleChange("question")}
              margin="normal"
              fullWidth
            />
            <div className="col">
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  Check the correct answer/answers options
                  </FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <div>
                        <Checkbox
                          onChange={this.handleChange("answer")}
                          value="option1"
                        />
                        <TextField
                          id="option1"
                          label="Option#1"
                          value={this.state.option1}
                          onChange={this.handleChange("option1")}
                          margin="normal"
                        />
                      </div>
                    }
                  //   label="Gilad Gray"
                  />
                  <FormControlLabel
                    control={
                      <div>
                        <Checkbox
                          onChange={this.handleChange("answer")}
                          value="option1"
                        />
                        <TextField
                          id="option2"
                          label="Option#2"
                          value={this.state.option2}
                          onChange={this.handleChange("option2")}
                          margin="normal"
                        />
                      </div>
                    }
                  //   label="Gilad Gray"
                  />
                  <FormControlLabel
                    control={
                      <div>
                        <Checkbox
                          onChange={this.handleChange("answer")}
                          value="option3"
                        />
                        <TextField
                          id="option3"
                          label="Option#3"
                          value={this.state.option3}
                          onChange={this.handleChange("option3")}
                          margin="normal"
                        />
                      </div>
                    }
                  //   label="Gilad Gray"
                  />
                  <FormControlLabel
                    control={
                      <div>
                        <Checkbox
                          onChange={this.handleChange("answer")}
                          value="option4"
                        />
                        <TextField
                          id="option4"
                          label="Option#4"
                          value={this.state.option4}
                          onChange={this.handleChange("option4")}
                          margin="normal"
                        />
                      </div>
                    }
                  //   label="Gilad Gray"
                  />
                </FormGroup>
                {/* <FormHelperText>Be careful</FormHelperText> */}
              </FormControl>
            </div>

            <div
              className="col-4 mt-5"
            //   style={{ border: "2px solid red" }}
            >
              <TypeUpload />

              <div className="">
                <TextField
                  select
                  value={this.state.category}
                  onChange={this.handleChange("category")}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        Category
                      </InputAdornment>
                    )
                  }}
                >
                  {category.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  select
                  className="mt-5"
                  value={this.state.level}
                  onChange={this.handleChange("level")}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">Level</InputAdornment>
                    )
                  }}
                >
                  {level.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <button className='btn' type="button">Send</button>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Form;