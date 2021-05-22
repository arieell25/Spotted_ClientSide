import React, { useState} from "react";
import GradientCircularProgress from '../Encounters/components/CircularProgress';


export default function AdminDashboard(props) {
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


//   if (!photos) return <GradientCircularProgress />
//   else {
    return (
      <>
        <h6>Admin</h6>
    </>
    );
// }
}
