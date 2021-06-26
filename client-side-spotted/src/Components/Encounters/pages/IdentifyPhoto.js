/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import qs from "qs";
import { SystemResultsService } from "../../../Service/SystemResultsService";
import { identificationService } from "../../../Service/IdentificationService/photoIdentService";
import GradientCircularProgress from "../components/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography } from "@material-ui/core";
import ImagePicker from "react-image-picker";
import "react-image-picker/dist/index.css";
import { PhotoService } from "../../../Service/PhotoService";
import ResultsCard from "../components/ResultsCard";
import SidesMenuDialog from "../components/SidesMenuCard";

// import { Link, useLocation, BrowserRouter } from "react-router-dom";
import StatusDialog from "../components/StatusDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 50,
    maxWidth: 800,
    margin: `0 auto`,
  },
  cardtitle: {
    fontSize: 30,
    paddingBottom: 10,
  },
}));

const photoSides = [
  { title: "Right profile ", value: "1" },
  { title: "Right front ", value: "2" },
  { title: "Right top ", value: "3" },
  { title: "Left profile ", value: "4" },
  { title: "Left front ", value: "5" },
  { title: "Left top ", value: "6" },
  { title: "Full top ", value: "7" },
];

function IdentifyPhoto(props) {
  const classes = useStyles();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState();
  const [resultsReady, setResultsReady] = useState(false);
  const [fileNames, setfileNames] = useState([]);
  const [status, setStatus] = useState("");
  // const [error, setError] = useState(false);
  const [openRespons, setOpenRespons] = useState(false);
  // const [newId, setId] = useState(null);
  const [image, setimage] = useState(null);
  const [idntId, setidntId] = useState(null);
  const [idntResults, setidntResults] = useState();
  var id = qs.parse(props.location.search, { ignoreQueryPrefix: true }).id;
  const [lastClicked, setLastClicked] = useState();
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(photoSides[0].title);
  const [update, setUpdate] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleSaveSide = () => {
    // console.log(`selected values for save: ${selectedValue}`);
    // console.log(image);
    // console.log(lastClicked);
    PhotoService.updatePhotoSide(lastClicked, selectedValue)
      .then(setUpdate(!update))
      .catch((err) => {
        setStatus("Failed to set photo side. Try again.");
      });
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      //   const boundingBoxData = await PhotoService.getEncounterPhotosBBox(fileNames);
      const photosData = await PhotoService.getPhotosforIdentification(id);
      var new_arr = photosData.map((image) => {
        let arr_str = image.src.split("/");
        image.fileName = arr_str[5];
        return image;
      });
      //  console.log(`new Photos arr ${new_arr}`);
      setPhotos(new_arr);
    };
    fetchData();
    setLoading(false);
  }, [update]);

  const onClick = async () => {
    // setUpdate(!update);
    setLoading(true);
    // console.log(image);
    // console.log(fileNames);
    const photosArr = [];
    await PhotoService.getEncounterPhotos(id).then((res) => {
      setPhotos(res);
      // console.log(res);
      for (let i = 0; i < image.length; i += 1) {
        let photo = res.filter((item) => item.src === image[i].src);
        if (photo !== undefined) {
          // console.log(photo);
          let str = photo[0].src.split("/");
          photo[0].value = str[5];
          photosArr.push(photo[0]);
        }
      }
      // console.log(photosArr);
      PhotoService.getEncounterPhotosBBox(fileNames)
        .then((res) => {
          console.log(res);
          identificationService
            .identifyPhotos(photosArr, res)
            .then((res) => {
              setidntResults(res);

              SystemResultsService.addSecondSystemResults(res)
                .then((res) => {
                  console.log(res);

                  setResultsReady(true);
                  setLoading(false);
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
              setStatus(err);
              setOpenRespons(true);
              // setError(true);
            });
        })
        .catch((err) => {
          setStatus(err);
          setOpenRespons(true);
        });
    });
  };
  const onPick = (item) => {
    let length = item.length;
    console.log(item);
    setimage(item);
    setLastClicked(item[length - 1]);
    setfileNames(item.map((item) => item.value));
    console.log(fileNames);
    // console.log(image);

    setOpen(true);
  };

  const handleCloseRespons = () => {
    setOpenRespons(false);
  };

  const renderInnerItemResult = (item, i) => {
    console.log("inner: " + JSON.stringify(item.Similar_individuals));
    if (item.Similar_individuals) {
      return (
        <ResultsCard
          index={i}
          src={item.src}
          key={i}
          // ids={item.individuals_ID}
          data={item.Similar_individuals}
          encounterid={id}
          setOpen={setOpenRespons}
          setstatus={setStatus}
          setIdntId={setidntId}
        />
      );
    }
  };

  if (!photos || loading) return <GradientCircularProgress />;
  else if (resultsReady) {
    return (
      <div className="animated slideInUpTiny animation-duration-3">
        <div className="m-5">
          <div className="d-flex justify-content-center title">
            <h2>Individual Identification Results</h2>
            <div className={classes.results}>
              {idntResults && idntResults.map(renderInnerItemResult)}
              {/* {idntResults[1] && idntResults[1].map(renderInnerItemResult)}
              {idntResults[2] && idntResults[2].map(renderInnerItemResult)} */}
            </div>
          </div>
          <StatusDialog
            open={openRespons}
            status={status}
            onClose={handleCloseRespons}
            idntId={idntId}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="animated slideInUpTiny animation-duration-3">
        <div className="m-5">
          <div className="d-flex justify-content-center title">
            <div>
              <h2>Individual Identification</h2>
            </div>
            <Card className={classes.root}>
              <div>
                <CardContent>
                  <Typography
                    gutterBottom
                    className={classes.cardtitle}
                    component="h2"
                  >
                    Select photos for identification
                  </Typography>
                  <ImagePicker
                    images={photos.map((image, i) => ({
                      src: image.src,
                      value: image.fileName,
                      LeftSide: image.LeftSide,
                      RightSide: image.RightSide,
                      FrontSide: image.FrontSide,
                      TopSide: image.TopSide,
                      BackSide: image.BackSide,
                    }))}
                    onPick={onPick}
                    multiple
                  />
                  <button className="btn" onClick={onClick}>
                    Start
                  </button>
                </CardContent>
              </div>
            </Card>
            <SidesMenuDialog
              open={open}
              value={selectedValue}
              setSelectedValue={setSelectedValue}
              onClose={handleClose}
              sidesData={photoSides}
              onSave={handleSaveSide}
            />
            <StatusDialog
              open={openRespons}
              status={status}
              onClose={handleCloseRespons}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default IdentifyPhoto;
