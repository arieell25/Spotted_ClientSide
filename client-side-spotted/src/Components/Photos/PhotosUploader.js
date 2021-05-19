import React, {useState} from 'react';

import RUG, { Card, DragArea } from 'react-upload-gallery';
import 'react-upload-gallery/dist/style.css'
import { PhotoService } from '../../Service/PhotoService';
import Done from '@material-ui/icons/Done';
import { IconButton} from '@material-ui/core';
import { useLocation } from "react-router-dom";
import {SystemResultsService} from '../../Service/SystemResultsService';
import {EncounterService} from '../../Service/EncounterService';
import {speciesDetectionService} from '../../Service/DetectionService/speciesDetectionService';
import GradientCircularProgress from '../Encounters/components/CircularProgress';
// import { ControlCameraOutlined } from '@material-ui/icons';

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
export default function PhotosUploader(props) {
    const {handleOpenRespons, setId} = props;
    let query = useQuery();
    var id = query.get("id");
    const [images, setImages] = useState([]);
    const [isReady, setIsReady] = useState(true);
    var imagesData = new FormData();
    // const data = new FormData();

    const uploadHandler= async () =>{
        let photoUrl;
        let count = 0 ;
        let photosBlboData=[];
        var uploaders =  images.map(image => {
            const data = new FormData();
            data.append("image", image.file);
            imagesData.append("image", image.file);
            return PhotoService.uploadPhoto(data, id)
            .then( res => {
                console.log(data);
                count +=1;
                console.log(res);
                return (res);
            })
            .catch(err => handleOpenRespons(`Upload faild please try again...${ err}`) )

        })
        console.log(Promise.all(uploaders))
        Promise.all(uploaders).then(res => {
            console.log(`yploaders: ${res}`)
            photosBlboData = res;
             speciesDetectionService
            .detectSpeciesPhotos(imagesData)
            .then( res => {
                console.log(res);
                 SystemResultsService
                 .addFirstSystemResults(res, id, photosBlboData)
                 .then(res =>{
                    photoUrl = res.photosResults[0].src;
                    EncounterService.updateEncounterPic(id, photoUrl).then( res => {
                        }).catch(err => {
                            handleOpenRespons(`Failed updating encounter profile pic...` );

                        });
                     setId(id);
                    handleOpenRespons(`Succesfully uploaded ${count} photos and sent for detection, Thank you!` );
                     setIsReady(true);
                    } );                
            }).catch(err =>handleOpenRespons('Species detection faild...Please try again' ))

        });
    }

    const handleUploadClick = () => {
        setIsReady(false);
        uploadHandler();
    }
    return <div>
        {!isReady && (<GradientCircularProgress/>)}
        <RUG
            action={`http://spotted-server.azurewebsites.net/pub/uploadrawphoto?id=${id}`}
            source={response => response} // response image source
            onChange={(images) => {
                setImages(images) // save current component
            }}
            onConfirmDelete={() => window.confirm('Are you sure you want to delete?')}

            onDeleted={(deletedImage, images) => {
                console.log(deletedImage, images)
                if ( deletedImage.selected && images.length ) {
                    images[0].select()
                }
            }}
            onUpload={(images) => {
                console.log(images);
            }}

        >
            <DragArea className="rug-items __card">
                { image => <div style={{ border: `1px solid ${image.selected ? 'green' : 'transparent'}` }}>
                    <Card image={image} />

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {/* <button onClick={image.select}>Select</button>
                        <button onClick={image.remove}>Remove</button> */}
                        {/* <IconButton color="secondary" onClick={image.remove}><DeleteIcon  /></IconButton> */}
                        <IconButton color="secondary" onClick={image.select}><Done  /></IconButton>

                    </div>
                </div> }
            </DragArea>
            <button className='btn' onClick={handleUploadClick} >
                UPLOAD
            </button>
        </RUG>
     </div>
}
