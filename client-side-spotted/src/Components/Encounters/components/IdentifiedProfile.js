import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import StatusDialog from "./StatusDialog";
import GradientCircularProgress from "./CircularProgress";
import { IdntEncService } from "../../../Service/IdentifiedEncounterService";
// import {userService} from '../../../Service/UserService';
import BarChartIcon from "@material-ui/icons/BarChart";
import { PhotoService } from "../../../Service/PhotoService";
import PhotosGrid from "./Photos/PhotosGrid";
import qs from "qs";
import {
  IconButton,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@material-ui/core";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import IdntEncounterChart from "./chart/IdntEncounterChart";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "0px 15px",
    maxWidth: 800,
    margin: `0 auto`,
  },
  media: {
    flex: 1,
    width: 500,
    height: 300,
    margin: `0 auto`,
    borderRadius: 10,
  },
  actions: {
    justifyContent: "flex-end",
  },
  actionsbuttom: {
    justifyContent: "flex-end",
  },
  cardtitle: {
    fontSize: 30,
  },
  update: {
    fontSize: 12,
    color: "#96a299",
    float: "right",
  },
}));

export default function IdentifiedProfile(props) {
  //   const { index } = props;
  const classes = useStyles();
  const [status, setStatus] = useState([]);
  const [open, setOpen] = useState(false);
  const [openPhotos, setOpenPhotos] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [encounter, setEncounter] = useState([]);
  const [date, setDate] = useState();
  const [openChart, setopenChart] = useState(false);

  var id = qs.parse(props.location.search, { ignoreQueryPrefix: true }).id;

  useEffect(() => {
    IdntEncService.getIdentifiedEncounter(id)
      .then((encounter) => {
        let date = new Date(encounter.CreatedAt);
        setDate(date.toLocaleDateString("he-IL"));
        setEncounter(encounter);
      })
      .catch((err) => console.log(err));

    PhotoService.getIdntEncounterPhotos(id)
      .then((photos) => setPhotos(photos))
      .catch((err) => console.log(err));
  }, [id]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseChart = () => {
    setopenChart(false);
  };
  const handleOpenChart = () => {
    setopenChart(true);
  };

  if (!encounter) return <GradientCircularProgress />;
  else {
    return (
      <div className="animated slideInUpTiny animation-duration-3">
        <div className="m-5">
          <div className="d-flex justify-content-center title">
            <StatusDialog open={open} status={status} onClose={handleClose} />
            <div>
              <h2>Identified Encounter Profile</h2>
            </div>
            <Card className={classes.root}>
              {encounter.ProfilePicture ? (
                <CardMedia
                  className={classes.media}
                  image={encounter.ProfilePicture}
                  title="Contemplative Reptile"
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
                  BlueSpotted ID no. {encounter.IdentifiedEncounterID}
                </Typography>
                <CardActions className={classes.actions}>
                  <p>{photos.length}</p>
                  <IconButton
                    color="secondary"
                    onClick={() => setOpenPhotos((openPhotos) => !openPhotos)}
                  >
                    <PhotoLibraryIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={handleOpenChart}>
                    <BarChartIcon />
                  </IconButton>
                </CardActions>

                {
                  <IdntEncounterChart
                    open={openChart}
                    onClose={handleCloseChart}
                    id={id}
                  />
                }

                <div className="detailsEncounter">
                  <p>
                    {encounter.IsAlive
                      ? "Considerd as Alive"
                      : "Considerd as Dead"}
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
                  <CardActions className={classes.update}>
                    <IconButton
                      color="secondary"
                      onClick={(event) =>
                        (window.location.href = `/EditIdentifiedEncounter?id=${encounter.IdentifiedEncounterID}`)
                      }
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton color="secondary">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                    <p className={classes.update}>
                      {encounter.UpdatedBy
                        ? "Updated by " + encounter.User.firstName + " on "
                        : ""}
                      {encounter.UpdatedAt
                        ? new Date(encounter.UpdatedAt).toLocaleDateString(
                            "he-IL"
                          )
                        : ""}
                    </p>
                  </CardActions>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
