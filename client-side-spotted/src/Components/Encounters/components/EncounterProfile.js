import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import PhotosGrid from "./Photos/PhotosGrid";
import StatusDialog from "./StatusDialog";
import GradientCircularProgress from "./CircularProgress";
import { EncounterService } from "../../../Service/EncounterService";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import { userService } from "../../../Service/UserService";
import { PhotoService } from "../../../Service/PhotoService";

import qs from "qs";

import {
  IconButton,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    padding: "0px 50px",
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
  cardtitle: {
    fontSize: 30,
  },
  image: {
    width: 30,
    height: 30,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 20,
    margin: "auto",
  },
  update: {
    fontSize: 14,
    color: "#96a299",
    float: "right",
  },
}));

export default function EncounterProfile(props) {
  const classes = useStyles();
  const [status, setStatus] = useState([]);
  const [open, setOpen] = useState(false);
  const [linkpath, setlinkpath] = useState("");
  const [videoPath, setVideoPath] = useState();
  const [date, setDate] = useState("");
  const [openPhotos, setOpenPhotos] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [encounter, setEncounter] = useState([]);
  const [uploadAuthorized, setuploadAuthorized] = useState(false);

  var id = qs.parse(props.location.search, { ignoreQueryPrefix: true }).id;

  useEffect(() => {
    const fetchData = async () => {
      const encounterData = await EncounterService.getEncounterById(id);
      const photosData = await PhotoService.getEncounterPhotos(id);
      const videoData = await EncounterService.getEncounterVideo(id);
      let date = new Date(encounterData.EncounterDate);
      if (
        userService.isLoggedIn() &&
        (encounterData.ReportedBy === userService.getLocalStorageUser().id ||
          userService.isAdmin())
      ) {
        setuploadAuthorized(true);
      }
      setDate(date.toLocaleDateString("he-IL"));
      setPhotos(photosData);
      setEncounter(encounterData);
      setVideoPath(videoData);
    };
    fetchData();
  }, [id]);

  const handleDelete = (e) => {
    try {
      EncounterService.deactivateEncounter(id).then((response) => {
        setStatus("Deleted Successfully.");
        setlinkpath("EncountersBoard");
        setOpen(true);
      });
    } catch (err) {
      setStatus("Encounter delete faild... try again");
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setOpenPhotos(false);
  };
  const openInNewTab = () => {
    if (videoPath.length > 0) {
      const newWindow = window.open(
        videoPath[0].VideoPath,
        "_blank",
        "noopener,noreferrer"
      );
      if (newWindow) newWindow.opener = null;
    }
  };

  if (!encounter) return <GradientCircularProgress />;
  else {
    return (
      <div className="animated slideInUpTiny animation-duration-3">
        <div className="m-5">
          <div className="d-flex justify-content-center title">
            <div>
              <h2>Encounter Profile</h2>
            </div>
            <StatusDialog
              open={open}
              status={status}
              link={linkpath}
              onClose={handleClose}
            />

            <Card className={classes.root}>
              <div>
                {encounter.ProfilePicture ? (
                  <CardMedia
                    component="img"
                    className={classes.media}
                    image={encounter.ProfilePicture}
                    title="Bluespotted Profile"
                  />
                ) : (
                  <GradientCircularProgress />
                )}
              </div>
              {openPhotos && <PhotosGrid photos={photos} />}
              <CardContent>
                <Typography
                  gutterBottom
                  className={classes.cardtitle}
                  component="h2"
                >
                  Encounter no. {encounter.EncounterID}
                </Typography>
                <CardActions className={classes.actions}>
                  <p>{photos.length}</p>
                  <IconButton
                    color="secondary"
                    onClick={() => setOpenPhotos((openPhotos) => !openPhotos)}
                  >
                    <PhotoLibraryIcon />
                  </IconButton>
                  {videoPath && (
                    <IconButton
                      color="secondary"
                      onClick={(e) => openInNewTab()}
                    >
                      <VideoLibraryIcon />
                    </IconButton>
                  )}
                  {uploadAuthorized && (
                    <IconButton
                      color="secondary"
                      onClick={() =>
                        (window.location.href = `/UploadPhoto?id=${encounter.EncounterID}`)
                      }
                    >
                      <AddToPhotosIcon />
                    </IconButton>
                  )}
                </CardActions>
                <div className="detailsEncounter">
                  <p>Date: {date}</p>
                  <p>Encounter no.: {encounter.EncounterID}</p>
                  {encounter.OriginalID ? (
                    <p>SII ID: {encounter.OriginalID}</p>
                  ) : null}
                  <p>
                    Total Bluespotted reported: {encounter.SpottedCountReported}
                  </p>
                  <p>
                    Media type:{" "}
                    {encounter.MediaTypeID === 2 ? "Video" : "Photos"}
                  </p>
                  <p>Reporter: {encounter.ReporterEmail}</p>
                  {encounter.ReportType ? (
                    <p>Report type: {encounter.ReportType.Title}</p>
                  ) : null}
                  {encounter.Photographer ? (
                    <p>Photographer: {encounter.Photographer}</p>
                  ) : null}
                  {encounter.Link ? (
                    <p>Source link: {encounter.Link} </p>
                  ) : null}
                  {encounter.MaxDepth ? (
                    <p> Maximum depth: {encounter.MaxDepth} m</p>
                  ) : null}
                  {encounter.Distance ? (
                    <p>Distance: {encounter.Distance} m</p>
                  ) : null}
                  {encounter.Temp ? (
                    <p>Water temperature: {encounter.Temp} ???</p>
                  ) : null}
                  {encounter.DW ? <p>Disc width: {encounter.DW} cm</p> : null}
                  {encounter.DL ? <p>Disc length: {encounter.DL} cm</p> : null}
                  {encounter.TL ? <p>Total length: {encounter.TL} cm</p> : null}

                  {encounter.Description ? (
                    <p>Additional information: {encounter.Description} </p>
                  ) : null}

                  <p className={classes.update}>
                    {encounter.UpdatedBy ? "Last updated on " : "Created on "}
                    {encounter.UpdatedAt
                      ? new Date(encounter.UpdatedAt).toLocaleDateString(
                          "he-IL"
                        )
                      : ""}
                  </p>
                </div>
              </CardContent>
              {userService.isAdmin() && (
                <div>
                  <button
                    className="btn"
                    onClick={(event) =>
                      (window.location.href = `/IdentifyPhoto?id=${encounter.EncounterID}`)
                    }
                  >
                    IDENITFY
                  </button>
                  <CardActions className={classes.actions}>
                    <IconButton
                      color="secondary"
                      onClick={() =>
                        (window.location.href = `/EditEncounter?id=${encounter.EncounterID}`)
                      }
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={handleDelete}>
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
