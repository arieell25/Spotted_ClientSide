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

export default function IdntEncounterCard(props) {
  const classes = useStyles();
  const { index, encounter, identFlag } = props;
  const [editing, setEditing] = useState(false);
  const [commentCount, setComments] = useState(0);
  const [date, setDate] = useState();
  useEffect(() => {
    let date = new Date(encounter.CreatedAt);
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
                  : 'https://t4.ftcdn.net/jpg/02/07/87/79/360_F_207877921_BtG6ZKAVvtLyc5GWpBNEIlIxsffTtWkv.jpg'
              }
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography variant="body2" color="secondary" component="h5">
                ID no. {encounter.IdentifiedEncounterID}
              </Typography>
              <Typography variant="body2" color="secondary" component="p">
              Identity created at {date}
              </Typography>
              <Typography variant="body2" color="secondary" component="p">
              {encounter.EncounterID ?  `Was first spotted with encounter no. ${encounter.EncounterID}` : ''}
              </Typography>
              <Typography variant="body2" color="secondary" component="h5">
                {encounter.Photographer ? `Photographed by ${encounter.Photographer} ` : ''}
              </Typography>
              {/* <Typography variant="body2" color="secondary" component="h5">
                 {encounter.isAlive ? "Last was reported as alive" : "Last was reported as dead"}
              </Typography> */}
              <Typography variant="body2" color="secondary" component="p">
              {encounter.Description}
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

