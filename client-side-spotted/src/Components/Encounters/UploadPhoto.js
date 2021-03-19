import React, {Component, useState} from 'react';
import ImageUploader from 'react-images-upload';
import {EncounterService} from '../../Service/EncounterService';
import {speciesDetectionService} from '../../Service/DetectionService/photoDetectService';

import { Link, useLocation, BrowserRouter as Router } from "react-router-dom";
import StatusDialog from '../Encounters/StatusDialog';


function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
// class UploadPhoto extends Component {
    function UploadPhoto(){
        const [pictures, setPictures] = useState([]);
        const [status, setStatus] = useState('');
        const [openRespons, setOpenRespons] = useState(false);

        let query = useQuery();
        // const addMessage = (newMessage) => setMessages(state => [...state, newMessage])

        const onDrop = (picture) => {
            console.log(picture);
            // setPictures(picture);
            setPictures(prevState=>[picture, ...prevState]);
            // const newState = [picture];
            // setPictures(newState);
        }

        const handleCloseRespons = () => {
            setOpenRespons(false);
          };

        const uploadHandler= async () =>{
            console.log(pictures);
            var id = query.get("id");
            console.log(id);
            const fd = new FormData();
            fd.append('image', pictures[0][0], pictures[0][0].name);
            try{
                await speciesDetectionService
                .detectSpecies(fd)
                .then( res => {
                    //Check if confidence > 70%
                    console.log(res);
                    var bBox = res.data;
                    var url, photoId;
                    var count = res.counts;
                    var confidence = (res.data[0][0].confidences).toString().substring(0,4);
                    if(res.counts > 0 && confidence > 0.61){
                     EncounterService
                    .uploadPhoto(fd, id)
                    .then(data => {
                        console.log('Added photo: ' + data.url);
                        url = data.url;
                        EncounterService.addPhoto(id, url, count)
                        .then(res=>{
                            photoId = res.data.newPhoto.PhotoID;
                            EncounterService.addBoundingBox(bBox, photoId)
                            .then(res=> console.log('added bounding box status: '+ JSON.stringify(res) ))
                        } )
                        .catch(err=> console.log(err));
                        setStatus(`Detected ${count} BlueSpotted with ${confidence} and saved photo!`);
                        setOpenRespons(true);
                    })
                    .catch(err => {
                        console.log(err);
                        setStatus('Photo upload faild');
                        setOpenRespons(true);
                    });

                   
                    }else{
                        setStatus('Sorry we did not detect any BlueSpotted.... try with a diffrent photo.');
                        setOpenRespons(true)
                    }
                }).catch(err=>{
                        console.log(err);
                        setStatus('Oops...Something went wrong....');
                        setOpenRespons(true)
                }); 
               
            }catch(err){
                console.log(err)
            }
            // var result = 
            // EncounterService
            // .uploadPhoto(fd, id)
            // .then(data => {
            //     console.log('Added photo: ' + data);
            //     setStatus('Photo uploaded successfuly!');
            //     setOpenRespons(true);
            // })
            // .catch(err => {
            //     console.log(err);
            //     setStatus('Photo upload faild');
            //     setOpenRespons(true);
            // });
        }
     
            return (
                <div>
                <ImageUploader
                    withIcon={true}
                    buttonText='Choose images'
                    onChange={onDrop}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                />
                <button className='btn' onClick={uploadHandler} >
                  UPLOAD
                </button> 
                <StatusDialog
                    open={openRespons}
                    status={status}
                    onClose={handleCloseRespons}
                />
                </div>           
                );
        }
    

// const UploadPhoto = () => {
//    return (
//       <div className="d-flex justify-content-center title">
//       <div>
//         <Link to='/' style={{ 'textDecoration': 'none' }}><h2>UPLOAD PHOTO</h2></Link>
//       </div>
//       <div>
//       <div className="chooseFile">
//       <input className="FilePath" id="FilePath" label="File Path" name="FilePath" placeholder="Type here..."/>
//             <button className='btn' type="button">Choose a file</button>
//     </div>
//     <div className="button">
//         <Link to='/'>
//                 <button className='btn' type="button">UPLOAD</button>
//         </Link>
//         </div>
//         <div className="button">
//          <Link to='/'>
//                 <button className='btn' type="button">NEXT</button>
//         </Link>
//         </div>
//       </div>
//       </div>
//    )
// }

export default UploadPhoto