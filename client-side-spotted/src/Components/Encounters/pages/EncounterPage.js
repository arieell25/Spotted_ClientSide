// import React, { useEffect, useState }  from "react";
// import qs from 'qs';

// import { Link } from 'react-router-dom';
// import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
// import EditIcon from '@material-ui/icons/Edit';
// import DeleteIcon from '@material-ui/icons/Delete';
// import {EncounterService} from '../../../Service/EncounterService';
// import { Grid, CardMedia } from '@material-ui/core';
// import IdentifiedProfile from '../components/IdentifiedProfile';

// const useStyles = makeStyles({
//   paper: {
//     // height: 140,
//     width: 350,
//   },
//   image: {
//     width: 128,
//     height: 128,
//   },
//   img: {
//     width: '100%',
//     objectFit: 'contain',
//     paddingTop: 4,
//     maxHeight: '250px',
//   },
//   comments: {
//     margin: '30px 60px',
//   },
//   gridpadL: {
//     padding: '3% 5% 0 8% !important',
//   },
//   gridpadR: {
//     padding: '3% 0% 0 5% !important',
//   },
//     // root: {
//     //   maxWidth: 600,
//     //   margin: "auto"
//     // },
//     // media: {
//     //   height: 250,
//     // },
//   });
  
//   export default function EncounterPage(props){
//     const classes = useStyles();
//     const [encounter, setEncounter] = useState([]);
//     var id = qs.parse(props.location.search, { ignoreQueryPrefix: true }).id;
  
//     useEffect(() => {
//       EncounterService
//         .getEncounterById(id)
//         .then(encounter => {
//           setEncounter(encounter);
//         })
//         .catch(err => console.log(err));
//       // eslint-disable-next-line
//     }, []);

//     return (
//       <Grid container className="Encounter">
//       <Grid item xs={12} lg={6} className={classes.gridpadL}>
//         <CardMedia
//           className={classes.img}
//           component="img"
//           alt="Encounter"
//           image={
//             encounter.ProfilePicture
//               ? encounter.ProfilePicture
//               : 'https://www.flaticon.com/svg/vstatic/svg/2214/2214739.svg?token=exp=1616446017~hmac=b44db62d1d1284e71864e6ef8e7d8efa'
//           }
//         />
//       </Grid>
//       <Grid item xs={12} lg={6} className={classes.gridpadR}>
//         <IdentifiedProfile index={id} coupon={encounter} />
//         {/* <EncounterProfile index={id} coupon={encounter} /> */}

//       </Grid>
//       <Grid item xs={12} lg={6} className={classes.gridpadL}>
//         {/* <CommentsList index={id} /> */}
//       </Grid>
//       <Grid item xs={12} lg={6} className={classes.gridpadR}>
//         {/* <LineExample index={id} /> */}
//       </Grid>
//     </Grid>

//     //   <div className="animated slideInUpTiny animation-duration-3">
//     //     <div className="m-5">
//     //       <div className="d-flex justify-content-center title">
//     //         <div>
//     //           <Link to='/' style={{ 'textDecoration': 'none' }}><h2>Identified Encounter Profile</h2></Link>
//     //         </div>
//     //         <Card className={classes.root}>
//     //   <CardActionArea>
//     //     <CardMedia
//     //       className={classes.media}
//     //       image="https://cdn1.bbcode0.com/uploads/2021/3/18/0453e83124acda2147535d978e33a4eb-full.jpg"
//     //       title="Contemplative Reptile"
//     //     />
//     //     <CardContent>
//     //       <Typography gutterBottom variant="h5" component="h2">
//     //         BlueSpotted
//     //       </Typography>
//     //       <div className ="detailsEncounter">
//     //       <h4>EncounterDate:</h4>
//     //       <h4>SiteID:</h4>
//     //       <h4>IdentifiedEncounterID:</h4>
//     //       <h4>ManualResultsID:</h4>
//     //       <h4>Verified:</h4>
//     //       <h4>MediaType:</h4>
//     //       <h4>ReportedBy:</h4>
//     //       <h4>SpottedCount:</h4>
//     //       </div>
//     //       <Button size="small" color="primary">
//     //     <IconButton><EditIcon /><DeleteIcon /></IconButton>
//     //     </Button>
//     //     </CardContent>
//     //   </CardActionArea>
//     //   <CardActions>
//     //   </CardActions>
//     // </Card>
//     //       </div>
        
//     //     </div>
//     // </div>
//     );
// }

// // export default EncounterProfile;