import React, { Fragment } from "react";
// import { MuiThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";

import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: 200,
    maxWidth: 350,
    flexGrow: 1,
    margin: "auto",
  },
  dialogtitle: {
    textAlign: "center",
  },
  actions: {
    alignSelf: "center",
  },
}));

export default function StatusDialog(props) {
  const classes = useStyles;
  const { open, status, info, onClose, id, link, idntId } = props;

  return (
    <Fragment>
      <Dialog
        className={classes.root}
        open={open}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle style={{ textAlign: "center" }} id="form-dialog-title">
          {status}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {info}
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ alignSelf: "center" }}>
          {id && (
            <NavLink
              to={{
                pathname: "/EncounterProfile",
                search: "?id=" + id,
              }}
            >
              <Button onClick={onClose} color="primary">
                View Encounter Profile
              </Button>
            </NavLink>
          )}

          {link && (
            <NavLink
              to={{
                pathname: `/${link}`,
              }}
            >
              <Button onClick={onClose} color="primary">
                Back to Encounters
              </Button>
            </NavLink>
          )}

          {idntId && (
            <NavLink
              to={{
                pathname: "/IdentifiedProfile",
                search: "?id=" + idntId,
              }}
            >
              <Button onClick={onClose} color="primary">
                Go to Profile
              </Button>
            </NavLink>
          )}
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
