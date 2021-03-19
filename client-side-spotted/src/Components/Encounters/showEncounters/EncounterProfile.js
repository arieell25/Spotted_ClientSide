import React, { Fragment, useState }  from "react";
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
    root: {
      maxWidth: 600,
      margin: "auto"
    },
    media: {
      height: 250,
    },
  });
  
  export default function EncounterProfile(){
    const classes = useStyles();
//   const [status, setStatus] = useState([]);
//   const [openRespons, setOpenRespons] = useState(false);

//   const [site, setSite] = useState("Eilat");
//    const { register, handleSubmit, errors, control } = useForm();

//   // const handleChange = prop => event => {
//   //   this.setState({ [prop]: event.target.value });
//   // };
//   const handleCloseRespons = () => {
//     setOpenRespons(false);
//   };
//   const onSubmit = data => {
//     console.log(data);
//     EncounterService
//       .addEncounter(data)
//       .then(result=>{
//         console.log('added auccesfully new encounter!')
//         setStatus('Encounter was added successfuly!');
//         setOpenRespons(true);

//       })
//       .catch(err => {
//         this.setState({ message: err.toString() });
//         setStatus('Oops... Somthing went wrong, try again.');
//         setOpenRespons(true);
//         console.log(errors);
//       });
//   };

  
    // console.log("state", this.state);
    
    return (
      <div className="animated slideInUpTiny animation-duration-3">
        <div className="m-5">
          <div className="d-flex justify-content-center title">
            <div>
              <Link to='/' style={{ 'textDecoration': 'none' }}><h2>Identified Encounter Profile</h2></Link>
            </div>
            <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://cdn1.bbcode0.com/uploads/2021/3/18/0453e83124acda2147535d978e33a4eb-full.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            BlueSpotted
          </Typography>
          <div className ="detailsEncounter">
          <h4>EncounterDate:</h4>
          <h4>SiteID:</h4>
          <h4>IdentifiedEncounterID:</h4>
          <h4>ManualResultsID:</h4>
          <h4>Verified:</h4>
          <h4>MediaType:</h4>
          <h4>ReportedBy:</h4>
          <h4>SpottedCount:</h4>
          </div>
          <Button size="small" color="primary">
        <IconButton><EditIcon /><DeleteIcon /></IconButton>
        </Button>
        </CardContent>
      </CardActionArea>
      <CardActions>
      </CardActions>
    </Card>
          </div>
        
        </div>
    </div>
    );
}

// export default EncounterProfile;