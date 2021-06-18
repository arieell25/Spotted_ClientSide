import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ImagePicker from "react-image-picker";
import "react-image-picker/dist/index.css";
import { PhotoService } from "../../../Service/PhotoService";
import { identificationService } from "../../../Service/IdentificationService/photoIdentService";
import { IdntEncService } from "../../../Service/IdentifiedEncounterService";
import { speciesDetectionService } from "../../../Service/DetectionService/speciesDetectionService";
import { SystemResultsService } from "../../../Service/SystemResultsService";
import ProfileDialog from "../components/ProfileDialog";

import { Card, Typography, CardContent, CardMedia } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 10,
    padding: "0px 20px",
    maxWidth: 800,
    margin: `0 auto`,
  },
  linkText: {
    textDecoration: "none",
  },
  img: {
    width: "100%",
    paddingTop: 4,
    borderRadius: 10,
  },
  lable: {
    color: "#e0e0e7",
  },
  cardtitle: {
    fontSize: 22,
    textTransform: "none",
    margin: "10px 20px",
  },
}));

export default function ResultsCard(props) {
  const classes = useStyles();
  const { data, src, encounterid, setOpen, setstatus, setIdntId } = props;
  const [ids, setIds] = useState([]);
  const [originalPhoto, setoriginalPhoto] = useState(null);
  const [isDone, setisDone] = useState(false);
  const [doneStatus, setDoneStatus] = useState("");
  const [item, setitem] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [indevidualIds, setindevidualIds] = useState([]);
  const [originalPhotoData, setOriginalPhotoData] = useState();
  const [openProfile, setOpenProfile] = useState(false);
  const [encounter, setEncounter] = useState([]);
  const [resultIndividuals, setResultIndividuals] = useState([]);
  let arr = [];
  useEffect(() => {
    setoriginalPhoto(src);
    const idsArr = data.map((item) => item.id);
    const imagesArr = data.map((item) => item.image_name);
    console.log(imagesArr);

    setindevidualIds(idsArr);
    const fetchData = async () => {
      //   const boundingBoxData = await PhotoService.getEncounterPhotosBBox(fileNames);
      const photosData = await PhotoService.getIdntEncountersPhotos(
        idsArr
      ).then((res) => {
        setResultIndividuals(res);
        res.map((item) => {
          let resultPhoto;
          console.log(`item map ${item}`);
          imagesArr.forEach((image) => {
            resultPhoto = item.Photos.filter(
              (photo) => photo.src.split("/")[5] === image
            );
            console.log(resultPhoto);
            if (resultPhoto[0]) {
              arr.push(resultPhoto[0]);
            }
          });
          return resultPhoto;
        });
        console.log(arr);
        // return photos;
      });
      const srcPhotoData = await PhotoService.getPhotoByUrl(src);
      console.log(srcPhotoData);
      setOriginalPhotoData(srcPhotoData);
      setPhotos(arr);
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  const onClick = () => {
    if (item) {
      console.log(item);
      identificationService
        .setIndividualIdentity(item, src)
        .then((res) => {
          console.log(res);
          //UPLOAD to container
          speciesDetectionService
            .copyEncounterImagefromBlob(src, item.value)
            .catch((err) => {
              setstatus(err);
              setOpen(true);
            });
          PhotoService.updateDBPhoto(item.value, originalPhoto).catch((err) => {
            setstatus(err);
            setOpen(true);
          });
          //Add to DB manual results
          SystemResultsService.addManualResult(
            originalPhoto,
            item.value,
            encounterid
          ).then(() => {
            setstatus(
              `Photo tagged as identified Bluespotted no. ${item.value}.`
            );
            setDoneStatus(
              `Photo of encounter no. ${encounterid} tagged as individual identity no. ${item.value}. `
            );
            setisDone(true);
            setOpen(true);
          });
        })
        .catch((err) => {
          setstatus("Faild tagging identity, please try again.");
          setOpen(true);
        });
    } else {
      setstatus(
        "Please pick one representing image of identity, alternatively create a new one"
      );
      setOpen(true);
    }
  };
  const onPick = (image) => {
    console.log(image);
    image.RightSide = originalPhotoData.RightSide;
    image.LeftSide = originalPhotoData.LeftSide;
    image.TopSide = originalPhotoData.TopSide;
    console.log(image);

    // set individual profile card
    setitem(image);
    setEncounter(
      resultIndividuals.filter(
        (item) => item.IdentifiedEncounterID === image.value
      )
    );
    console.log(encounter);
    setOpenProfile(true);
  };

  const handleCloseRespons = () => {
    setOpenProfile(false);
  };

  const handleNew = () => {
    const body = { EncounterID: encounterid, ProfilePicture: src };
    IdntEncService.addIdentifiedEncounter(body)
      .then((res) => {
        console.log(res);
        setIdntId(res.IdentifiedEncounterID);
        PhotoService.updateDBPhoto(res.IdentifiedEncounterID, originalPhoto);
        identificationService.setNewIndividualIdentity(
          res.IdentifiedEncounterID,
          originalPhoto
        );
        SystemResultsService.addManualResult(
          originalPhoto,
          res.IdentifiedEncounterID,
          encounterid
        )
          .then(() => {
            setstatus(
              `Successfully added new identity no. ${res.IdentifiedEncounterID}`
            );
            setDoneStatus(
              `Photo of encounter no. ${encounterid} saved as new individual identity no.${res.IdentifiedEncounterID} `
            );
            setisDone(true);
            setOpen(true);
          })
          .catch((err) => {
            setstatus(err);
            setOpen(true);
          });
      })
      .catch((err) => {
        console.log(err);
        setstatus(err);
        setOpen(true);
      });
  };

  if (!photos) return <div> Loading photos....</div>;
  else {
    return (
      <Card className={classes.root}>
        <div>
          <CardContent>
            <CardMedia
              className={classes.img}
              component="img"
              alt="Encounter"
              height="300"
              image={originalPhoto}
              title="BlueSpotted profile pic"
            />
            {photos.length > 0 && !isDone && (
              <div>
                <Typography
                  gutterBottom
                  className={classes.cardtitle}
                  component="h2"
                >
                  Most similar individuals - please pick one
                </Typography>
                <ImagePicker
                  images={photos.map((image, i) => ({
                    src: image.src,
                    value: image.IdentifiedEncounterID,
                  }))}
                  onPick={onPick}
                />
                <button className="btn" onClick={onClick}>
                  save
                </button>
                <Typography
                  gutterBottom
                  className={classes.cardtitle}
                  component="h2"
                >
                  Alternatively create a new Bluespotted individual
                </Typography>
                <button className="btn" onClick={handleNew}>
                  New identity
                </button>
              </div>
            )}{" "}
            {photos.length === 0 && !isDone && (
              <div>
                <Typography
                  gutterBottom
                  className={classes.cardtitle}
                  component="h2"
                >
                  Did not find any similar identity
                </Typography>
                <button className="btn" onClick={handleNew}>
                  New identity
                </button>
              </div>
            )}
            {isDone && (
              <Typography
                gutterBottom
                className={classes.cardtitle}
                component="h2"
              >
                {doneStatus}
              </Typography>
            )}
          </CardContent>
          {item && (
            <ProfileDialog
              open={openProfile}
              encounter={encounter[0]}
              resultPhoto={item}
              onClose={handleCloseRespons}
            />
          )}
        </div>
      </Card>
    );
  }
}
