import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
// import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
// import VisibilityIcon from '@material-ui/icons/Visibility';
// import ShareIcon from '@material-ui/icons/Share';
// import RateReviewIcon from '@material-ui/icons/RateReview';

import {
  Card,
  CardActionArea,
  CardActions,
  Typography,
  IconButton,
  CardContent,
  CardMedia,
  CardHeader,
  Avatar,
  Grid,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '30px 25px 10px 0px',
    // minWidth: 289,
    // maxWidth: 289,
  },
  img: {
    width: '100%',
    objectFit: 'contain',
    paddingTop: 4,
  },

  lable: {
    color: '#bdbdbd',
  },
}));

export default function CouponCard(props) {
  const classes = useStyles();
  const { index, encounter } = props;
  const [editing, setEditing] = useState(false);
  const [commentCount, setComments] = useState(0);

  useEffect(() => {
    async function fetchData() {
    //   setComments(coupon.comments.length);
      setEditing(false);
    }
    fetchData();
    // eslint-disable-next-line
  }, [editing]);

 
  return (
    <Grid item xs={12} lg={2} md={3} sm={4} xl={2}>
      <Card className={classes.root}>
        <NavLink
          to={{
            pathname: '/coupon',
            search: '?id=' + index,
          }}
        >
          {/* <CardHeader
            avatar={
              <Avatar
                aria-label="recipe"
                className={classes.avatar}
                src={coupon.publisherImg}
              >
                R
              </Avatar>
            }
            action={
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            }
            title={coupon.title}
            subheader={coupon.discount + ' off'}
          /> */}
          <CardActionArea>
            {/* <CardMedia
              className={classes.img}
              component="img"
              alt="Coupon"
              height="140"
              image={
                coupon.imgUrl
                  ? coupon.imgUrl
                  : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTCWnEg-zPrA6JZIXqfN7vxCdSWgORuP3b3jycKv1_3oZYODAeF'
              }
              title="Contemplative Reptile"
            /> */}
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="h5">
                Encounter ID: {encounter.EncounterID}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {encounter.EncounterDate}
              </Typography>
            </CardContent>
          </CardActionArea>
        </NavLink>

        <CardActions>
          {/* <IconButton className={classes.lable} size="small">
            <RateReviewIcon />
          </IconButton> */}
        </CardActions>
      </Card>
    </Grid>
  );
}

// import { React } from 'react'

// export default function Encounter({ encounter }) {


//     return (
//         <tr style={{ marginBottom: "14px" }}>
//             <td>
//                 {encounter.EncounterID}
//             </td>
//             <td>
//                 {encounter.EncounterDate}
//             </td>
//             <td>
//                 {encounter.SiteID}
//             </td>
//             <td>
//                 {encounter.ReporterEmail}
//             </td>
//             <td>
//                 {encounter.SpottedCountReported}
//             </td>
//         </tr>
//     )
// }
