import React, { Fragment } from 'react';
// import { MuiThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';

import { Dialog, DialogActions, DialogTitle, Grid, Button} from '@material-ui/core';
// import { StyledButton } from '../Theme/Button.styled';

const useStyles = makeStyles(theme => ({
  root: {
    maxHeight: 200,
    maxWidth: 350,
    flexGrow: 1,
    margin: 'auto',
  },
  dialogtitle:{
    textAlign: 'center',
  },
  actions:{
    alignSelf: 'center',
  }
}));

export default function StatusDialog(props) {
  const classes = useStyles;
  const { open, status, onClose, id, link, idntId } = props;

  return (
    // <MuiThemeProvider theme={theme}>
      <Fragment>
        <Dialog
          className={classes.root}
          open={open}
          onClose={onClose}
          aria-labelledby="form-dialog-title"

        >
          <Grid item container justify="center">
            {/* <img
              src="/images/done.png"
              alt="done"
              style={{ width: 160, height: 120, padding: 30 }}
            /> */}
          </Grid>

          <DialogTitle style={{textAlign: 'center'}} id="form-dialog-title">{status}</DialogTitle>
          <DialogActions style={{alignSelf: 'center'}}>
            {id && 
                  <NavLink
                  to={{
                    pathname: '/EncounterProfile',
                    search: '?id=' + id,
                  }}
                ><Button onClick={onClose} color="primary">
              View Encounter Profile
            </Button></NavLink>}

            {link && 
                    <NavLink
                              to={{
                            pathname: `/${link}`,
                          }}
                        ><Button onClick={onClose} color="primary">
                          Back to Encounters
                        </Button>
                    </NavLink>
              }

              {idntId && 
                  <NavLink
                  to={{
                    pathname: '/IdentifiedProfile',
                    search: '?id=' + idntId,
                  }}
                ><Button onClick={onClose} color="primary">
              Go to Profile
            </Button></NavLink>}
          </DialogActions>
        </Dialog>
      </Fragment>
    // </MuiThemeProvider>
  );
}
