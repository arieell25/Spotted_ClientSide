/* eslint-disable array-callback-return */
/* eslint-disable no-loop-func */
import React, { useState } from "react";
import RUG, { Card, DragArea } from "react-upload-gallery";
import "react-upload-gallery/dist/style.css";
import { PhotoService } from "../../../../Service/PhotoService";
import { useLocation } from "react-router-dom";
import { SystemResultsService } from "../../../../Service/SystemResultsService";
import { EncounterService } from "../../../../Service/EncounterService";
import { speciesDetectionService } from "../../../../Service/DetectionService/speciesDetectionService";
import GradientCircularProgress from "../CircularProgress";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
export default function PhotosUploader(props) {
  const { handleOpenRespons, setId, setInfo } = props;
  let query = useQuery();
  var id = query.get("id");
  const [images, setImages] = useState([]);
  const [isReady, setIsReady] = useState(true);
  var imagesData = new FormData();

  const uploadHandler = async () => {
    let photoUrl;
    let count = 0;
    let photosBlboData = [];
    var uploaders = images.map((image) => {
      const data = new FormData();
      data.append("image", image.file);
      imagesData.append("image", image.file);
      return PhotoService.uploadPhoto(data, id)
        .then((res) => {
          return res;
        })
        .catch((err) =>
          handleOpenRespons(`Upload failed, please try again...${err}`)
        );
    });
    Promise.all(uploaders).then((res) => {
      photosBlboData = res;
      speciesDetectionService
        .detectSpeciesPhotos(imagesData)
        .then((res) => {
          res.map((result) => {
            if (result.counts > 0) {
              count += 1;
            }
            if (result.counts > 1) {
              setInfo(
                `Detected more than one Bluespotted in file ${result.filename}, indevidual identification supports only photos with single item.`
              );
            }
          });
          SystemResultsService.addFirstSystemResults(
            res,
            id,
            photosBlboData
          ).then((res) => {
            photoUrl = res.photosResults[0].src;
            EncounterService.updateEncounterPic(id, photoUrl)
              .then((res) => {})
              .catch((err) => {
                handleOpenRespons(`Failed updating encounter profile pic...`);
              });
            setId(id);
            handleOpenRespons(
              `Successfully uploaded and detected Bluespotted in ${count} photos.`
            );
            setIsReady(true);
          });
        })
        .catch((err) => {
          handleOpenRespons("Species detection failed... try again");
        });
    });
  };

  const handleUploadClick = () => {
    setIsReady(false);
    uploadHandler();
  };
  return (
    <div>
      {!isReady && <GradientCircularProgress />}
      <RUG
        action={`https://spotted-server.azurewebsites.net/pub/uploadrawphoto?id=${id}`}
        source={(response) => response} // response image source
        onChange={(images) => {
          setImages(images); // save current component
        }}
        onConfirmDelete={() =>
          window.confirm("Are you sure you want to delete?")
        }
        onDeleted={(deletedImage, images) => {
          if (deletedImage.selected && images.length) {
            images[0].select();
          }
        }}
        onUpload={(images) => {}}
      >
        <DragArea className="rug-items __card">
          {(image) => (
            <div
              style={{
                border: `1px solid ${image.selected ? "green" : "transparent"}`,
              }}
            >
              <Card image={image} />
            </div>
          )}
        </DragArea>
        <button className="btn" onClick={handleUploadClick}>
          UPLOAD
        </button>
      </RUG>
    </div>
  );
}
