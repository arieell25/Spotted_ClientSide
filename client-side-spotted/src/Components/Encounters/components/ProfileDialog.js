import React, { Fragment, useState, useEffect } from "react";
// import { MuiThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from "@material-ui/core/styles";
import PhotosGrid from "./Photos/PhotosGrid";
import GradientCircularProgress from "./CircularProgress";
import { PhotoService } from "../../../Service/PhotoService";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";

import {
  Dialog,
  CardContent,
  Card,
  Typography,
  CardActions,
  IconButton,
  CardMedia,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: 800,
    maxWidth: 1000,
    flexGrow: 1,
    margin: "auto",
  },
  cardtitle: {
    textAlign: "center",
    fontSize: 30,
  },
  actions: {
    justifyContent: "flex-end",
  },
  media: {
    flex: 1,
    width: 500,
    height: 300,
    margin: `0 auto`,
    borderRadius: 10,
  },
  update: {
    fontSize: 12,
    color: "#96a299",
    float: "right",
  },
}));

export default function ProfileDialog(props) {
  const classes = useStyles();
  const { open, onClose, encounter, resultPhoto } = props;
  const [openPhotos, setOpenPhotos] = useState(false);
  const [date, setDate] = useState("");
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    console.log(encounter);
    const fetchData = async () => {
      const photosData = await PhotoService.getIdntEncounterPhotos(
        encounter.IdentifiedEncounterID
      );
      let date = new Date(encounter.CreatedAt);
      setDate(date.toLocaleDateString());
      setPhotos(photosData);
    };
    fetchData();
  }, [resultPhoto, encounter]);

  return (
    <Fragment>
      <Dialog
        className={classes.root}
        open={open}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
      >
        <Card>
          {resultPhoto ? (
            <CardMedia
              component="img"
              className={classes.media}
              image={resultPhoto.src}
              title="Detection result photo"
            />
          ) : (
            <GradientCircularProgress />
          )}
          {openPhotos && <PhotosGrid photos={photos} />}
          <CardContent>
            <Typography
              gutterBottom
              className={classes.cardtitle}
              component="h2"
            >
              Identity no. {encounter.IdentifiedEncounterID}
            </Typography>
            <CardActions className={classes.actions}>
              <p>{photos.length}</p>
              <IconButton
                color="secondary"
                onClick={() => setOpenPhotos((openPhotos) => !openPhotos)}
              >
                <PhotoLibraryIcon />
              </IconButton>
            </CardActions>
            <div className="detailsEncounter">
              <p>
                {encounter.IsAlive ? "Considerd as Alive" : "Considerd as Dead"}
              </p>
              <p>
                {encounter.LifeStage
                  ? "Life stage:  " + encounter.LifeStage.Stage
                  : null}
              </p>
              <p>Created at {date}</p>
              <p>
                {" "}
                {encounter.Gender
                  ? "Gender: " + encounter.Gender
                  : "Gender: unknown"}
              </p>
              <p className={classes.update}>
                {encounter.UpdatedBy
                  ? "Updated by " + encounter.User.firstName + " on "
                  : ""}
                {encounter.UpdatedAt
                  ? new Date(encounter.UpdatedAt).toLocaleDateString("he-IL")
                  : ""}
              </p>
            </div>
          </CardContent>
        </Card>
      </Dialog>
    </Fragment>
  );
}
