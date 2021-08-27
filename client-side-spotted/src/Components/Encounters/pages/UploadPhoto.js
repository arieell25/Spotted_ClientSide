import React, { useState } from "react";
import qs from "qs";
import StatusDialog from "../components/StatusDialog";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Button } from "@material-ui/core";
import PhotosUploader from "../components/Photos/PhotosUploader";
import Collapse from "@material-ui/core/Collapse";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import UploadVideo from "./video/UploadVideo";
const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    padding: 50,
    margin: `50px auto`,
    width: 800,
  },
  title: {
    paddingBottom: 30,
  },
}));

function UploadPhoto(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState("");
  const [openRespons, setOpenRespons] = useState(false);
  const [newId, setId] = useState(null);
  const [info, setInfo] = useState();

  var id = qs.parse(props.location.search, { ignoreQueryPrefix: true }).id;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleCloseRespons = () => {
    setOpenRespons(false);
    setInfo();
  };
  
  const handleOpenRespons = (status) => {
    setStatus(status);
    setOpenRespons(true);
  };

  return (
    <Card className={classes.root}>
      <div className={classes.title}>
        <h2>Upload Media</h2>
      </div>
      <Button
        onClick={handleExpandClick}
        aria-expanded={!expanded}
        aria-label="upload video"
        endIcon={<ExpandMoreIcon />}
      >
        Upload Photos
      </Button>
      <Collapse in={!expanded} timeout="auto" unmountOnExit>
        <PhotosUploader
          handleOpenRespons={handleOpenRespons}
          setId={setId}
          status={status}
          setInfo={setInfo}
        />
      </Collapse>
      <Button
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="upload video"
        endIcon={<ExpandMoreIcon />}
      >
        Upload Video
      </Button>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <UploadVideo encounterid={id} />
      </Collapse>
      <StatusDialog
        open={openRespons}
        status={status}
        info={info}
        id={newId}
        onClose={handleCloseRespons}
      />
    </Card>
  );
}

export default UploadPhoto;
