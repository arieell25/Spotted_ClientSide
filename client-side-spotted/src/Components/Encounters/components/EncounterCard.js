import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';


import {
  Card,
  CardActionArea,
  CardActions,
  Typography,
  CardContent,
  CardMedia,
  Grid,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '30px 25px 10px 0px',
    padding: '10%'
  },
  linkText:{
    textDecoration: 'none'
  },
  img: {
    width: '100%',
    paddingTop: 4,
    borderRadius: 10
  },
  lable: {
    color: '#e0e0e7',
  },
}));

export default function EncounterCard(props) {
  const classes = useStyles();
  const { index, encounter, identFlag } = props;
  const [editing, setEditing] = useState(false);
  const [date, setDate] = useState();
  useEffect(() => {
    let date = new Date(encounter.EncounterDate);
    setDate(date.toLocaleDateString());

    // eslint-disable-next-line
  }, [editing]);

 
  return (
    <Grid item xs={12}  md={3} sm={6} xl={2}>
      <Card className={classes.root}>
        <NavLink
          className={classes.linkText}
          to={identFlag? 
            {
              pathname: '/IdentifiedProfile',
              search: '?id=' + index,
            } : {
            pathname: '/EncounterProfile',
            search: '?id=' + index,
          }}
        >
          <CardActionArea>
            <CardMedia
              className={classes.img}
              component="img"
              alt="Encounter"
              height="140"
              image={
                encounter.ProfilePicture
                  ? encounter.ProfilePicture
                  : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTCWnEg-zPrA6JZIXqfN7vxCdSWgORuP3b3jycKv1_3oZYODAeF'
              }
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography variant="body2" color="secondary" component="h5">
                Encounter no.: {encounter.EncounterID}
              </Typography>
              <Typography variant="body2" color="secondary" component="h5">
                Original ID: {encounter.OriginalID}
              </Typography>
              <Typography variant="body2" color="secondary" component="h5">
                 {!encounter.Verified ? "Not Verified" : "Verififed"}
              </Typography>
              <Typography variant="body2" color="secondary" component="p">
              Spotted at: {date}
              </Typography>
            </CardContent>
          </CardActionArea>

        <CardActions>
        <button className='btn' >
          PROFILE
         </button> 
          {/* <IconButton className={classes.lable} size="small">
            <RateReviewIcon />
          </IconButton> */}
        </CardActions>
        </NavLink>

      </Card>
    </Grid>
  );
}

