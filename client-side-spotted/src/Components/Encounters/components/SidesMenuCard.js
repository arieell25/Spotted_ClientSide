import React, { useRef } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import {
  DialogTitle,
  Dialog,
  DialogContent,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";

export default function SidesMenuDialog(props) {
  const { onClose, onSave, setSelectedValue, open, sidesData, value } = props;
  const radioGroupRef = useRef(null);

  const handleClose = () => {
    onClose();
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const handleClickSave = (value) => {
    onSave(value.value);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Set photo side</DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          aria-label="Photo Side"
          name="side"
          value={value}
          onChange={handleChange}
        >
          {sidesData.map((option) => (
            <FormControlLabel
              value={option.value}
              key={option.value}
              control={<Radio />}
              label={option.title}
            />
          ))}
          <FormControlLabel
            value="Front"
            disabled
            control={<Radio />}
            label="Front - unavailable for identification"
          />
          <FormControlLabel
            value="Back"
            disabled
            control={<Radio />}
            label="Back - unavailable for identification"
          />
        </RadioGroup>
      </DialogContent>

      <Button color="primary" onClick={handleClickSave}>
        Save
      </Button>
    </Dialog>
  );
}

SidesMenuDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};
