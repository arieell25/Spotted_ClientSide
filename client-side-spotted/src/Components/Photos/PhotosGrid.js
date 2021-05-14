import React, { useState} from "react";
import GradientCircularProgress from '../Encounters/components/CircularProgress';
import ImageViewer from './ImagesView';


export default function PhotosGrid(props) {
    const {photos} = props;
    const [isOpen, setIsOpen] = useState(false);
    const [currImage, setCurrImage] = useState(0);
    const [photosArr, setphotosArr] = useState([]);

    const closeImgsViewer = () => {
        setCurrImage(0)
        setIsOpen(false)
    }
    const gotoPrev = () => {
        setCurrImage(currImage - 1)
    }
    const gotoNext = () => {
        setCurrImage(currImage + 1)
    }
    const onimgClick = (e) =>{
        console.log(e);
        photosArr.push(e.target);
        // console.log(photosArr);
    }


  if (!photos) return <GradientCircularProgress />
  else {
    return (
      <>
      {photos.map((image, i) =>
          <img key={i} src={image.src} style={{height: 200, padding: 5}} alt={''} onClick={() => setIsOpen(true)}/>
      )}
      <ImageViewer
          imgs={photos}
          closeImgsViewer={closeImgsViewer}
          gotoPrev={gotoPrev}
          gotoNext={gotoNext}
        //   onimgClick={onimgClick}
          currImg={currImage}
          isOpen={isOpen}
      />
    </>
    );
}
}
