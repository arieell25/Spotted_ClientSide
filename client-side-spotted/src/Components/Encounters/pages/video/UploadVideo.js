import React, { Fragment, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import { SystemResultsService } from "../../../../Service/SystemResultsService";
import { VideoService } from "../../../../Service/VideoService";
import { EncounterService } from "../../../../Service/EncounterService";
import StatusDialog from "../../components/StatusDialog";
import LinearProgressWithLabel from "./Progress";
import PermMediaIcon from "@material-ui/icons/PermMedia";
import GradientCircularProgress from "../../components/CircularProgress";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    padding: 50,
    margin: `50px auto`,
    width: 800,
  },
  progress: {
    width: "400px",
    margin: "10px",
  },
  cardtitle: {
    fontSize: 25,
    paddingBottom: 20,
  },
}));

const UploadVideo = (props) => {
  const classes = useStyles();
  const { encounterid } = props;
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [loading, setLoading] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [openRespons, setOpenRespons] = useState(false);
  const [status, setStatus] = useState("");

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const handleCloseRespons = () => {
    setOpenRespons(false);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("id", encounterid);

    try {
      await axios
        .post(
          `https://spotted-detect-component.azurewebsites.net/uploadVideo`,
          formData,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
              setUploadPercentage(
                parseInt(
                  Math.round((progressEvent.loaded * 100) / progressEvent.total)
                )
              );
              setLoading(true);
            },
          }
        )
        .then((res) => {
          VideoService.addVideo(encounterid, filename).catch(() => {
            setStatus("Faild saving video...please upload again.");
            setOpenRespons(true);
          });
          SystemResultsService.addVideoFirstSystemResults(res, encounterid)
            .then((res) => {
              const data = {
                ProfilePicture: res.photosResults[0].src,
                MediaType: 2,
              };
              EncounterService.updateEncounter(encounterid, data)
                .then(() => {
                  setStatus("Your video was successfully uploaded. Thank you!");
                  setOpenRespons(true);
                  setLoading(false);
                })
            })
        });
    } catch (err) {
      if (err.response) {
        if (err.response.status === 500) {
          setStatus("There was a problem with the server");
          setOpenRespons(true);
        } else if (err.response.status === 404) {
          setStatus("Video upload faild....Try again");
          setOpenRespons(true);
        } else {
          setStatus("Unreachable please try later");
          setOpenRespons(true);
        }
      } else {
        setStatus("Server is unreachable... please try later");
        setOpenRespons(true);
      }
    }
  };

  return (
    <Fragment>
      {loading ? (
        <div>
          <GradientCircularProgress />
          <Typography gutterBottom className={classes.cardtitle} component="h1">
            Upload can take a while... do not close this page.
          </Typography>
        </div>
      ) : null}
      <StatusDialog
        open={openRespons}
        status={status}
        id={encounterid}
        onClose={handleCloseRespons}
      />
      <form onSubmit={onSubmit}>
        <div className="videoForm">
          <div className="custom-file mb-4">
            <Button
              variant="contained"
              component="label"
              className="btn"
              startIcon={<PermMediaIcon />}
            >
              Open File
              <input type="file" hidden id="customFile" onChange={onChange} />
            </Button>
            <label className="custom-file-label" htmlFor="customFile">
              {filename}
            </label>
          </div>
          <div className={classes.progress}>
            <LinearProgressWithLabel
              percentage={uploadPercentage}
              value={uploadPercentage}
            />
          </div>
          <input type="submit" value="Upload" className="btn" />
        </div>
      </form>
    </Fragment>
  );
};

export default UploadVideo;
